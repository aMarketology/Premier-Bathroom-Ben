import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSiteConfig } from '@/lib/site-config'

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

// ── Fire-and-forget email sender (Resend primary) ───────────────────────────
async function sendLeadEmail(payload: {
  notificationEmails: string[]
  subject: string
  html: string
  siteName: string
}) {
  const { notificationEmails, subject, html, siteName } = payload
  const site = getSiteConfig()

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: site.fromEmail,
      to: notificationEmails,
      ...(site.bccEmails.length ? { bcc: site.bccEmails } : {}),
      subject: `[${siteName}] ${subject}`,
      html,
    })
    console.log(`[email] Sent via Resend (${site.id}) to:`, notificationEmails, 'bcc:', site.bccEmails)
  } catch (resendErr) {
    console.error('[email] Resend failed:', resendErr)
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
    const { name, email, phone, message, service, smsConsent, pageUrl, quiz, _hp, _lt } = body
    const site = getSiteConfig()

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

    const notificationEmails = site.notificationEmails

    if (notificationEmails.length === 0) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 })
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    const subject = `${site.name}: ${name} — ${service || 'General Inquiry'}`

    const timelineLabel = quiz?.timeline ? (TIMELINE_LABELS[quiz.timeline] || quiz.timeline) : null
    const budgetLabel   = quiz?.budget   ? (BUDGET_LABELS[quiz.budget]     || quiz.budget)   : null

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,${site.primaryHex},${site.primaryDarkHex});color:white;padding:30px;text-align:center;">
    <h1 style="margin:0;font-size:24px;">New Lead</h1>
    <p style="margin:8px 0 0;font-size:15px;">${site.name}</p>
  </div>
  <div style="background:#f7fafc;padding:30px;">

    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid ${site.accentHex};margin-bottom:20px;">
      <p style="margin:0 0 8px;font-size:16px;"><strong style="color:${site.primaryHex};">Name:</strong> ${name}</p>
      <p style="margin:0 0 8px;font-size:16px;"><strong style="color:${site.primaryHex};">Phone:</strong> <a href="tel:${phone}" style="color:${site.primaryHex};">${phone}</a></p>
      ${email ? `<p style="margin:0 0 8px;font-size:16px;"><strong style="color:${site.primaryHex};">Email:</strong> <a href="mailto:${email}" style="color:${site.primaryHex};">${email}</a></p>` : ''}
      ${service ? `<p style="margin:0 0 8px;font-size:15px;"><strong style="color:${site.primaryHex};">Service:</strong> ${service}</p>` : ''}
      ${pageUrl ? `<p style="margin:0;font-size:13px;color:#718096;"><strong>Page:</strong> ${pageUrl}</p>` : ''}
    </div>

    ${(timelineLabel || budgetLabel) ? `
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #10b981;margin-bottom:20px;">
      <h3 style="color:#10b981;margin:0 0 12px;font-size:15px;">Quiz Answers</h3>
      ${timelineLabel ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Timeline:</strong> ${timelineLabel}</p>` : ''}
      ${budgetLabel   ? `<p style="margin:0;font-size:15px;"><strong>Budget:</strong> ${budgetLabel}</p>` : ''}
    </div>` : ''}

    ${message ? `
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid ${site.accentHex};margin-bottom:20px;">
      <h3 style="color:${site.primaryHex};margin:0 0 8px;">Message</h3>
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
    <p style="margin:0;">${site.name} — ${site.phone}</p>
  </div>
</div>`

    // ── Send email (awaited — must complete before response on serverless) ────
    await sendLeadEmail({
      notificationEmails,
      subject,
      html,
      siteName: site.name,
    })
    // ────────────────────────────────────────────────────────────────────────

    // Respond immediately
    return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('[email] Error:', errMsg)
    return NextResponse.json({ error: 'Failed to send email', detail: errMsg }, { status: 500 })
  }
}
