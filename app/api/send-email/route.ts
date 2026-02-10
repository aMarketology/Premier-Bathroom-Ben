import { NextRequest, NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_SECRET_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, smsConsent } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailSubject = service 
      ? `New Service Request: ${service}` 
      : 'New Contact Form Submission'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #1e3a8a; }
          .field-label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
          .field-value { color: #4b5563; }
          .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Tile Pros Austin</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">New Customer Inquiry</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Customer Name:</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email Address:</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #1e3a8a;">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Phone Number:</div>
              <div class="field-value"><a href="tel:${phone}" style="color: #1e3a8a;">${phone}</a></div>
            </div>
            
            ${service ? `
              <div class="field">
                <div class="field-label">Service Requested:</div>
                <div class="field-value">${service}</div>
              </div>
            ` : ''}
            
            ${message ? `
              <div class="field">
                <div class="field-label">Project Details:</div>
                <div class="field-value">${message}</div>
              </div>
            ` : ''}
            
            ${smsConsent !== undefined ? `
              <div class="field">
                <div class="field-label">SMS Consent:</div>
                <div class="field-value">${smsConsent ? 'Yes - Customer agreed to receive SMS messages' : 'No'}</div>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>This inquiry was submitted through TileProsAustin.com</p>
            <p>Please respond promptly to provide excellent customer service.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Mailjet
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'info@amarketology.com',
            Name: 'Tile Pros Austin Website'
          },
          To: [
            {
              Email: 'premierremodelingoftexas@gmail.com',
              Name: 'Tile Pros Austin'
            },
            {
              Email: 'max@amarketology.com',
              Name: 'Max Amarketology'
            }
          ],
          Subject: emailSubject,
          HTMLPart: htmlContent,
          TextPart: `New inquiry from ${name}\nEmail: ${email}\nPhone: ${phone}${service ? `\nService: ${service}` : ''}${message ? `\nMessage: ${message}` : ''}`
        }
      ]
    })

    console.log('Email sent successfully:', result.body)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
