#!/usr/bin/env node

/**
 * Test script to simulate form submission and verify email delivery via Mailjet
 * 
 * Usage: node test-form-submission.js [server-url]
 * Example: node test-form-submission.js http://localhost:3000
 */

const serverUrl = process.argv[2] || 'http://localhost:3000';

const testFormData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(512) 555-1234',
  service: 'bathroom-remodel',
  message: 'I would like to get a quote for a complete bathroom remodel. Looking to modernize my master bathroom with new tile, fixtures, and vanity.',
  smsConsent: true
};

console.log('🧪 Testing Form Submission...\n');
console.log('📋 Test Data:');
console.log(JSON.stringify(testFormData, null, 2));
console.log('\n📤 Sending request to:', `${serverUrl}/api/send-email`);
console.log('⏳ Please wait...\n');

fetch(`${serverUrl}/api/send-email`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testFormData),
})
  .then(async (response) => {
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('📧 Email should be sent to:');
      console.log('   - premierremodelingoftexas@gmail.com');
      console.log('   - info@amarketology.com');
      console.log('\n📬 Check your inbox for the notification email!');
      console.log('\n📊 Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ FAILED!');
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  })
  .catch((error) => {
    console.error('❌ ERROR:', error.message);
    console.error('\n💡 Make sure the development server is running:');
    console.error('   npm run dev');
  });
