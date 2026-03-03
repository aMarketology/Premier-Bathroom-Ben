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
    const { name, email, phone, message, service, smsConsent, pageUrl } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get notification emails from environment variables
    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      console.error('No notification emails configured')
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      )
    }

    // Prepare email content
    const serviceText = service ? `\nService Requested: ${service}` : ''
    const messageText = message ? `\n\nMessage:\n${message}` : ''
    const smsConsentText = smsConsent ? '\n\n✓ Customer agreed to receive SMS messages' : ''
    const pageUrlText = pageUrl ? `\nSubmitted from: ${pageUrl}` : ''

    const emailContent = `
New Lead - Tile Pros Austin

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Phone: ${phone}${serviceText}${pageUrlText}${messageText}${smsConsentText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
    `.trim()

    const subject = `New Contact Form - ${name}`

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
        <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 32px 30px; text-align: center;">
          <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
            <div style="width:8px;height:8px;border-radius:50%;background:#a78bfa;"></div>
            <span style="font-size:12px;color:#c4b5fd;letter-spacing:0.08em;font-weight:500;">NEW LEAD</span>
          </div>
          <h1 style="margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 1px; color: white;">Tile Pros <span style="color:#a78bfa;font-weight:700;">Austin</span></h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #9ca3af;">Premier Tile &amp; Bathroom Services</p>
        </div>
        <div style="background:#7c3aed;height:4px;"></div>

        ${pageUrl ? `
        <div style="background:#faf5ff;border-left:4px solid #7c3aed;padding:12px 20px;">
          <p style="margin:0;font-size:13px;color:#374151;">
            <strong style="color:#7c3aed;">Submitted from:</strong>&nbsp;
            <a href="${pageUrl}" style="color:#7c3aed;word-break:break-all;">${pageUrl}</a>
          </p>
        </div>` : ''}

        <div style="background:#f9fafb;padding:30px;">
          <h2 style="color:#111827;margin-top:0;font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #7c3aed;padding-bottom:8px;display:inline-block;">Customer Information</h2>

          <div style="background:white;padding:20px;border-radius:8px;margin:16px 0;border-left:4px solid #7c3aed;">
            <p style="margin:0 0 10px 0;"><strong style="color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Name</strong><br/><span style="color:#111827;font-size:15px;">${name}</span></p>
            <p style="margin:0 0 10px 0;"><strong style="color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Email</strong><br/><a href="mailto:${email}" style="color:#7c3aed;font-size:15px;">${email}</a></p>
            <p style="margin:0 0 ${service ? '10px' : '0'} 0;"><strong style="color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Phone</strong><br/><a href="tel:${phone}" style="color:#7c3aed;font-size:15px;">${phone}</a></p>
            ${service ? `<p style="margin:0;"><strong style="color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Service</strong><br/><span style="color:#111827;font-size:15px;">${service}</span></p>` : ''}
          </div>

          ${message ? `
          <div style="background:white;padding:20px;border-radius:8px;margin-bottom:16px;border-left:4px solid #7c3aed;">
            <strong style="color:#374151;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Message</strong>
            <p style="color:#111827;line-height:1.6;white-space:pre-wrap;margin:8px 0 0 0;font-size:15px;">${message}</p>
          </div>` : ''}

          ${smsConsent ? `
          <div style="background:#f3e8ff;padding:14px 16px;border-radius:8px;margin-bottom:16px;border-left:4px solid #7c3aed;">
            <p style="margin:0;color:#5b21b6;"><strong>✓ SMS Consent:</strong> Customer agreed to receive SMS messages</p>
          </div>` : ''}

          <div style="background:white;padding:12px 16px;border-radius:8px;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;">
            <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
          </div>
        </div>

        <div style="background:#111827;color:white;padding:20px 30px;text-align:center;font-size:13px;">
          <p style="margin:0;font-weight:700;color:#a78bfa;font-size:15px;">Tile Pros Austin</p>
          <p style="margin:4px 0 0 0;color:#9ca3af;">Austin, TX &bull; (512) 706-9577</p>
          <p style="margin:8px 0 0 0;color:#6b7280;font-size:12px;">Please respond promptly to provide excellent customer service.</p>
        </div>
      </div>
    `

    // ── Send with Mailgun (primary) → Mailjet (fallback) ──────────────────────
    let provider = 'unknown'
    try {
      await sendViaMailgun(notificationEmails, subject, emailContent, htmlContent)
      provider = 'Mailgun'
      console.log('[email] Sent via Mailgun')
    } catch (mailgunError) {
      console.warn('[email] Mailgun failed, trying Mailjet:', mailgunError)
      try {
        await sendViaMailjet(notificationEmails, subject, emailContent, htmlContent)
        provider = 'Mailjet'
        console.log('[email] Sent via Mailjet (fallback)')
      } catch (mailjetError) {
        console.error('[email] Both providers failed:', mailjetError)
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully', provider },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
