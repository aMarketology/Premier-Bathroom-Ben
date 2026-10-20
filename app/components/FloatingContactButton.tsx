'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSiteConfig } from '@/lib/site-config'

export default function FloatingContactButton() {
  const site = getSiteConfig()
  const { tw } = site
  const pathname = usePathname()
  
  // Don't show on contact page
  if (pathname === '/contact') {
    return null
  }

  return (
    <Link
      href="/contact"
      className={`fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${tw.gradientFrom} ${tw.gradientTo} text-white rounded-full shadow-2xl hover:shadow-black/30 hover:scale-110 transition-all duration-300`}
      aria-label="Contact Us"
    >
      <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </Link>
  )
}

