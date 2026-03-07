/**
 * Email Delivery Test Script — Champs Tile Branch
 * Tests Mailgun (primary) → Mailjet (fallback)
 * No external dependencies — reads .env.local manually.
 * Run: node test-email.js
 */

const fs   = require('fs')
const path = require('path')
const https = require('https')

// ── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const [key, ...rest] = trimmed.split('=')
    if (key) process.env[key.trim()] = rest.join('=').trim()
  })
}

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
const MAILGUN_DOMAIN  = process.env.MAILGUN_DOMAIN
const MAILGUN_FROM    = process.env.MAILGUN_FROM
const MAILJET_API_KEY = process.env.MAILJET_API_KEY
const MAILJET_SECRET  = process.env.MAILJET_SECRET_KEY
const RECIPIENTS      = [
  process.env.NOTIFICATION_EMAIL_1,
  process.env.NOTIFICATION_EMAIL_2,
].filter(Boolean)

const now       = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
const sourceUrl = 'https://champstileaustin.com/ (TEST)'
const subject   = `[TEST] Champs Tile — Email Delivery Check — ${now}`

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #1c1917 0%, #292524 100%); color: white; padding: 32px 30px; text-align: center; }
    .gold-bar { background: linear-gradient(90deg, #d97706, #f59e0b, #d97706); height: 4px; }
    .source-bar { background: #fffbeb; border-left: 4px solid #d97706; padding: 14px 20px; }
    .content { background: #f9fafb; padding: 30px; }
    .field { margin-bottom: 14px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #d97706; }
    .field-label { font-weight: bold; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .field-value { color: #111827; font-size: 15px; }
    .footer { background: #1c1917; color: white; padding: 20px 30px; text-align: center; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(217,119,6,0.2);border:1px solid rgba(217,119,6,0.4);border-radius:20px;padding:6px 14px;margin-bottom:14px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#fbbf24;"></div>
        <span style="font-size:12px;color:#fcd34d;letter-spacing:0.08em;font-weight:500;">✅ TEST EMAIL</span>
      </div>
      <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:2px;color:#fbbf24;">CHAMPS</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#a8a29e;">Tile &amp; Bathroom Services — Austin, TX</p>
    </div>
    <div class="gold-bar"></div>
    <div class="source-bar">
      <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Submitted From</div>
      <span style="color:#b45309;font-size:13px;">${sourceUrl}</span>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Customer Name</div>
        <div class="field-value">Test User</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">test@champstileaustin.com</div>
      </div>
      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value">(512) 706-9577</div>
      </div>
      <div class="field">
        <div class="field-label">Service Requested</div>
        <div class="field-value">Custom Tile Installation</div>
      </div>
      <div class="field">
        <div class="field-label">Message / Project Details</div>
        <div class="field-value">This is an automated test to verify Mailgun delivery and Champs orange branding.</div>
      </div>
      <div style="background:#fef3c7;border-left:4px solid #d97706;padding:14px 16px;border-radius:8px;margin-bottom:14px;">
        <div class="field-label">SMS Consent</div>
        <div class="field-value">✓ Customer agreed to receive SMS messages</div>
      </div>
      <div style="background:#f3f4f6;padding:12px 16px;border-radius:8px;font-size:13px;color:#6b7280;">
        Provider: {PROVIDER} &bull; Sent: ${now} (Central Time)
      </div>
    </div>
    <div class="footer">
      <p style="margin:0;font-weight:700;color:#fbbf24;font-size:15px;letter-spacing:2px;">CHAMPS</p>
      <p style="margin:4px 0 0;color:#a8a29e;">Austin, TX &bull; (512) 706-9577</p>
      <p style="margin:8px 0 0;color:#78716c;font-size:12px;">Please respond to the customer as soon as possible.</p>
    </div>
  </div>
</body>
</html>
`

// ── Mailgun ───────────────────────────────────────────────────────────────────
async function sendViaMailgun() {
  const results = await Promise.all(
    RECIPIENTS.map(
      (to) =>
        new Promise((resolve, reject) => {
          const body = new URLSearchParams({
            from: MAILGUN_FROM,
            to,
            subject,
            text: `[TEST] Champs Tile email delivery check.\nProvider: Mailgun\nSent: ${now}\nSource: ${sourceUrl}`,
            html: html.replace('{PROVIDER}', 'Mailgun (primary)'),
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
              if (res.statusCode >= 200 && res.statusCode < 300) resolve({ to, data })
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

// ── Mailjet fallback ──────────────────────────────────────────────────────────
async function sendViaMailjet() {
  const payload = JSON.stringify({
    Messages: RECIPIENTS.map((to) => ({
      From: { Email: 'info@amarketology.com', Name: 'Champs Tile Austin' },
      To: [{ Email: to }],
      Subject: subject,
      TextPart: `[TEST] Champs Tile email delivery check.\nProvider: Mailjet fallback\nSent: ${now}`,
      HTMLPart: html.replace('{PROVIDER}', 'Mailjet (fallback)'),
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
  console.log('======================================')
  console.log('  Champs Tile — Email Delivery Test')
  console.log('  ' + now)
  console.log('======================================')
  console.log('Recipients :', RECIPIENTS.join(', '))
  console.log('Mailgun    :', MAILGUN_FROM, 'via', MAILGUN_DOMAIN)
  console.log('--------------------------------------')

  try {
    await sendViaMailgun()
    console.log('✅ SUCCESS — Sent via Mailgun (primary)')
  } catch (err) {
    console.warn('⚠️  Mailgun failed:', err.message)
    console.log('   Trying Mailjet fallback...')
    try {
      await sendViaMailjet()
      console.log('✅ SUCCESS — Sent via Mailjet (fallback)')
    } catch (err2) {
      console.error('❌ BOTH providers failed:', err2.message)
      process.exit(1)
    }
  }

  console.log('Check inboxes:', RECIPIENTS.join(', '))
  console.log('======================================')
})()
  const email2 = process.env.NOTIFICATION_EMAIL_2

  console.log('✓ API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ Missing')
  console.log('✓ API Secret:', apiSecret ? `${apiSecret.substring(0, 10)}...` : '❌ Missing')
  console.log('✓ Email 1:', email1 || '❌ Missing')
  console.log('✓ Email 2:', email2 || '❌ Missing')
  console.log('✓ Sender Email: info@amarketology.com')
  console.log('')

  if (!apiKey || !apiSecret) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
  }

  const recipients = [email1, email2].filter(Boolean)

  try {
    console.log('📧 Sending test email from: info@amarketology.com')
    console.log('📧 Sending to:', recipients.join(', '))
    console.log('')

    const testPageUrl = 'http://localhost:3000/test'
    
    for (const recipientEmail of recipients) {
      const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
        },
        body: JSON.stringify({
          Messages: [{
            From: {
              Email: 'info@amarketology.com',
              Name: 'Champs Tile Website'
            },
            To: [{
              Email: recipientEmail,
              Name: 'Champs Tile Team'
            }],
            Subject: 'TEST - Champs Tile Contact Form',
            TextPart: 'This is a test email from Champs Tile website',
            HTMLPart: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #D97706 0%, #B45309 100%); color: white; padding: 30px; text-align: center;">
                  <h1 style="margin: 0;">🏠 TEST Email</h1>
                  <p style="margin: 10px 0 0 0;">Champs Tile Austin</p>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                  <h2 style="color: #D97706;">Test Information</h2>
                  <p>This is a test email to verify Mailjet configuration.</p>
                  <p><strong>From:</strong> info@amarketology.com</p>
                  <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
                  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p style="margin: 0; color: #92400e;"><strong>⚠️ This is a TEST email</strong></p>
                  </div>
                </div>
              </div>
            `
          }]
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        console.log(`✅ Test email sent successfully to ${recipientEmail}`)
        console.log(`   Message ID: ${result.Messages[0].To[0].MessageID}`)
      } else {
        console.error(`❌ Failed to send to ${recipientEmail}:`, result)
      }
      console.log('')
    }

    console.log('🎉 Test completed!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testEmail()
