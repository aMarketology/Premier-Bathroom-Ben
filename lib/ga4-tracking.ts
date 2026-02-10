/**
 * GA4 Server-Side Tracking using Measurement Protocol
 * 
 * This module provides functions to send events directly to Google Analytics 4
 * from the server-side, ensuring reliable tracking even if client-side tracking is blocked.
 */

interface GA4Event {
  name: string
  params?: Record<string, any>
}

interface GA4Client {
  client_id?: string
  user_id?: string
}

/**
 * Send an event to GA4 using Measurement Protocol
 * @param events - Array of events to send
 * @param clientInfo - Client identification data
 * @param userProperties - User properties to attach (optional)
 */
export async function sendGA4Event(
  events: GA4Event[],
  clientInfo: GA4Client,
  userProperties?: Record<string, any>
) {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET

  if (!measurementId || !apiSecret) {
    console.warn('GA4 credentials not configured. Skipping analytics.')
    return { success: false, error: 'Missing credentials' }
  }

  // Generate a client_id if not provided (fallback)
  const clientId = clientInfo.client_id || `${Date.now()}.${Math.random()}`

  const payload: any = {
    client_id: clientId,
    events: events.map(event => ({
      name: event.name,
      params: {
        ...event.params,
        engagement_time_msec: '100', // Minimum engagement
      }
    }))
  }

  // Add user_id if provided
  if (clientInfo.user_id) {
    payload.user_id = clientInfo.user_id
  }

  // Add user properties if provided
  if (userProperties) {
    payload.user_properties = userProperties
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GA4 API Error:', response.status, errorText)
      return { success: false, error: `HTTP ${response.status}` }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending GA4 event:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Track a form submission event
 */
export async function trackFormSubmission(data: {
  formName: string
  formLocation: string
  service?: string
  name?: string
  email?: string
  phone?: string
  smsConsent?: boolean
  clientId?: string
  sessionId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'generate_lead',
      params: {
        form_name: data.formName,
        form_location: data.formLocation,
        service_type: data.service || 'Not specified',
        sms_consent: data.smsConsent ? 'yes' : 'no',
        currency: 'USD',
        value: 100, // Estimated lead value
      }
    },
    {
      name: 'form_submit',
      params: {
        form_name: data.formName,
        form_location: data.formLocation,
        service_type: data.service || 'Not specified',
      }
    }
  ]

  const userProperties: Record<string, any> = {}
  
  if (data.service) {
    userProperties.interested_service = {
      value: data.service
    }
  }

  if (data.smsConsent) {
    userProperties.sms_opt_in = {
      value: 'true'
    }
  }

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
      user_id: data.email ? `email_${Buffer.from(data.email).toString('base64').substring(0, 20)}` : undefined
    },
    userProperties
  )
}

/**
 * Track page view
 */
export async function trackPageView(data: {
  pageTitle: string
  pageLocation: string
  pagePath: string
  clientId?: string
  sessionId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'page_view',
      params: {
        page_title: data.pageTitle,
        page_location: data.pageLocation,
        page_path: data.pagePath,
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}

/**
 * Track button/CTA click
 */
export async function trackCTAClick(data: {
  ctaName: string
  ctaLocation: string
  ctaDestination?: string
  clientId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'cta_click',
      params: {
        cta_name: data.ctaName,
        cta_location: data.ctaLocation,
        cta_destination: data.ctaDestination || 'unknown',
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}

/**
 * Track phone number click
 */
export async function trackPhoneClick(data: {
  phoneNumber: string
  clickLocation: string
  clientId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'phone_click',
      params: {
        phone_number: data.phoneNumber,
        click_location: data.clickLocation,
        method: 'tel_link',
      }
    },
    {
      name: 'generate_lead',
      params: {
        method: 'phone_click',
        click_location: data.clickLocation,
        currency: 'USD',
        value: 75, // Estimated value for phone click
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}

/**
 * Track service page view
 */
export async function trackServiceView(data: {
  serviceName: string
  servicePage: string
  clientId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'view_item',
      params: {
        item_id: data.servicePage,
        item_name: data.serviceName,
        item_category: 'Bathroom Remodeling Service',
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}

/**
 * Track gallery image interactions
 */
export async function trackGalleryInteraction(data: {
  imageName: string
  action: 'view' | 'click' | 'zoom'
  imageIndex?: number
  clientId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'gallery_interaction',
      params: {
        image_name: data.imageName,
        action: data.action,
        image_index: data.imageIndex,
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}

/**
 * Track scroll depth
 */
export async function trackScrollDepth(data: {
  scrollDepth: number
  pagePath: string
  clientId?: string
}) {
  const events: GA4Event[] = [
    {
      name: 'scroll',
      params: {
        percent_scrolled: data.scrollDepth,
        page_path: data.pagePath,
      }
    }
  ]

  return sendGA4Event(
    events,
    {
      client_id: data.clientId,
    }
  )
}
