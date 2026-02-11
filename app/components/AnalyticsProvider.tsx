'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setupScrollTracking, trackTimeOnPage } from '@/lib/ga4-client'

/**
 * Global Analytics Provider
 * Handles scroll tracking and time on page for all pages
 */
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Setup scroll tracking
    const cleanupScroll = setupScrollTracking()

    // Track time on page
    const pageName = pathname === '/' ? 'Home' : pathname.replace(/\//g, ' ').trim()
    const cleanupTime = trackTimeOnPage(pageName)

    // Cleanup on unmount
    return () => {
      if (cleanupScroll) cleanupScroll()
      if (cleanupTime) cleanupTime()
    }
  }, [pathname])

  return <>{children}</>
}

