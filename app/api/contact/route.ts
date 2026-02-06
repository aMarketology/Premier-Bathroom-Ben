import { NextRequest, NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'

// Initialize Mailjet client lazily to avoid build-time errors
function getMailjetClient() {
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_SECRET_KEY

  if (!apiKey || !apiSecret) {
    throw new Error('Mailjet credentials not configured')
  }

  return new Mailjet({
    apiKey,
    apiSecret
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service, smsConsent, pageUrl } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get notification emails from environment variables
    const notificationEmails = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2
    ].filter(Boolean)

    if (notificationEmails.length === 0) {
      console.error('No notification emails configured')
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      )
    }

    // Prepare email content
    const serviceText = service ? `\nService Requested: ${service}` : ''
    const messageText = message ? `\n\nMessage:\n${message}` : ''
    const smsConsentText = smsConsent ? '\n\n✓ Customer agreed to receive SMS messages' : ''
    const pageUrlText = pageUrl ? `\nSubmitted from: ${pageUrl}` : ''

    const emailContent = `
New Contact Form Submission - Premier Bathroom Remodel Austin

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Phone: ${phone}${serviceText}${messageText}${smsConsentText}${pageUrlText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
    `.trim()

    // Get Mailjet client
    const mailjet = getMailjetClient()

    // Send email to notification recipients
    const emailPromises = notificationEmails.map((recipientEmail) => {
      return mailjet
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
              Subject: `New Contact Form - ${name}`,
              TextPart: emailContent,
              HTMLPart: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Premier Bathroom Remodel Austin</p>
                  </div>
                  
                  <div style="background: #f7fafc; padding: 30px;">
                    <h2 style="color: #2563eb; margin-top: 0;">Customer Information</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Name:</strong> ${name}</p>
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
                      <p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Phone:</strong> <a href="tel:${phone}" style="color: #1e40af;">${phone}</a></p>
                      ${service ? `<p style="margin: 0 0 10px 0;"><strong style="color: #2563eb;">Service:</strong> ${service}</p>` : ''}
                      ${pageUrl ? `<p style="margin: 0;"><strong style="color: #2563eb;">Page URL:</strong> <a href="${pageUrl}" style="color: #1e40af; word-break: break-all;">${pageUrl}</a></p>` : ''}
                    </div>
                    
                    ${message ? `
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
                      <h3 style="color: #2563eb; margin-top: 0;">Message:</h3>
                      <p style="color: #2d3748; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    ` : ''}
                    
                    ${smsConsent ? `
                    <div style="background: #d6f5d6; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #48bb78;">
                      <p style="margin: 0; color: #22543d;"><strong>✓ SMS Consent:</strong> Customer agreed to receive SMS messages</p>
                    </div>
                    ` : ''}
                    
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
    })

    // Wait for all emails to be sent
    await Promise.all(emailPromises)

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
