import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Dedup map: key = email|phone, value = timestamp of last send
// Prevents re-sending for the same person within 30 minutes
const dedupMap = new Map<string, number>()

function dedupKey(email: string, phone: string): string {
  const e = email?.trim().toLowerCase() || ''
  const p = phone?.replace(/\D/g, '') || ''
  return `${e}|${p}`
}

// Clean entries older than 1 hour to prevent memory leaks
function cleanOldEntries() {
  const cutoff = Date.now() - 60 * 60 * 1000
  for (const [key, ts] of dedupMap.entries()) {
    if (ts < cutoff) dedupMap.delete(key)
  }
}

export async function POST(request: NextRequest) {
  // Always return 200 — beacon ignores responses and we don't want to expose errors
  try {
    const body = await request.json()
    const { name, email, phone, service, message, pageUrl, _hp } = body

    // Honeypot check
    if (_hp) return NextResponse.json({ ok: true })

    // Require at least one meaningful field
    const hasName = typeof name === 'string' && name.trim().length >= 2
    const hasEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    const hasPhone = typeof phone === 'string' && phone.replace(/\D/g, '').length >= 7
    if (!hasName && !hasEmail && !hasPhone) return NextResponse.json({ ok: true })

    // Dedup check — don't re-send within 30 minutes for same contact
    cleanOldEntries()
    const key = dedupKey(email || '', phone || '')
    const lastSent = dedupMap.get(key)
    if (lastSent && Date.now() - lastSent < 30 * 60 * 1000) {
      return NextResponse.json({ ok: true })
    }
    dedupMap.set(key, Date.now())

    const sourceUrl = pageUrl || 'Unknown page'
    const serviceLabel = service
      ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      : null

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #78350f 0%, #92400e 100%); color: white; padding: 32px 30px; text-align: center; }
            .amber-bar { background: linear-gradient(90deg, #d97706, #f59e0b, #d97706); height: 4px; }
            .source-bar { background: #fffbeb; border-left: 4px solid #d97706; padding: 14px 20px; }
            .content { background: #f9fafb; padding: 30px; }
            .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #f59e0b; }
            .field-label { font-weight: bold; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .field-value { color: #111827; font-size: 15px; }
            .footer { background: #78350f; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(217,119,6,0.3);border:1px solid rgba(217,119,6,0.5);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
                <span style="font-size:13px;">⚠️</span>
                <span style="font-size:12px;color:#fde68a;letter-spacing:0.08em;font-weight:600;">PARTIAL LEAD</span>
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:2px;color:#fbbf24;">CHAMPS</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#fde68a;">User started a form but did not submit</p>
            </div>
            <div class="amber-bar"></div>
            <div class="source-bar">
              <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Abandoned On</div>
              <a href="${sourceUrl}" style="color:#b45309;font-size:13px;word-break:break-all;">${sourceUrl}</a>
            </div>
            <div class="content">
              ${hasName ? `<div class="field"><div class="field-label">Name</div><div class="field-value">${name}</div></div>` : ''}
              ${hasEmail ? `<div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${email}" style="color:#d97706;">${email}</a></div></div>` : ''}
              ${hasPhone ? `<div class="field"><div class="field-label">Phone</div><div class="field-value"><a href="tel:${phone}" style="color:#d97706;">${phone}</a></div></div>` : ''}
              ${serviceLabel ? `<div class="field"><div class="field-label">Service Interest</div><div class="field-value">${serviceLabel}</div></div>` : ''}
              ${message ? `<div class="field"><div class="field-label">Partial Message</div><div class="field-value" style="white-space:pre-wrap;">${message}</div></div>` : ''}
              <div style="background:#fef3c7;padding:12px 16px;border-radius:8px;font-size:13px;color:#92400e;border-left:4px solid #f59e0b;">
                <strong>Action:</strong> Follow up with this contact — they showed interest but did not complete the form.
              </div>
              <div style="margin-top:12px;background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
                Captured: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
              </div>
            </div>
            <div class="footer">
              <p style="margin:0;font-weight:700;color:#fbbf24;font-size:15px;letter-spacing:2px;">CHAMPS</p>
              <p style="margin:4px 0 0;color:#fde68a;">Austin, TX &bull; (512) 706-9577</p>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'info@amarketology.com',
      to: [process.env.NOTIFICATION_EMAIL_1 || ''],
      cc: ['max@amarketology.com'],
      subject: `Partial Lead ⚠️ - Champs Tile Austin - ${name || email || phone}`,
      html: htmlContent,
    })

    console.log('[partial-lead] Sent via Resend')
  } catch (err) {
    console.error('[partial-lead] Error:', err)
  }

  return NextResponse.json({ ok: true })
}
