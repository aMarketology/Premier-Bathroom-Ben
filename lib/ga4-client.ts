/**
 * Client-side GA4 utilities
 * These functions help track events and extract GA4 client information
 */

/**
 * Get the GA4 client ID from gtag
 */
export function getGA4ClientId(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.gtag) {
      resolve(`client_${Date.now()}.${Math.random()}`)
      return
    }

    try {
      window.gtag('get', 'G-45B5X6PQ1F', 'client_id', (clientId: string) => {
        resolve(clientId || `client_${Date.now()}.${Math.random()}`)
      })
    } catch (error) {
      console.error('Error getting GA4 client ID:', error)
      resolve(`client_${Date.now()}.${Math.random()}`)
    }
  })
}

/**
 * Get the GA4 session ID from gtag
 */
export function getGA4SessionId(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.gtag) {
      resolve(`session_${Date.now()}`)
      return
    }

    try {
      window.gtag('get', 'G-45B5X6PQ1F', 'session_id', (sessionId: string) => {
        resolve(sessionId || `session_${Date.now()}`)
      })
    } catch (error) {
      console.error('Error getting GA4 session ID:', error)
      resolve(`session_${Date.now()}`)
    }
  })
}

/**
 * Track enhanced form interaction
 */
export function trackFormInteraction(formName: string, fieldName: string, action: 'focus' | 'blur' | 'change') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_interaction', {
      form_name: formName,
      field_name: fieldName,
      action: action,
    })
  }
}

/**
 * Track form validation error
 */
export function trackFormError(formName: string, fieldName: string, errorType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_error', {
      form_name: formName,
      field_name: fieldName,
      error_type: errorType,
    })
  }
}

/**
 * Track scroll depth milestones
 */
export function setupScrollTracking() {
  if (typeof window === 'undefined') return

  const scrollMilestones = [25, 50, 75, 90, 100]
  const triggered = new Set<number>()

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

    scrollMilestones.forEach(milestone => {
      if (scrollPercent >= milestone && !triggered.has(milestone)) {
        triggered.add(milestone)
        if (window.gtag) {
          window.gtag('event', 'scroll', {
            percent_scrolled: milestone,
            page_path: window.location.pathname,
          })
        }
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Track time on page
 */
export function trackTimeOnPage(pageName: string) {
  if (typeof window === 'undefined') return

  const startTime = Date.now()

  const sendTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    if (window.gtag && timeSpent > 5) { // Only track if more than 5 seconds
      window.gtag('event', 'time_on_page', {
        page_name: pageName,
        time_seconds: timeSpent,
      })
    }
  }

  // Track on page unload
  window.addEventListener('beforeunload', sendTimeOnPage)
  
  return () => window.removeEventListener('beforeunload', sendTimeOnPage)
}

/**
 * Track CTA button clicks with detailed info
 */
export function trackCTAClick(ctaName: string, ctaLocation: string, ctaDestination?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_location: ctaLocation,
      cta_destination: ctaDestination || window.location.pathname,
    })
  }
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(phoneNumber: string, clickLocation: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_click', {
      phone_number: phoneNumber,
      click_location: clickLocation,
      method: 'tel_link',
    })
    
    // Also track as a lead generation event
    window.gtag('event', 'generate_lead', {
      method: 'phone_click',
      click_location: clickLocation,
      currency: 'USD',
      value: 75,
    })
  }
}

/**
 * Track email clicks
 */
export function trackEmailClick(clickLocation: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_click', {
      click_location: clickLocation,
      method: 'mailto_link',
    })
    
    // Also track as a lead generation event
    window.gtag('event', 'generate_lead', {
      method: 'email_click',
      click_location: clickLocation,
      currency: 'USD',
      value: 50,
    })
  }
}

/**
 * Track gallery image interactions
 */
export function trackGalleryImage(imageName: string, action: 'click' | 'view' | 'zoom', imageIndex?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'gallery_interaction', {
      image_name: imageName,
      action: action,
      image_index: imageIndex,
    })
  }
}

/**
 * Track service page views with specific details
 */
export function trackServiceView(serviceName: string, servicePage: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      item_id: servicePage,
      item_name: serviceName,
      item_category: 'Bathroom Remodeling Service',
    })
  }
}

// Extend window type for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'get',
      targetId: string,
      config?: any,
      callback?: (value: any) => void
    ) => void
  }
}
