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
            From: { Email: 'info@amarketology.com', Name: 'Champs Tile Austin' },
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

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    // Resolve the source URL — prefer explicit pageUrl, fall back to referer header
    const sourceUrl = pageUrl || request.headers.get('referer') || 'Direct submission'
    const websiteSource = 'Champs Tile Branch'
    
    const serviceLabel = service
      ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      : 'Not specified'

    const textContent = `New Lead - ${websiteSource}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}${service ? `\nService: ${serviceLabel}` : ''}${message ? `\nMessage: ${message}` : ''}\nSubmitted from: ${sourceUrl}${smsConsent ? '\n\n✓ Customer agreed to receive SMS messages' : ''}\n\nSubmitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST`

    const emailSubject = `New Lead from ${websiteSource} - ${name}`

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
              <div class="field">
                <div class="field-label">Customer Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color:#d97706;">${email}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${phone}" style="color:#d97706;">${phone}</a></div>
              </div>
              ${service ? `
              <div class="field">
                <div class="field-label">Service Requested</div>
                <div class="field-value">${serviceLabel}</div>
              </div>` : ''}
              ${message ? `
              <div class="field">
                <div class="field-label">Message / Project Details</div>
                <div class="field-value" style="white-space:pre-wrap;">${message}</div>
              </div>` : ''}
              ${smsConsent ? `
              <div style="background:#fef3c7;border-left:4px solid #d97706;padding:14px 16px;border-radius:8px;margin-bottom:14px;">
                <div class="field-label">SMS Consent</div>
                <div class="field-value">✓ Customer agreed to receive SMS messages</div>
              </div>` : ''}
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
      { success: false, error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}
