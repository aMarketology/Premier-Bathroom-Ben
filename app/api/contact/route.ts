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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">New Lead</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">Tile Pros Austin</p>
        </div>

        ${pageUrl ? `
        <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 20px;">
          <p style="margin: 0; font-size: 13px; color: #1e3a8a;">
            <strong style="color: #1e40af;">Submitted from:</strong>&nbsp;
            <a href="${pageUrl}" style="color: #2563eb; word-break: break-all;">${pageUrl}</a>
          </p>
        </div>` : ''}
        
        <div style="background: #f7fafc; padding: 30px;">
          <h2 style="color: #1e40af; margin-top: 0;">Customer Information</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #1e40af;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #1e40af;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #1e40af;">Phone:</strong> <a href="tel:${phone}" style="color: #2563eb;">${phone}</a></p>
            ${service ? `<p style="margin: 0;"><strong style="color: #1e40af;">Service:</strong> ${service}</p>` : ''}
          </div>
          
          ${message ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">Message:</h3>
            <p style="color: #2d3748; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          ${smsConsent ? `
          <div style="background: #d6f5d6; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #48bb78;">
            <p style="margin: 0; color: #22543d;"><strong>✓ SMS Consent:</strong> Customer agreed to receive SMS messages</p>
          </div>
          ` : ''}
          
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #718096; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
            </p>
          </div>
        </div>
        
        <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0; font-weight: bold; color: #93c5fd;">Tile Pros Austin</p>
          <p style="margin: 4px 0 0 0; color: #bfdbfe;">Austin, TX &bull; (512) 706-9577</p>
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
