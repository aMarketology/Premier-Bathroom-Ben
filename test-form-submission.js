#!/usr/bin/env node

/**
 * Test Form Submission Script
 * 
 * Usage: node test-form-submission.js [base-url]
 * Example: node test-form-submission.js http://localhost:3000
 */

const baseUrl = process.argv[2] || 'http://localhost:3000'

const testData = {
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '512-555-1234',
  service: 'Bathroom Remodeling',
  message: 'This is a test submission to verify the form email integration is working correctly.',
  smsConsent: true
}

console.log('🧪 Testing form submission...')
console.log(`📤 Sending test data to: ${baseUrl}/api/send-email\n`)

fetch(`${baseUrl}/api/send-email`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => {
    console.log(`📬 Response status: ${response.status}`)
    return response.json()
  })
  .then(data => {
    if (data.success) {
      console.log('✅ SUCCESS! 📧 Email sent successfully')
      console.log(`🎯 Lead source: ${data.leadSource}`)
      console.log('\nEmails delivered to:')
      console.log('- premierremodelingoftexas@gmail.com')
      console.log('- info@amarketology.com')
    } else {
      console.log('❌ FAILED!')
      console.log('Error:', data.error)
      if (data.details) {
        console.log('Details:', data.details)
      }
    }
  })
  .catch(error => {
    console.error('❌ ERROR:', error.message)
    console.log('\n💡 Make sure:')
    console.log('1. Your dev server is running (npm run dev)')
    console.log('2. The base URL is correct')
    console.log('3. Your .env.local file has Mailjet credentials')
  })
