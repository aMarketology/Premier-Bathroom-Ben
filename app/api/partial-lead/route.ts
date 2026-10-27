import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSiteConfig } from '@/lib/site-config'

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
async function sendPartialLeadEmail(payload: {
  notificationEmails: string[]
  subject: string
  html: string
}) {
  const { notificationEmails, subject, html } = payload
  const site = getSiteConfig()

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: site.fromEmail,
      to: notificationEmails,
      ...(site.bccEmails.length ? { bcc: site.bccEmails } : {}),
      subject,
      html,
    })
    console.log(`[partial-lead] Sent via Resend (${site.id}) to:`, notificationEmails, 'bcc:', site.bccEmails)
  } catch (resendErr) {
    console.error('[partial-lead] Resend failed:', resendErr)
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, quiz, pageUrl } = body
    const site = getSiteConfig()

    if (!quiz?.timeline && !quiz?.budget) {
      return NextResponse.json({ ok: true })
    }

    const notificationEmails = site.notificationEmails

    if (notificationEmails.length === 0) {
      return NextResponse.json({ ok: true })
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    const timelineLabel = quiz?.timeline ? (TIMELINE_LABELS[quiz.timeline] || quiz.timeline) : '—'
    const budgetLabel   = quiz?.budget   ? (BUDGET_LABELS[quiz.budget]     || quiz.budget)   : '—'
    const subject = `[${site.name}] Partial Lead — ${service || 'Unknown Service'} (Quiz Completed)`

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,${site.primaryHex},${site.primaryDarkHex});color:white;padding:30px;text-align:center;">
    <h1 style="margin:0;font-size:22px;">Partial Lead — Quiz Completed</h1>
    <p style="margin:8px 0 0;font-size:14px;">${site.name} — visitor answered the quiz but hasn't submitted contact info yet</p>
  </div>
  <div style="background:#fffbeb;padding:30px;">
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid ${site.accentHex};margin-bottom:16px;">
      <p style="margin:0 0 6px;font-size:12px;color:#92400e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">What they told us</p>
      <p style="margin:0 0 10px;font-size:17px;"><strong>Service:</strong> ${service || '—'}</p>
      <p style="margin:0 0 10px;font-size:17px;"><strong>Timeline:</strong> ${timelineLabel}</p>
      <p style="margin:0;font-size:17px;"><strong>Budget:</strong> ${budgetLabel}</p>
    </div>
    ${pageUrl ? `<div style="background:white;padding:12px 16px;border-radius:8px;margin-bottom:16px;border:1px solid #fde68a;"><p style="margin:0;font-size:13px;color:#78350f;"><strong>Page:</strong> ${pageUrl}</p></div>` : ''}
    <div style="background:#fef3c7;padding:16px;border-radius:8px;border:1px solid #fde68a;">
      <p style="margin:0;color:#92400e;font-size:13px;">
        <strong>Note:</strong> This visitor completed the quiz but has not yet filled in their contact info.
        They are likely still on the page. Follow up if they complete the form shortly.
      </p>
    </div>
  </div>
  <div style="background:#2d3748;color:white;padding:16px;text-align:center;font-size:12px;">
    <p style="margin:0;">${site.name} — ${site.phone} — ${timestamp} CT</p>
  </div>
</div>`

    // ── Send partial lead email (awaited — must complete on serverless) ──────
    await sendPartialLeadEmail({
      notificationEmails,
      subject,
      html,
    })
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[partial-lead] Error:', err)
    return NextResponse.json({ ok: true }) // Never block the user
  }
}
