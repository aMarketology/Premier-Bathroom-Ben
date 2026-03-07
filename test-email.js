/**
 * Email Delivery Test Script
 * Sends a test email via Mailgun (primary) → Mailjet (fallback)
 * Run manually:  node test-email.js
 * Scheduled:     Every Monday at 6:00 AM via Windows Task Scheduler
 */

const fs = require('fs')
const path = require('path')

// ── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const [key, ...rest] = trimmed.split('=')
      if (key) process.env[key.trim()] = rest.join('=').trim()
    })
}

const MAILGUN_API_KEY  = process.env.MAILGUN_API_KEY
const MAILGUN_DOMAIN   = process.env.MAILGUN_DOMAIN
const MAILGUN_FROM     = process.env.MAILGUN_FROM
const MAILJET_API_KEY  = process.env.MAILJET_API_KEY
const MAILJET_SECRET   = process.env.MAILJET_SECRET_KEY
const RECIPIENTS       = [
  process.env.NOTIFICATION_EMAIL_1,
  process.env.NOTIFICATION_EMAIL_2,
].filter(Boolean)

const now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
const subject = `[TEST] Email Delivery Check — ${now}`
const text = `This is an automated weekly email delivery test.\n\nSent: ${now} (Central Time)\nProvider: {PROVIDER}\n\nIf you received this, the email system is working correctly.`
const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0c4a6e 0%,#0369a1 100%);color:white;padding:24px;text-align:center;border-radius:8px 8px 0 0;border-bottom:4px solid #0ea5e9;">
    <h2 style="margin:0;letter-spacing:1px;">✅ Tile Pros Austin — Email Test</h2>
    <p style="margin:8px 0 0;opacity:.85;font-size:14px;">Mailgun Delivery Check — Automated</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
    <p style="font-size:16px;color:#1e293b;">This is an automated weekly email delivery test.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      <tr style="background:white;">
        <td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;color:#1e3a8a;width:140px;">Sent</td>
        <td style="padding:12px;border:1px solid #e2e8f0;color:#374151;">${now} (CT)</td>
      </tr>
      <tr style="background:#f1f5f9;">
        <td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;color:#1e3a8a;">Provider</td>
        <td style="padding:12px;border:1px solid #e2e8f0;color:#374151;">{PROVIDER}</td>
      </tr>
      <tr style="background:white;">
        <td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;color:#1e3a8a;">Recipients</td>
        <td style="padding:12px;border:1px solid #e2e8f0;color:#374151;">${RECIPIENTS.join(', ')}</td>
      </tr>
    </table>
    <div style="margin-top:20px;padding:14px;background:#dcfce7;border-left:4px solid #16a34a;border-radius:4px;">
      <p style="margin:0;color:#166534;font-weight:bold;">✓ If you received this, the email system is working correctly.</p>
    </div>
  </div>
</div>
`

// ── Mailgun ───────────────────────────────────────────────────────────────────
async function sendViaMailgun() {
  const https = require('https')
  const results = await Promise.all(
    RECIPIENTS.map(
      (to) =>
        new Promise((resolve, reject) => {
          const body = new URLSearchParams({
            from: MAILGUN_FROM,
            to,
            subject,
            text: text.replace('{PROVIDER}', 'Mailgun'),
            html: html.replace(/{PROVIDER}/g, 'Mailgun'),
          }).toString()

          const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')
          const options = {
            hostname: 'api.mailgun.net',
            path: `/v3/${MAILGUN_DOMAIN}/messages`,
            method: 'POST',
            headers: {
              Authorization: `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(body),
            },
          }

          const req = https.request(options, (res) => {
            let data = ''
            res.on('data', (chunk) => (data += chunk))
            res.on('end', () => {
              if (res.statusCode >= 200 && res.statusCode < 300) resolve(data)
              else reject(new Error(`Mailgun ${res.statusCode}: ${data}`))
            })
          })
          req.on('error', reject)
          req.write(body)
          req.end()
        })
    )
  )
  return results
}

// ── Mailjet ───────────────────────────────────────────────────────────────────
async function sendViaMailjet() {
  const https = require('https')
  const payload = JSON.stringify({
    Messages: RECIPIENTS.map((to) => ({
      From: { Email: 'info@amarketology.com', Name: 'Tile Pros Austin' },
      To: [{ Email: to }],
      Subject: subject,
      TextPart: text.replace('{PROVIDER}', 'Mailjet (fallback)'),
      HTMLPart: html.replace(/{PROVIDER}/g, 'Mailjet (fallback)'),
    })),
  })

  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET}`).toString('base64')
    const options = {
      hostname: 'api.mailjet.com',
      path: '/v3.1/send',
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data)
        else reject(new Error(`Mailjet ${res.statusCode}: ${data}`))
      })
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

// ── Main ──────────────────────────────────────────────────────────────────────
;(async () => {
  console.log('\n======================================')
  console.log('  Email Delivery Test')
  console.log(`  ${now}`)
  console.log('======================================')
  console.log(`Recipients : ${RECIPIENTS.join(', ')}`)
  console.log(`Mailgun    : ${MAILGUN_FROM} via ${MAILGUN_DOMAIN}`)
  console.log('--------------------------------------')

  try {
    await sendViaMailgun()
    console.log('✅ SUCCESS — Sent via Mailgun (primary)')
  } catch (mailgunErr) {
    console.warn(`⚠️  Mailgun failed: ${mailgunErr.message}`)
    console.log('   Trying Mailjet fallback...')
    try {
      await sendViaMailjet()
      console.log('✅ SUCCESS — Sent via Mailjet (fallback)')
    } catch (mailjetErr) {
      console.error(`❌ FAILED — Both providers failed`)
      console.error(`   Mailjet error: ${mailjetErr.message}`)
      process.exit(1)
    }
  }

  console.log(`\nCheck inboxes: ${RECIPIENTS.join(', ')}`)
  console.log('======================================\n')
})()
