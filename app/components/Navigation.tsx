'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackPhoneClick } from '@/lib/ga4-client'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [barVisible, setBarVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      // Hide the top bar after scrolling 200px so it doesn't crowd the page
      setBarVisible(window.scrollY < 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Top Announcement Bar ── */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-blue-600 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
              <div className="hidden sm:flex items-center gap-2 text-blue-100 text-sm">
                <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Licensed &amp; Insured · Serving Austin &amp; Surrounding Areas · Free In-Home Estimates</span>
              </div>
              <a
                href="tel:512-706-9577"
                onClick={() => trackPhoneClick('512-706-9577', 'Top Bar')}
                className="ml-auto flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-4 py-1.5 rounded-full hover:bg-blue-50 transition-all whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Speak to an Expert — 512-706-9577
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{ top: barVisible ? '36px' : '0px' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className={`text-2xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                <span className={scrolled ? 'text-blue-600' : 'text-blue-400'}>Premier Bathroom</span>
                <span className="hidden sm:inline"> Remodel Austin</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {['Services', 'Gallery', 'About', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={`font-medium transition-colors relative group ${
                    scrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            {/* Phone CTA — desktop */}
            <a
              href="tel:512-706-9577"
              onClick={() => trackPhoneClick('512-706-9577', 'Navigation Desktop')}
              className={`hidden lg:flex items-center gap-2 font-semibold transition-all px-4 py-2 rounded-lg border-2 ${
                scrolled
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  : 'border-white/60 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              512-706-9577
            </a>

            <Link
              href="/contact"
              className="font-semibold px-5 py-2 rounded-lg transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/40"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile — phone icon + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:512-706-9577"
              onClick={() => trackPhoneClick('512-706-9577', 'Navigation Mobile')}
              className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full transition-all ${
                scrolled
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>

            <motion.button
              className="flex flex-col gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-6 h-0.5 transition-all ${
                  scrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.div
                className={`w-6 h-0.5 transition-all ${
                  scrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className={`w-6 h-0.5 transition-all ${
                  scrolled ? 'bg-gray-900' : 'bg-white'
                }`}
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 bg-white/95 backdrop-blur-lg rounded-lg mt-4 shadow-xl">
                {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-4 pt-2 space-y-2">
                  <a
                    href="tel:512-706-9577"
                    onClick={() => trackPhoneClick('512-706-9577', 'Navigation Mobile Menu')}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-6 py-3 rounded-lg transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Schedule a Call — 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-medium px-6 py-3 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
    </>
  )
}
