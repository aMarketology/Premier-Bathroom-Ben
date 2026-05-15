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
    const { name, email, phone, message, service, smsConsent, pageUrl, _hp, _lt } = body

    // Honeypot
    if (_hp) {
      console.warn('[spam] Honeypot triggered — silently discarding')
      return NextResponse.json({ success: true, message: 'Received' })
    }
    // Timing
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

    const sourceUrl = pageUrl || request.headers.get('referer') || 'Direct submission'
    const serviceLabel = service
      ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      : 'Not specified'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #1c1917 0%, #292524 100%); color: white; padding: 32px 30px; text-align: center; }
            .gold-bar { background: linear-gradient(90deg, #d97706, #f59e0b, #d97706); height: 4px; }
            .source-bar { background: #fffbeb; border-left: 4px solid #d97706; padding: 14px 20px; }
            .content { background: #f9fafb; padding: 30px; }
            .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #d97706; }
            .field-label { font-weight: bold; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .field-value { color: #111827; font-size: 15px; }
            .footer { background: #1c1917; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(217,119,6,0.2);border:1px solid rgba(217,119,6,0.4);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
                <div style="width:8px;height:8px;border-radius:50%;background:#fbbf24;"></div>
                <span style="font-size:12px;color:#fcd34d;letter-spacing:0.08em;font-weight:500;">NEW LEAD</span>
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:2px;color:#fbbf24;">CHAMPS</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#a8a29e;">Tile &amp; Bathroom Services — Austin, TX</p>
            </div>
            <div class="gold-bar"></div>
            <div class="source-bar">
              <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Submitted From</div>
              <a href="${sourceUrl}" style="color:#b45309;font-size:13px;word-break:break-all;">${sourceUrl}</a>
            </div>
            <div class="content">
              <div class="field"><div class="field-label">Customer Name</div><div class="field-value">${name}</div></div>
              <div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${email}" style="color:#d97706;">${email}</a></div></div>
              <div class="field"><div class="field-label">Phone</div><div class="field-value"><a href="tel:${phone}" style="color:#d97706;">${phone}</a></div></div>
              ${service ? `<div class="field"><div class="field-label">Service Requested</div><div class="field-value">${serviceLabel}</div></div>` : ''}
              ${message ? `<div class="field"><div class="field-label">Message</div><div class="field-value" style="white-space:pre-wrap;">${message}</div></div>` : ''}
              ${smsConsent ? `<div style="background:#fef3c7;border-left:4px solid #d97706;padding:14px 16px;border-radius:8px;margin-bottom:14px;"><div class="field-label">SMS Consent</div><div class="field-value">✓ Customer agreed to receive SMS messages</div></div>` : ''}
              <div style="background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
                Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
              </div>
            </div>
            <div class="footer">
              <p style="margin:0;font-weight:700;color:#fbbf24;font-size:15px;letter-spacing:2px;">CHAMPS</p>
              <p style="margin:4px 0 0;color:#a8a29e;">Austin, TX &bull; (512) 706-9577</p>
              <p style="margin:8px 0 0;color:#78716c;font-size:12px;">Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'info@amarketology.com',
      to: [process.env.NOTIFICATION_EMAIL_1 || ''],
      cc: ['max@amarketology.com'],
      replyTo: email,
      subject: `New Contact Form - Champs Tile Austin - ${name}`,
      html: htmlContent,
    })

    if (sendError) {
      console.error('[email] Resend error:', sendError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    console.log('[email] Sent via Resend')
    return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

