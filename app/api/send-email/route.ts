import { NextRequest, NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'

// ── Mailgun (primary) ─────────────────────────────────────────────────────────
async function sendViaMailgun(
  to: string[],
  subject: string,
  text: string,
  html: string
): Promise<void> {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! })
  const domain = process.env.MAILGUN_DOMAIN!
  const from = process.env.MAILGUN_FROM!
  await Promise.all(
    to.map((recipient) =>
      mg.messages.create(domain, { from, to: [recipient], subject, text, html })
    )
  )
}

// ── Mailjet (fallback) ────────────────────────────────────────────────────────
async function sendViaMailjet(
  to: string[],
  subject: string,
  text: string,
  html: string
): Promise<void> {
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_SECRET_KEY
  if (!apiKey || !apiSecret) throw new Error('Mailjet credentials not configured')
  const mailjet = new Mailjet({ apiKey, apiSecret })
  await Promise.all(
    to.map((recipient) =>
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: { Email: 'info@amarketology.com', Name: 'Tile Pros Austin' },
            To: [{ Email: recipient }],
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
          },
        ],
      })
    )
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, smsConsent, pageUrl } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Resolve source URL — prefer explicit pageUrl, fall back to referer header
    const sourceUrl = pageUrl || request.headers.get('referer') || 'Direct submission'

    const emailSubject = service
      ? `New Service Request: ${service} — ${name}`
      : `New Contact Form — ${name}`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f0f9ff; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 32px 30px; text-align: center; }
          .blue-bar { background: linear-gradient(90deg, #0ea5e9, #38bdf8, #0ea5e9); height: 4px; }
          .source-bar { background: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 12px 20px; }
          .content { background: #f0f9ff; padding: 30px; }
          .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #0ea5e9; }
          .field-label { font-weight: bold; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
          .field-value { color: #0f172a; font-size: 15px; }
          .footer { background: #0c4a6e; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#bae6fd;animation:pulse 2s infinite;"></div>
              <span style="font-size:12px;color:#e0f2fe;letter-spacing:0.08em;font-weight:500;">NEW CUSTOMER INQUIRY</span>
            </div>
            <h1 style="margin:0;font-size:28px;font-weight:700;color:white;letter-spacing:1px;">Tile Pros <span style="color:#bae6fd;">Austin</span></h1>
            <p style="margin:8px 0 0;font-size:14px;color:#e0f2fe;">Premier Tile &amp; Bathroom Services</p>
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
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color:#0284c7;">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value"><a href="tel:${phone}" style="color:#0284c7;">${phone}</a></div>
            </div>
            ${service ? `
            <div class="field">
              <div class="field-label">Service Requested</div>
              <div class="field-value">${service}</div>
            </div>` : ''}
            ${message ? `
            <div class="field">
              <div class="field-label">Project Details</div>
              <div class="field-value" style="white-space:pre-wrap;">${message}</div>
            </div>` : ''}
            ${smsConsent ? `
            <div style="background:#e0f2fe;border-left:4px solid #0ea5e9;padding:14px 16px;border-radius:8px;margin-bottom:14px;">
              <div class="field-label">SMS Consent</div>
              <div class="field-value">✓ Customer agreed to receive SMS messages</div>
            </div>` : ''}
            <div style="background:white;padding:12px 16px;border-radius:8px;border:1px solid #e0f2fe;font-size:13px;color:#64748b;">
              Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
            </div>
          </div>
          <div class="footer">
            <p style="margin:0;font-weight:700;color:#7dd3fc;font-size:15px;">Tile Pros Austin</p>
            <p style="margin:4px 0 0;color:#bae6fd;">Austin, TX &bull; (512) 706-9577</p>
            <p style="margin:8px 0 0;color:#7dd3fc;font-size:12px;">Please respond promptly to provide excellent customer service.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      console.error('No notification emails configured')
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    const textContent = `New inquiry from ${name}\nEmail: ${email}\nPhone: ${phone}${service ? `\nService: ${service}` : ''}${message ? `\nMessage: ${message}` : ''}\nSubmitted from: ${sourceUrl}${smsConsent ? '\n\n✓ Customer agreed to receive SMS messages' : ''}`

    // ── Send with Mailgun (primary) → Mailjet (fallback) ──────────────────────
    let provider = 'unknown'
    try {
      await sendViaMailgun(notificationEmails, emailSubject, textContent, htmlContent)
      provider = 'Mailgun'
      console.log('[email] Sent via Mailgun')
    } catch (mailgunError) {
      console.warn('[email] Mailgun failed, trying Mailjet:', mailgunError)
      try {
        await sendViaMailjet(notificationEmails, emailSubject, textContent, htmlContent)
        provider = 'Mailjet'
        console.log('[email] Sent via Mailjet (fallback)')
      } catch (mailjetError) {
        console.error('[email] Both providers failed:', mailjetError)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully', provider })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
