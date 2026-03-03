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
    const { name, email, phone, service, message, smsConsent } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailSubject = service 
      ? `New Service Request: ${service}` 
      : 'New Contact Form Submission'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 32px 30px; text-align: center; }
          .purple-bar { background: #7c3aed; height: 4px; }
          .content { background: #f9fafb; padding: 30px; }
          .field { margin-bottom: 16px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #7c3aed; }
          .field-label { font-weight: bold; color: #374151; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
          .field-value { color: #111827; font-size: 15px; }
          .footer { background: #111827; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#a78bfa;"></div>
              <span style="font-size:12px;color:#c4b5fd;letter-spacing:0.08em;font-weight:500;">NEW CUSTOMER INQUIRY</span>
            </div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 1px; color: white;">Tile Pros <span style="color:#a78bfa;font-weight:700;">Austin</span></h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #9ca3af;">Premier Tile &amp; Bathroom Services</p>
          </div>
          <div class="purple-bar"></div>
          <div class="content">
            <div class="field">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value"><a href="tel:${phone}" style="color:#7c3aed;">${phone}</a></div>
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
            ${smsConsent !== undefined ? `
            <div style="background:${smsConsent ? '#f3e8ff' : '#f9fafb'};border-left:4px solid ${smsConsent ? '#7c3aed' : '#d1d5db'};padding:14px 16px;border-radius:8px;margin-bottom:16px;">
              <div class="field-label">SMS Consent</div>
              <div class="field-value">${smsConsent ? '✓ Customer agreed to receive SMS messages' : 'No'}</div>
            </div>` : ''}
            <div style="background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
              Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
            </div>
          </div>
          <div class="footer">
            <p style="margin:0;font-weight:700;color:#a78bfa;font-size:15px;">Tile Pros Austin</p>
            <p style="margin:4px 0 0 0;color:#9ca3af;">Austin, TX &bull; (512) 706-9577</p>
            <p style="margin:8px 0 0 0;color:#6b7280;font-size:12px;">Please respond promptly to provide excellent customer service.</p>
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

    const textContent = `New inquiry from ${name}\nEmail: ${email}\nPhone: ${phone}${service ? `\nService: ${service}` : ''}${message ? `\nMessage: ${message}` : ''}${smsConsent ? '\n\n✓ Customer agreed to receive SMS messages' : ''}`

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
