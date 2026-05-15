import { NextRequest, NextResponse } from 'next/server'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import Mailjet from 'node-mailjet'

async function sendViaMailgun(to: string[], subject: string, text: string, html: string) {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! })
  await Promise.all(
    to.map(recipient =>
      mg.messages.create(process.env.MAILGUN_DOMAIN!, {
        from: process.env.MAILGUN_FROM!,
        to: [recipient],
        subject,
        text,
        html,
      })
    )
  )
}

async function sendViaMailjet(to: string[], subject: string, text: string, html: string) {
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY!,
    apiSecret: process.env.MAILJET_SECRET_KEY!,
  })
  await Promise.all(
    to.map(recipient =>
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
    const { service, quiz, pageUrl } = body

    // Need at least one quiz answer to be worth sending
    if (!quiz?.timeline && !quiz?.budget) {
      return NextResponse.json({ ok: true })
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) {
      return NextResponse.json({ ok: true }) // Don't block the user
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
    const subject = `Partial Lead — ${service || 'Unknown Service'} (Quiz Completed)`

    const TIMELINE_LABELS: Record<string, string> = {
      'asap': 'As soon as possible',
      '1-3mo': 'Within 1–3 months',
      '3-6mo': 'Within 3–6 months',
      'just-looking': 'Just exploring',
    }
    const BUDGET_LABELS: Record<string, string> = {
      'under-5k': 'Under $5,000',
      '5k-10k': '$5,000 – $10,000',
      '10k-20k': '$10,000 – $20,000',
      '20k-plus': '$20,000+',
    }

    const timelineLabel = TIMELINE_LABELS[quiz.timeline] || quiz.timeline || '—'
    const budgetLabel = BUDGET_LABELS[quiz.budget] || quiz.budget || '—'

    const textBody = [
      'PARTIAL LEAD — Premier Bathroom Remodel Austin',
      'This visitor completed the quiz but has not yet submitted contact info.',
      '',
      `Service: ${service || '—'}`,
      `Timeline: ${timelineLabel}`,
      `Budget: ${budgetLabel}`,
      pageUrl ? `Page: ${pageUrl}` : null,
      `Captured: ${timestamp} (Central Time)`,
    ].filter(Boolean).join('\n')

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;padding:30px;text-align:center;">
          <h1 style="margin:0;font-size:22px;">Partial Lead — Quiz Completed</h1>
          <p style="margin:8px 0 0;font-size:14px;">This visitor answered the quiz but hasn't submitted contact info yet</p>
        </div>
        <div style="background:#fffbeb;padding:30px;">
          <div style="background:white;padding:20px;border-radius:8px;border-left:4px solid #f59e0b;margin-bottom:16px;">
            <p style="margin:0 0 10px;font-size:13px;color:#92400e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">What they told us</p>
            <p style="margin:0 0 8px;font-size:16px;"><strong>Service:</strong> ${service || '—'}</p>
            <p style="margin:0 0 8px;font-size:16px;"><strong>Timeline:</strong> ${timelineLabel}</p>
            <p style="margin:0;font-size:16px;"><strong>Budget:</strong> ${budgetLabel}</p>
          </div>
          ${pageUrl ? `<div style="background:white;padding:12px 16px;border-radius:8px;margin-bottom:16px;border:1px solid #fde68a;"><p style="margin:0;font-size:13px;color:#78350f;"><strong>Page:</strong> ${pageUrl}</p></div>` : ''}
          <div style="background:#fef3c7;padding:16px;border-radius:8px;border:1px solid #fde68a;">
            <p style="margin:0;color:#92400e;font-size:13px;">
              <strong>Note:</strong> This visitor is still on the page (or was within the last 2 minutes). 
              They may complete the form — if not, you have their intent data for retargeting.
            </p>
          </div>
        </div>
        <div style="background:#2d3748;color:white;padding:16px;text-align:center;font-size:12px;">
          <p style="margin:0;">Premier Bathroom Remodel Austin — (512) 706-9577 — ${timestamp} CT</p>
        </div>
      </div>`

    try {
      await sendViaMailgun(notificationEmails, subject, textBody, htmlBody)
    } catch {
      await sendViaMailjet(notificationEmails, subject, textBody, htmlBody)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Never block the user — partial leads are best-effort
    console.error('[partial-lead]', err)
    return NextResponse.json({ ok: true })
  }
}
