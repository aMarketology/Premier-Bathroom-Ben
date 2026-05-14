'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { trackPhoneClick, trackCTAClick } from '@/lib/ga4-client'

/**
 * StickyCallBar
 *
 * Visible on ALL screen sizes after the user scrolls 400px.
 * On mobile: full-width bar at the bottom with Call + Quote buttons.
 * On desktop: compact floating pill on the bottom-right.
 *
 * Add <StickyCallBar /> inside AnalyticsProvider or layout to show site-wide,
 * OR drop it directly into individual landing pages.
 */
export default function StickyCallBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Mobile Bottom Bar ── */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="flex items-stretch divide-x divide-gray-200">
              {/* Call button — primary action */}
              <a
                href="tel:512-706-9577"
                onClick={() => trackPhoneClick('512-706-9577', 'Sticky Bottom Bar Mobile')}
                className="flex-1 flex flex-col items-center justify-center py-3 bg-blue-600 active:bg-blue-700 transition-colors text-white"
              >
                <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-xs font-bold tracking-wide">SPEAK TO AN EXPERT</span>
                <span className="text-xs font-medium opacity-90">512-706-9577</span>
              </a>

              {/* Quote button — secondary action */}
              <Link
                href="/contact"
                onClick={() => trackCTAClick('Sticky Bar Quote', 'Sticky Bottom Bar Mobile', '/contact')}
                className="flex-1 flex flex-col items-center justify-center py-3 bg-white active:bg-gray-50 transition-colors text-gray-800"
              >
                <svg className="w-5 h-5 mb-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-bold tracking-wide text-gray-800">FREE QUOTE</span>
                <span className="text-xs text-gray-500">No obligation</span>
              </Link>
            </div>
          </motion.div>

          {/* ── Desktop Floating Pill ── */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden sm:flex fixed bottom-8 right-6 z-50 flex-col gap-2 items-end"
          >
            <button
              onClick={() => setDismissed(true)}
              className="text-xs text-gray-400 hover:text-gray-600 transition self-end pr-1"
              aria-label="Dismiss"
            >
              ✕
            </button>

            <a
              href="tel:512-706-9577"
              onClick={() => trackPhoneClick('512-706-9577', 'Sticky Floating Pill Desktop')}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3.5 rounded-full shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all group"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              <span>Schedule a Call — 512-706-9577</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
