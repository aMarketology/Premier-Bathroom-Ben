import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, smsConsent } = body

    // Mailjet API credentials from environment variables
    const apiKey = process.env.MAILJET_API_KEY
    const secretKey = process.env.MAILJET_SECRET_KEY
    const notificationEmail1 = process.env.NOTIFICATION_EMAIL_1
    const notificationEmail2 = process.env.NOTIFICATION_EMAIL_2

    if (!apiKey || !secretKey) {
      throw new Error('Mailjet API credentials not configured')
    }

    // Get website/branch information from request headers
    const referer = request.headers.get('referer') || 'Direct submission'
    const origin = request.headers.get('origin') || 'Unknown origin'
    const websiteSource = 'Champs Tile Branch'
    
    // Prepare email content
    const serviceLabel = service ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Not specified'
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D97706 0%, #B45309 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .value { color: #4b5563; padding: 10px; background: white; border-radius: 5px; }
            .source { background: #fef3c7; border-left: 4px solid #D97706; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🏠 New Quote Request</h1>
              <p style="margin: 10px 0 0 0;">Champs Tile Austin</p>
            </div>
            <div class="content">
              <div class="source">
                <div class="label">🎯 Lead Source:</div>
                <div class="value" style="background: #fef3c7;"><strong>${websiteSource}</strong></div>
                <div class="label" style="margin-top: 10px;">🌐 Source URL:</div>
                <div class="value" style="background: #fef3c7; font-size: 12px;">${referer}</div>
                <div class="label" style="margin-top: 10px;">📍 Origin:</div>
                <div class="value" style="background: #fef3c7; font-size: 12px;">${origin}</div>
              </div>
              
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
              Email: "info@amarketology.com",
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
            Subject: `🔔 New Lead from ${websiteSource} - ${name}`,
            TextPart: `New contact form submission from ${name} (${email}, ${phone})${service ? ` - Service: ${serviceLabel}` : ''}${message ? ` - Message: ${message}` : ''}`,
            HTMLPart: htmlContent
          }
        ]
      })
    })

    const mailjetData = await mailjetResponse.json()

    if (!mailjetResponse.ok) {
      console.error('Mailjet API Error:', mailjetData)
      throw new Error(`Mailjet API error: ${mailjetData.ErrorMessage || 'Unknown error'}`)
    }

    console.log('Email sent successfully via Mailjet:', mailjetData)

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      mailjetResponse: mailjetData
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      },
      { status: 500 }
    )
  }
}
