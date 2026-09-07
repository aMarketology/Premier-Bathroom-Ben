import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import emailjs from '@emailjs/nodejs'
import twilio from 'twilio'

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

  if (!twilioAccountSid || !twilioAuthToken || !twilioFrom || !bossPhone) {
    console.warn('[sms] Twilio not configured — skipping SMS alert')
    return
  }

  try {
    const client = twilio(twilioAccountSid, twilioAuthToken)
    const serviceLine = service ? `Service: ${service}` : 'General Inquiry'
    const emailLine   = email ? `Email: ${email}` : 'No email provided'

    await client.messages.create({
      body: `🔔 NEW LEAD — ${siteName}\n\nName: ${name}\nPhone: ${phone}\n${emailLine}\n${serviceLine}\n\nCall them ASAP!`,
      from: twilioFrom,
      to: bossPhone,
    })
    console.log('[sms] Alert sent to boss')
  } catch (err) {
    console.error('[sms] Failed to send SMS alert:', err)
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, quiz, pageUrl } = body

    if (!quiz?.timeline && !quiz?.budget) {
      return NextResponse.json({ ok: true })
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ ok: true })
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    const timelineLabel = quiz?.timeline ? (TIMELINE_LABELS[quiz.timeline] || quiz.timeline) : '—'
    const budgetLabel   = quiz?.budget   ? (BUDGET_LABELS[quiz.budget]     || quiz.budget)   : '—'
    const subject = `Partial Lead — ${service || 'Unknown Service'} (Quiz Completed)`

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;padding:30px;text-align:center;">
    <h1 style="margin:0;font-size:22px;">Partial Lead — Quiz Completed</h1>
    <p style="margin:8px 0 0;font-size:14px;">Visitor answered the quiz but hasn't submitted contact info yet</p>
  </div>
  <div style="background:#fffbeb;padding:30px;">
    <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #f59e0b;margin-bottom:16px;">
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
    <p style="margin:0;">Premier Bathroom Remodel Austin — (512) 706-9577 — ${timestamp} CT</p>
  </div>
</div>`

    // ── PRIMARY: EmailJS ─────────────────────────────────────────────────────
    let emailSent = false
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID
    const emailjsPublicKey  = process.env.EMAILJS_PUBLIC_KEY
    const siteName = process.env.SITE_NAME || 'Premier Bathroom Remodel'

    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        emailjs.init({
          publicKey: emailjsPublicKey,
          ...(process.env.EMAILJS_PRIVATE_KEY ? { privateKey: process.env.EMAILJS_PRIVATE_KEY } : {}),
        })
        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            to_email: notificationEmails.join(','),
            subject,
            html,
            name: 'Quiz Visitor (no contact info)',
            email: 'N/A',
            phone: 'N/A',
            service: service || 'Unknown Service',
            message: `Timeline: ${timelineLabel} | Budget: ${budgetLabel}`,
            page_url: pageUrl || 'N/A',
            submission_time: timestamp,
            site_name: siteName,
          },
        )
        console.log('[partial-lead] Sent via EmailJS')
        emailSent = true
      } catch (emailjsErr) {
        console.warn('[partial-lead] EmailJS failed, falling back to Resend:', emailjsErr)
      }
    } else {
      console.warn('[partial-lead] EmailJS not configured — will use Resend')
    }
    // ────────────────────────────────────────────────────────────────────────

    // ── FALLBACK: Resend ─────────────────────────────────────────────────────
    if (!emailSent) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Premier Bathroom Remodel <info@amarketology.com>',
        to: notificationEmails,
        subject,
        html,
      })
      console.log('[partial-lead] Sent via Resend (fallback)')
    }
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[partial-lead] Error:', err)
    return NextResponse.json({ ok: true }) // Never block the user
  }
}
