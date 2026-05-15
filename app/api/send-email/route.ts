import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      console.warn('[spam] Rate limit exceeded for IP:', ip)
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, phone, service, message, smsConsent, pageUrl, _hp, _lt } = body

    // Honeypot — real users never fill this hidden field
    if (_hp) {
      console.warn('[spam] Honeypot triggered — silently discarding')
      return NextResponse.json({ success: true, message: 'Received' })
    }
    // Timing — legitimate users take more than 3 seconds
    if (_lt && Date.now() - Number(_lt) < 3000) {
      console.warn('[spam] Submission too fast — silently discarding')
      return NextResponse.json({ success: true, message: 'Received' })
    }

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof name !== 'string' || name.length > 80 || !/^[a-zA-Z\s'\-.]{2,80}$/.test(name.trim())) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    const phoneDigits = String(phone).replace(/\D/g, '')
    if (phoneDigits.length < 7 || phoneDigits.length > 15 || !/^[0-9\s().+\-]{7,20}$/.test(String(phone).trim())) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }
    if (message) {
      if (String(message).length > 2000) {
        return NextResponse.json({ error: 'Message too long' }, { status: 400 })
      }
      const urlCount = (String(message).match(/https?:\/\/|www\./gi) || []).length
      if (urlCount > 2) {
        return NextResponse.json({ error: 'Message contains too many links' }, { status: 400 })
      }
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    const sourceUrl = pageUrl || request.headers.get('referer') || 'Direct submission'
    const serviceLabel = service
      ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      : 'Not specified'
    const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%); color: white; padding: 32px 30px; text-align: center; }
            .blue-bar { background: linear-gradient(90deg, #0284c7, #38bdf8, #0284c7); height: 4px; }
            .source-bar { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 14px 20px; }
            .content { background: #f9fafb; padding: 30px; }
            .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #0284c7; }
            .field-label { font-weight: bold; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .field-value { color: #111827; font-size: 15px; }
            .footer { background: #0c4a6e; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(56,189,248,0.2);border:1px solid rgba(56,189,248,0.4);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
                <div style="width:8px;height:8px;border-radius:50%;background:#38bdf8;"></div>
                <span style="font-size:12px;color:#bae6fd;letter-spacing:0.08em;font-weight:500;">NEW LEAD</span>
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:2px;color:#bae6fd;">TILE PROS AUSTIN</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#7dd3fc;">Tile &amp; Bathroom Services &#8212; Austin, TX</p>
            </div>
            <div class="blue-bar"></div>
            <div class="source-bar">
              <div style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Submitted From</div>
              <a href="${sourceUrl}" style="color:#0284c7;font-size:13px;word-break:break-all;">${sourceUrl}</a>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Customer Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color:#0284c7;">${email}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${phone}" style="color:#0284c7;">${phone}</a></div>
              </div>
              ${service ? `<div class="field"><div class="field-label">Service Requested</div><div class="field-value">${serviceLabel}</div></div>` : ''}
              ${message ? `<div class="field"><div class="field-label">Message / Project Details</div><div class="field-value" style="white-space:pre-wrap;">${message}</div></div>` : ''}
              ${smsConsent ? `<div style="background:#e0f2fe;border-left:4px solid #0284c7;padding:14px 16px;border-radius:8px;margin-bottom:14px;"><div class="field-label">SMS Consent</div><div class="field-value">&#10003; Customer agreed to receive SMS messages</div></div>` : ''}
              <div style="background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
                Submitted: ${submitted} (Central Time)
              </div>
            </div>
            <div class="footer">
              <p style="margin:0;font-weight:700;color:#38bdf8;font-size:15px;letter-spacing:2px;">TILE PROS AUSTIN</p>
              <p style="margin:4px 0 0;color:#7dd3fc;">Austin, TX &#183; (512) 492-2321</p>
              <p style="margin:8px 0 0;color:#93c5fd;font-size:12px;">Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: notificationEmails,
      cc: ['max@amarketology.com'],
      replyTo: email,
      subject: `New Lead - Tile Pros Austin - ${name}`,
      html: htmlContent,
    })

    if (error) {
      console.error('[resend] Error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    console.log('[resend] Email sent successfully')
    return NextResponse.json({ success: true, message: 'Email sent successfully' })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}
