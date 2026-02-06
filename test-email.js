// Test Mailjet Email Configuration
require('dotenv').config({ path: '.env.local' })
const Mailjet = require('node-mailjet')

async function testEmail() {
  console.log('🧪 Testing Mailjet Email Configuration...\n')

  // Check environment variables
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_SECRET_KEY
  const email1 = process.env.NOTIFICATION_EMAIL_1
  const email2 = process.env.NOTIFICATION_EMAIL_2

  console.log('✓ API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ Missing')
  console.log('✓ API Secret:', apiSecret ? `${apiSecret.substring(0, 10)}...` : '❌ Missing')
  console.log('✓ Email 1:', email1 || '❌ Missing')
  console.log('✓ Email 2:', email2 || '❌ Missing')
  console.log('')

  if (!apiKey || !apiSecret || !email1) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
  }

  // Initialize Mailjet
  const mailjet = new Mailjet({
    apiKey,
    apiSecret
  })

  const recipients = [email1, email2].filter(Boolean)

  try {
    console.log('📧 Sending test email to:', recipients.join(', '))
    console.log('')

    const testPageUrl = 'http://localhost:3000/test'
    
    for (const recipientEmail of recipients) {
      const result = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: 'info@amarketology.com',
                Name: 'Premier Bathroom Remodel Austin Website'
              },
              To: [
                {
                  Email: recipientEmail,
                  Name: 'Premier Bathroom Remodel Austin'
                }
              ],
              Subject: 'TEST - Contact Form Submission',
              TextPart: `
TEST Contact Form Submission - Premier Bathroom Remodel Austin

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Test User
Email: test@example.com
Phone: (512) 555-1234
Service Requested: Bathroom Remodeling
Submitted from: ${testPageUrl}

Message:
This is a test email to verify the Mailjet configuration is working correctly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
              `.trim(),
              HTMLPart: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">TEST - Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Premier Bathroom Remodel Austin</p>
                  </div>
                  
                  <div style="background: #f7fafc; padding: 30px;">
                    <h2 style="color: #2563eb; margin-top: 0;">Customer Information</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Name:</strong> Test User</p>
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Email:</strong> <a href="mailto:test@example.com" style="color: #1e40af;">test@example.com</a></p>
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Phone:</strong> <a href="tel:5125551234" style="color: #1e40af;">(512) 555-1234</a></p>
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Service:</strong> Bathroom Remodeling</p>
                      <p style="margin: 0;"><strong style="color: #2563eb;">Page URL:</strong> <a href="${testPageUrl}" style="color: #1e40af; word-break: break-all;">${testPageUrl}</a></p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
                      <h3 style="color: #2563eb; margin-top: 0;">Message:</h3>
                      <p style="color: #2d3748; line-height: 1.6;">This is a test email to verify the Mailjet configuration is working correctly.</p>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                      <p style="margin: 0; color: #92400e;"><strong>⚠️ This is a TEST email</strong> - Please disregard</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #718096; font-size: 14px;">
                        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)
                      </p>
                    </div>
                  </div>
                  
                  <div style="background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">Premier Bathroom Remodel Austin - Austin, TX</p>
                    <p style="margin: 5px 0 0 0;">(512) 706-9577</p>
                  </div>
                </div>
              `
            }
          ]
        })

      console.log(`✅ Test email sent successfully to: ${recipientEmail}`)
      console.log(`   Message ID: ${result.body.Messages[0].To[0].MessageID}`)
    }

    console.log('')
    console.log('🎉 All test emails sent successfully!')
    console.log('📬 Please check your inbox at:')
    recipients.forEach(email => console.log(`   - ${email}`))
    
  } catch (error) {
    console.error('')
    console.error('❌ Error sending test email:')
    console.error(error.response ? error.response.body : error.message)
    process.exit(1)
  }
}

testEmail()
