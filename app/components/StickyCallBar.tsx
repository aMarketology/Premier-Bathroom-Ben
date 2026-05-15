'use client'

import { useState, useEffect } from 'react'

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed || !visible) return null

  const trackCall = () => {
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'phone_click', { location: 'StickyCallBar', phone: '512-706-9577' })
    }
  }

  return (
    <>
      {/* Mobile — fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden shadow-2xl">
        <a
          href="tel:512-706-9577"
          onClick={trackCall}
          className="flex-1 flex flex-col items-center justify-center py-3 bg-blue-600 text-white"
        >
          <span className="text-xs font-bold uppercase tracking-wider">Speak to an Expert</span>
          <span className="text-base font-bold">512-706-9577</span>
        </a>
        <a
          href="/get-started"
          className="flex-1 flex flex-col items-center justify-center py-3 bg-white text-blue-600 border-l border-blue-200"
        >
          <span className="text-xs font-bold uppercase tracking-wider">Free Quote</span>
          <span className="text-sm font-semibold">No obligation</span>
        </a>
      </div>

      {/* Desktop — floating pill bottom-right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-gray-900 text-white pl-5 pr-4 py-3 rounded-full shadow-2xl border border-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <a href="tel:512-706-9577" onClick={trackCall} className="font-semibold hover:text-blue-400 transition-colors">
            Schedule a Call — 512-706-9577
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 text-gray-500 hover:text-white transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </>
  )
}
