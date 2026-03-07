import { NextRequest, NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { trackFormSubmission } from '@/lib/ga4-tracking'

// â”€â”€ Mailgun (Primary) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function sendViaMailgun(to: string[], subject: string, text: string, html: string) {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY!,
  })
  const domain = process.env.MAILGUN_DOMAIN!
  const from = process.env.MAILGUN_FROM!

  await Promise.all(
    to.map((recipient) =>
      mg.messages.create(domain, {
        from,
        to: [recipient],
        subject,
        text,
        html,
      })
    )
  )
}

// â”€â”€ Mailjet (Fallback) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function sendViaMailjet(to: string[], subject: string, text: string, html: string) {
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_SECRET_KEY
  if (!apiKey || !apiSecret) throw new Error('Mailjet credentials not configured')

  const mailjet = new Mailjet({ apiKey, apiSecret })
  await Promise.all(
    to.map((recipient) =>
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [{
          From: { Email: 'info@amarketology.com', Name: 'Premier Bathroom Remodel Austin' },
          To: [{ Email: recipient }],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        }],
      })
    )
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service, smsConsent, pageUrl, clientId, sessionId, _hp, _lt } = body

    // ── Spam bot protection ───────────────────────────────────────────────────
    // 1. Honeypot: real users never fill this hidden field
    if (_hp) {
      console.warn('[spam] Honeypot triggered — silently discarding submission')
      return NextResponse.json({ success: true, message: 'Received' })
    }
    // 2. Timing: legitimate users take more than 3 seconds to fill a form
    if (_lt && Date.now() - Number(_lt) < 3000) {
      console.warn('[spam] Submission too fast — silently discarding')
      return NextResponse.json({ success: true, message: 'Received' })
    }
    // ─────────────────────────────────────────────────────────────────────────

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    const subject = `New Contact Form - ${name}`
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })

    const textBody = [
      'New Contact Form Submission - Premier Bathroom Remodel Austin',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      service ? `Service: ${service}` : null,
      message ? `Message:\n${message}` : null,
      smsConsent ? 'Customer agreed to receive SMS messages' : null,
      pageUrl ? `Submitted from: ${pageUrl}` : null,
      `Submitted: ${timestamp} (Central Time)`,
    ].filter(Boolean).join('\n')

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#2563eb,#1e40af);color:white;padding:30px;text-align:center;">
          <h1 style="margin:0;font-size:24px;">New Contact Form Submission</h1>
          <p style="margin:8px 0 0;font-size:15px;">Premier Bathroom Remodel Austin</p>
        </div>
        <div style="background:#f7fafc;padding:30px;">
          <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #3b82f6;margin-bottom:20px;">
            <p style="margin:0 0 8px;"><strong style="color:#2563eb;">Name:</strong> ${name}</p>
            <p style="margin:0 0 8px;"><strong style="color:#2563eb;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin:0 0 8px;"><strong style="color:#2563eb;">Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${service ? `<p style="margin:0 0 8px;"><strong style="color:#2563eb;">Service:</strong> ${service}</p>` : ''}
            ${pageUrl ? `<p style="margin:0;"><strong style="color:#2563eb;">Page:</strong> ${pageUrl}</p>` : ''}
          </div>
          ${message ? `<div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #2563eb;margin-bottom:20px;"><h3 style="color:#2563eb;margin-top:0;">Message</h3><p style="white-space:pre-wrap;">${message}</p></div>` : ''}
          ${smsConsent ? `<div style="background:#d6f5d6;padding:12px;border-radius:8px;margin-bottom:20px;"><p style="margin:0;color:#22543d;"><strong>SMS Consent:</strong> Customer agreed to receive SMS messages</p></div>` : ''}
          <div style="background:white;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
            <p style="margin:0;color:#718096;font-size:13px;"><strong>Submitted:</strong> ${timestamp} (Central Time)</p>
          </div>
        </div>
        <div style="background:#2d3748;color:white;padding:20px;text-align:center;font-size:13px;">
          <p style="margin:0;">Premier Bathroom Remodel Austin â€” (512) 492-2321</p>
        </div>
      </div>`

    // Try Mailgun first, fall back to Mailjet
    try {
      await sendViaMailgun(notificationEmails, subject, textBody, htmlBody)
      console.log('[email] Sent via Mailgun')
    } catch (mailgunErr) {
      console.warn('[email] Mailgun failed, trying Mailjet:', mailgunErr instanceof Error ? mailgunErr.message : mailgunErr)
      await sendViaMailjet(notificationEmails, subject, textBody, htmlBody)
      console.log('[email] Sent via Mailjet fallback')
    }

    // GA4 tracking (non-blocking)
    trackFormSubmission({
      formName: pageUrl?.includes('/contact') ? 'Contact Page Form' : 'Homepage Form',
      formLocation: pageUrl || 'Unknown',
      service, name, email, phone, smsConsent, clientId, sessionId,
    }).catch((err) => console.error('GA4 tracking error:', err))

    return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('[email] Error:', errMsg)
    return NextResponse.json({ error: 'Failed to send email', detail: errMsg }, { status: 500 })
  }
}

