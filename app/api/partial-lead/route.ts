import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory dedup: track partial leads sent in the last 30 minutes
// Prevents flooding if user keeps tabbing away
const recentPartials = new Map<string, number>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, pageUrl, _hp } = body

    // Honeypot check
    if (_hp) return NextResponse.json({ success: true })

    // Need at least one meaningful field filled
    const hasName = typeof name === 'string' && name.trim().length >= 2
    const hasEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    const hasPhone = typeof phone === 'string' && phone.replace(/\D/g, '').length >= 7

    // Must have at least name OR (email or phone) to be worth capturing
    if (!hasName && !hasEmail && !hasPhone) {
      return NextResponse.json({ success: true })
    }

    // Dedup key — use email or phone as identifier, or name+page combo
    const dedupKey = (email || phone || name || '').trim().toLowerCase() + (pageUrl || '')
    const lastSent = recentPartials.get(dedupKey)
    if (lastSent && Date.now() - lastSent < 30 * 60 * 1000) {
      // Already sent a partial for this person in the last 30 min — skip
      return NextResponse.json({ success: true })
    }
    recentPartials.set(dedupKey, Date.now())

    // Clean up old entries (>1 hour) to prevent memory leak
    for (const [key, ts] of recentPartials.entries()) {
      if (Date.now() - ts > 60 * 60 * 1000) recentPartials.delete(key)
    }

    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
    ].filter(Boolean) as string[]

    if (notificationEmails.length === 0) return NextResponse.json({ success: true })

    const sourceUrl = pageUrl || 'Direct'
    const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })

    // Build filled fields summary
    const filledFields = [
      hasName ? `<div class="field"><div class="field-label">Name</div><div class="field-value">${name}</div></div>` : '',
      hasEmail ? `<div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${email}" style="color:#0284c7;">${email}</a></div></div>` : '',
      hasPhone ? `<div class="field"><div class="field-label">Phone</div><div class="field-value"><a href="tel:${phone}" style="color:#0284c7;">${phone}</a></div></div>` : '',
      message ? `<div class="field"><div class="field-label">Message (partial)</div><div class="field-value" style="white-space:pre-wrap;">${message}</div></div>` : '',
    ].filter(Boolean).join('')

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #713f12 0%, #92400e 100%); color: white; padding: 28px 30px; text-align: center; }
            .amber-bar { background: linear-gradient(90deg, #d97706, #fbbf24, #d97706); height: 4px; }
            .source-bar { background: #fffbeb; border-left: 4px solid #d97706; padding: 14px 20px; }
            .content { background: #f9fafb; padding: 30px; }
            .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #d97706; }
            .field-label { font-weight: bold; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .field-value { color: #111827; font-size: 15px; }
            .footer { background: #0c4a6e; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(251,191,36,0.2);border:1px solid rgba(251,191,36,0.4);border-radius:20px;padding:6px 14px;margin-bottom:12px;">
                <div style="width:8px;height:8px;border-radius:50%;background:#fbbf24;animation:pulse 2s infinite;"></div>
                <span style="font-size:12px;color:#fde68a;letter-spacing:0.08em;font-weight:500;">PARTIAL LEAD &#9888;</span>
              </div>
              <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:2px;color:#fde68a;">TILE PROS AUSTIN</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#fcd34d;">Started form but did not submit</p>
            </div>
            <div class="amber-bar"></div>
            <div class="source-bar">
              <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Abandoned On</div>
              <a href="${sourceUrl}" style="color:#b45309;font-size:13px;word-break:break-all;">${sourceUrl}</a>
            </div>
            <div class="content">
              <p style="background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:8px;font-size:13px;color:#92400e;margin:0 0 20px;">
                This visitor started filling out the contact form but left without submitting. Follow up if contact details are available.
              </p>
              ${filledFields}
              <div style="background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
                Captured: ${submitted} (Central Time)
              </div>
            </div>
            <div class="footer">
              <p style="margin:0;font-weight:700;color:#38bdf8;font-size:15px;letter-spacing:2px;">TILE PROS AUSTIN</p>
              <p style="margin:4px 0 0;color:#7dd3fc;font-size:13px;">Austin, TX &#183; (512) 492-2321</p>
            </div>
          </div>
        </body>
      </html>
    `

    const identifier = name || email || phone || 'Unknown visitor'
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: notificationEmails,
      cc: ['max@amarketology.com'],
      replyTo: email || undefined,
      subject: `⚠️ Partial Lead - ${identifier} (did not submit)`,
      html: htmlContent,
    })

    if (error) console.error('[resend partial] Error:', error)
    else console.log('[resend partial] Partial lead captured for:', identifier)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Partial lead error:', error)
    return NextResponse.json({ success: true }) // always return 200 to the client
  }
}
