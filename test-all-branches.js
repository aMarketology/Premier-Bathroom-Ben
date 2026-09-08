#!/usr/bin/env node

/**
 * Test Contact Form — All Branches
 * 
 * Usage:
 *   node test-all-branches.js [base-url]
 * 
 * Examples:
 *   node test-all-branches.js http://localhost:3000    (local dev)
 *   node test-all-branches.js https://premier-bathroom-remodel.vercel.app
 * 
 * This script tests:
 *   1. /api/contact — full form submission
 *   2. /api/partial-lead — quiz partial lead
 *   3. Verifies EmailJS, Twilio SMS, and Resend fallback
 */

require('dotenv').config({ path: '.env' })

const baseUrl = process.argv[2] || 'http://localhost:3000'
const siteName = process.env.SITE_NAME || 'Unknown Branch'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

function log(emoji, msg, color = 'reset') {
  console.log(`${colors[color]}${emoji} ${msg}${colors.reset}`)
}

function divider() {
  console.log('─'.repeat(60))
}

async function testContactForm() {
  log('📧', 'TEST 1: Full Contact Form Submission', 'cyan')
  divider()

  const payload = {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '(512) 555-0123',
    service: 'Bathroom Remodeling',
    message: `[TEST] This is an automated test from branch: ${siteName}`,
    smsConsent: true,
    pageUrl: `${baseUrl}/test`,
    quiz: {
      timeline: 'asap',
      budget: '10k-20k',
    },
  }

  console.log(`   SITE_NAME: ${colors.bold}${siteName}${colors.reset}`)
  console.log(`   POST → ${baseUrl}/api/contact`)
  console.log(`   Payload: ${JSON.stringify(payload, null, 2).replace(/"/g, '')}`)
  console.log()

  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    console.log(`   Status: ${res.status}`)
    console.log(`   Response: ${JSON.stringify(data)}`)

    if (res.ok && data.success) {
      log('✅', 'Contact form test PASSED', 'green')
      console.log(`   → EmailJS should have sent to: ${process.env.NOTIFICATION_EMAIL_1}, ${process.env.NOTIFICATION_EMAIL_2}`)
      console.log(`   → Twilio SMS should have sent to: ${process.env.BOSS_PHONE_NUMBER}`)
      console.log(`   → SITE_NAME in email/SMS: "${siteName}"`)
    } else {
      log('❌', `Contact form test FAILED: ${data.error || 'Unknown error'}`, 'red')
    }
  } catch (err) {
    log('❌', `Contact form test ERROR: ${err.message}`, 'red')
    console.log(`   Make sure the dev server is running: npm run dev`)
  }
  console.log()
}

async function testPartialLead() {
  log('📋', 'TEST 2: Partial Lead (Quiz Only)', 'cyan')
  divider()

  const payload = {
    service: 'Bathroom Remodeling',
    quiz: {
      timeline: '1-3mo',
      budget: '5k-10k',
    },
    pageUrl: `${baseUrl}/services/bathroom-remodeling-austin`,
  }

  console.log(`   SITE_NAME: ${colors.bold}${siteName}${colors.reset}`)
  console.log(`   POST → ${baseUrl}/api/partial-lead`)
  console.log()

  try {
    const res = await fetch(`${baseUrl}/api/partial-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    console.log(`   Status: ${res.status}`)
    console.log(`   Response: ${JSON.stringify(data)}`)

    if (res.ok && data.ok) {
      log('✅', 'Partial lead test PASSED', 'green')
    } else {
      log('❌', `Partial lead test FAILED`, 'red')
    }
  } catch (err) {
    log('❌', `Partial lead test ERROR: ${err.message}`, 'red')
  }
  console.log()
}

async function checkEnvVars() {
  log('🔍', 'Environment Check', 'cyan')
  divider()

  const vars = [
    ['EMAILJS_SERVICE_ID', process.env.EMAILJS_SERVICE_ID],
    ['EMAILJS_TEMPLATE_ID', process.env.EMAILJS_TEMPLATE_ID],
    ['EMAILJS_PUBLIC_KEY', process.env.EMAILJS_PUBLIC_KEY],
    ['EMAILJS_PRIVATE_KEY', process.env.EMAILJS_PRIVATE_KEY],
    ['RESEND_API_KEY', process.env.RESEND_API_KEY],
    ['TWILIO_ACCOUNT_SID', process.env.TWILIO_ACCOUNT_SID],
    ['TWILIO_AUTH_TOKEN', process.env.TWILIO_AUTH_TOKEN],
    ['TWILIO_PHONE_NUMBER', process.env.TWILIO_PHONE_NUMBER],
    ['BOSS_PHONE_NUMBER', process.env.BOSS_PHONE_NUMBER],
    ['NOTIFICATION_EMAIL_1', process.env.NOTIFICATION_EMAIL_1],
    ['NOTIFICATION_EMAIL_2', process.env.NOTIFICATION_EMAIL_2],
    ['SITE_NAME', process.env.SITE_NAME],
  ]

  let allGood = true
  for (const [name, value] of vars) {
    const status = value ? '✅' : '❌'
    const display = value ? `${value.substring(0, 25)}${value.length > 25 ? '...' : ''}` : 'MISSING'
    console.log(`   ${status} ${name.padEnd(22)} = ${display}`)
    if (!value) allGood = false
  }

  if (!allGood) {
    log('⚠️', 'Some env vars are missing — check your .env file', 'yellow')
  } else {
    log('✅', 'All environment variables present', 'green')
  }
  console.log()
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log()
  log('🧪', 'PREMIER BATHROOM — FORM TEST SUITE', 'bold')
  log('🌐', `Target: ${baseUrl}`, 'cyan')
  log('🏷️', `Branch: ${siteName}`, 'cyan')
  console.log()

  await checkEnvVars()
  await testContactForm()
  await testPartialLead()

  divider()
  console.log()
  log('📋', 'WHAT TO VERIFY MANUALLY:', 'yellow')
  console.log(`   1. Check ${process.env.NOTIFICATION_EMAIL_1} for the test email`)
  console.log(`   2. Check ${process.env.NOTIFICATION_EMAIL_2} for the test email`)
  console.log(`   3. Check ${process.env.BOSS_PHONE_NUMBER} for the SMS alert`)
  console.log(`   4. Email subject should contain the customer name`)
  console.log(`   5. SMS should say "NEW LEAD — ${siteName}"`)
  console.log()
  log('✅', 'Test suite complete!', 'green')
  console.log()
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})