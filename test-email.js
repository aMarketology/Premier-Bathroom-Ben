// Test Mailjet Email Configuration
require('dotenv').config({ path: '.env.local' })

async function testEmail() {
  console.log('🧪 Testing Mailjet Email Configuration for Champs Tile...\n')

  // Check environment variables
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_SECRET_KEY
  const email1 = process.env.NOTIFICATION_EMAIL_1
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
