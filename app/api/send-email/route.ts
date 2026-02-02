import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  t            From: {
              Email: notificationEmail2,
              Name: "Champs Tile Website"
            },
            To: [
              {
                Email: notificationEmail1,
                Name: "Champs Tile Team"
              },
              {
                Email: notificationEmail2,
                Name: "Amarketology"
              }
            ],
            Subject: `🔔 New Lead from ${websiteSource} - ${name}`,body = await request.json()
    const { name, email, phone, service, message, smsConsent } = body

    // Mailjet API credentials from environment variables
    const apiKey = process.env.MAILJET_API_KEY
    const secretKey = process.env.MAILJET_SECRET_KEY
    const notificationEmail1 = process.env.NOTIFICATION_EMAIL_1
    const notificationEmail2 = process.env.NOTIFICATION_EMAIL_2

    if (!apiKey || !secretKey) {
      throw new Error('Mailjet API credentials not configured')
    }

    // Get website/branch information
    const referer = request.headers.get('referer') || 'Direct submission'
    const origin = request.headers.get('origin') || 'Unknown origin'
    const websiteSource = 'TP Bathroom Remodeling Branch'
    
    // Prepare email content
    const serviceLabel = service ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Not specified'
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .value { color: #4b5563; padding: 10px; background: white; border-radius: 5px; }
            .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🏠 New Quote Request</h1>
              <p style="margin: 10px 0 0 0;">Premier Bathroom Remodel Austin</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Customer Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${service ? `
              <div class="field">
                <div class="label">Service Requested:</div>
                <div class="value">${serviceLabel}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <div class="label">Message/Project Details:</div>
                <div class="value">${message}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">SMS Consent:</div>
                <div class="value">${smsConsent ? '✅ Yes' : '❌ No'}</div>
              </div>
              <div class="field">
                <div class="label">Lead Source:</div>
                <div class="value">${websiteSource}</div>
              </div>
              <div class="field">
                <div class="label">Source URL:</div>
                <div class="value">${referer}</div>
              </div>
              <div class="field">
                <div class="label">Origin:</div>
                <div class="value">${origin}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from your website contact form.</p>
              <p>Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Mailjet API
    const mailjetResponse = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${apiKey}:${secretKey}`).toString('base64')
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: notificationEmail2,
              Name: "Premier Bathroom Website"
            },
            To: [
              {
                Email: notificationEmail1,
                Name: "Premier Remodeling Team"
              },
              {
                Email: notificationEmail2,
                Name: "Marketing Team"
              }
            ],
            Subject: `🏠 New Quote Request from ${name}`,
            TextPart: `New quote request from ${name}\n\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceLabel}\n\nMessage: ${message || 'N/A'}\n\nSMS Consent: ${smsConsent ? 'Yes' : 'No'}`,
            HTMLPart: htmlContent
          }
        ]
      })
    })

    const mailjetData = await mailjetResponse.json()

    if (!mailjetResponse.ok) {
      console.error('Mailjet error:', mailjetData)
      throw new Error('Failed to send email via Mailjet')
    }

    console.log('Email sent successfully via Mailjet:', mailjetData)

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully and email sent' 
    }, { status: 200 })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process submission',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
