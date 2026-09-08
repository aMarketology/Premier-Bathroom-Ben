import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import emailjs from '@emailjs/nodejs'
import twilio from 'twilio'
import { trackFormSubmission } from '@/lib/ga4-tracking'

// ── IP Rate Limiting ──────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }
  if (record.count >= RATE_LIMIT_MAX) return true
  record.count++
  return false
}
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE_LABELS: Record<string, string> = {
  'asap':         'As soon as possible',
  '1-3mo':        'Within 1–3 months',
  '3-6mo':        'Within 3–6 months',
  'just-looking': 'Just exploring',
}
const BUDGET_LABELS: Record<string, string> = {
  'under-5k': 'Under $5,000',
  '5k-10k':   '$5,000 – $10,000',
  '10k-20k':  '$10,000 – $20,000',
  '20k-plus': '$20,000+',
}

// ── Twilio SMS helper ────────────────────────────────────────────────────────
async function sendSmsAlert(name: string, phone: string, service: string | null, email: string | null, siteName: string) {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
  const twilioAuthToken  = process.env.TWILIO_AUTH_TOKEN
  const twilioFrom       = process.env.TWILIO_PHONE_NUMBER
  const bossPhone        = process.env.BOSS_PHONE_NUMBER
  const ccPhone          = process.env.CC_PHONE_NUMBER

  if (!twilioAccountSid || !twilioAuthToken || !twilioFrom) {
    console.warn('[sms] Twilio not configured — skipping SMS alert')
    return
  }

  // Build recipient list: boss + CC (deduplicated)
  const recipients: string[] = []
  if (bossPhone) recipients.push(bossPhone)
  if (ccPhone && ccPhone !== bossPhone) recipients.push(ccPhone)

  if (recipients.length === 0) {
    console.warn('[sms] No phone numbers configured — skipping SMS alert')
    return
  }

  try {
    const client = twilio(twilioAccountSid, twilioAuthToken)
    const serviceLine = service ? `Service: ${service}` : 'General Inquiry'
    const emailLine   = email ? `Email: ${email}` : 'No email provided'
    const body = `🔔 NEW LEAD — ${siteName}\n\nName: ${name}\nPhone: ${phone}\n${emailLine}\n${serviceLine}\n\nCall them ASAP!`

    for (const recipient of recipients) {
      await client.messages.create({ body, from: twilioFrom, to: recipient })
    }
    console.log(`[sms] Alert sent to ${recipients.length} recipient(s): ${recipients.join(', ')}`)
  } catch (err) {
    console.error('[sms] Failed to send SMS alert:', err)
  }
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Fire-and-forget email sender (runs in background, never blocks user) ────
async function sendLeadEmail(payload: {
  notificationEmails: string[]
  subject: string
  html: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  pageUrl: string
  timestamp: string
  siteName: string
}) {
  const { notificationEmails, subject, html, name, email, phone, service, message, pageUrl, timestamp, siteName } = payload

  // Try EmailJS first
  const emailjsServiceId = process.env.EMAILJS_SERVICE_ID
  const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID
  const emailjsPublicKey  = process.env.EMAILJS_PUBLIC_KEY

  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      emailjs.init({
        publicKey: emailjsPublicKey,
        ...(process.env.EMAILJS_PRIVATE_KEY ? { privateKey: process.env.EMAILJS_PRIVATE_KEY } : {}),
      })
      await emailjs.send(emailjsServiceId, emailjsTemplateId, {
        to_email: notificationEmails.join(','),
        subject,
        html,
        name,
        email,
        phone,
        service,
        message,
        page_url: pageUrl,
        submission_time: timestamp,
        site_name: siteName,
      })
      console.log('[email] Sent via EmailJS to:', notificationEmails)
      return
    } catch (emailjsErr) {
      console.warn('[email] EmailJS failed, falling back to Resend:', emailjsErr)
    }
  }

  // Fallback: Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Premier Bathroom Remodel <info@amarketology.com>',
      to: notificationEmails,
      subject,
      html,
    })
    console.log('[email] Sent via Resend (fallback) to:', notificationEmails)
  } catch (resendErr) {
    console.error('[email] Both EmailJS and Resend failed:', resendErr)
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ────────────────────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    if (isRateLimited(ip)) {
      console.warn(`[spam] Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }
    // ────────────────────────────────────────────────────────────────────────

    const body = await request.json()
    const { name, email, phone, message, service, smsConsent, pageUrl, clientId, sessionId, quiz, _hp, _lt } = body

    // ── Spam protection ──────────────────────────────────────────────────────
    if (_hp) {
      console.warn('[spam] Honeypot triggered')
      return NextResponse.json({ success: true })
    }
    if (_lt && Date.now() - Number(_lt) < 3000) {
      console.warn('[spam] Submission too fast')
      return NextResponse.json({ success: true })
    }
    // ────────────────────────────────────────────────────────────────────────

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    const subject = `New Lead: ${name} — ${service || 'General Inquiry'}`

    const timelineLabel = quiz?.timeline ? (TIMELINE_LABELS[quiz.timeline] || quiz.timeline) : null
    const budgetLabel   = quiz?.budget   ? (BUDGET_LABELS[quiz.budget]     || quiz.budget)   : null

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#2563eb,#1e40af);color:white;padding:30px;text-align:center;">
    <h1 style="margin:0;font-size:24px;">New Lead</h1>
    <p style="margin:8px 0 0;font-size:15px;">Premier Bathroom Remodel Austin</p>
  </div>
  <div style="background:#f7fafc;padding:30px;">

    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #3b82f6;margin-bottom:20px;">
      <p style="margin:0 0 8px;font-size:16px;"><strong style="color:#2563eb;">Name:</strong> ${name}</p>
      <p style="margin:0 0 8px;font-size:16px;"><strong style="color:#2563eb;">Phone:</strong> <a href="tel:${phone}" style="color:#2563eb;">${phone}</a></p>
      ${email ? `<p style="margin:0 0 8px;font-size:16px;"><strong style="color:#2563eb;">Email:</strong> <a href="mailto:${email}" style="color:#2563eb;">${email}</a></p>` : ''}
      ${service ? `<p style="margin:0 0 8px;font-size:15px;"><strong style="color:#2563eb;">Service:</strong> ${service}</p>` : ''}
      ${pageUrl ? `<p style="margin:0;font-size:13px;color:#718096;"><strong>Page:</strong> ${pageUrl}</p>` : ''}
    </div>

    ${(timelineLabel || budgetLabel) ? `
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #10b981;margin-bottom:20px;">
      <h3 style="color:#10b981;margin:0 0 12px;font-size:15px;">Quiz Answers</h3>
      ${timelineLabel ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Timeline:</strong> ${timelineLabel}</p>` : ''}
      ${budgetLabel   ? `<p style="margin:0;font-size:15px;"><strong>Budget:</strong> ${budgetLabel}</p>` : ''}
    </div>` : ''}

    ${message ? `
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #2563eb;margin-bottom:20px;">
      <h3 style="color:#2563eb;margin:0 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;margin:0;">${message}</p>
    </div>` : ''}

    ${smsConsent ? `
    <div style="background:#d6f5d6;padding:12px;border-radius:8px;margin-bottom:20px;">
      <p style="margin:0;color:#22543d;"><strong>SMS Consent:</strong> Customer agreed to receive SMS messages</p>
    </div>` : ''}

    <div style="background:white;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
      <p style="margin:0;color:#718096;font-size:13px;"><strong>Submitted:</strong> ${timestamp} (Central Time)</p>
    </div>
  </div>
  <div style="background:#2d3748;color:white;padding:16px;text-align:center;font-size:13px;">
    <p style="margin:0;">Premier Bathroom Remodel Austin — (512) 706-9577</p>
  </div>
</div>`

    // ── Send SMS alert to boss (non-blocking) ────────────────────────────────
    const siteName = process.env.SITE_NAME || 'Premier Bathroom Remodel'
    sendSmsAlert(name, phone, service, email, siteName)
    // ────────────────────────────────────────────────────────────────────────

    // ── Fire-and-forget: send email in background, respond immediately ──────
    const emailPayload = {
      notificationEmails,
      subject,
      html,
      name,
      email: email || 'Not provided',
      phone,
      service: service || 'General Inquiry',
      message: message || 'N/A',
      pageUrl: pageUrl || 'N/A',
      timestamp,
      siteName,
    }

    // Don't await — respond to user immediately, email sends in background
    sendLeadEmail(emailPayload)
    // ────────────────────────────────────────────────────────────────────────

    // GA4 tracking (non-blocking)
    trackFormSubmission({
      formName: pageUrl?.includes('/contact') ? 'Contact Page Form' : 'Landing Page Form',
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
