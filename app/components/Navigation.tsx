'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navigation - Always visible with transparent background */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <Image
                    src="/Premier Bathroom Remodel  (1).png"
                    alt="Premier Bathroom Remodel Austin"
                    width={350}
                    height={84}
                    className="h-16 w-auto"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="flex gap-8 items-center">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="font-medium text-white hover:text-blue-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="font-semibold px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg transition-all"
              >
                Free Quote
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Always visible */}
      <motion.nav
        initial={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <Image
                  src="/pbr logo (1).png"
                  alt="Premier Bathroom Remodel Austin"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="flex flex-col gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-6 h-0.5 bg-blue-600"
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-blue-600"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-blue-600"
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden fixed top-16 left-0 right-0 z-40"
          >
            <div className="py-4 space-y-1 bg-gradient-to-br from-blue-600/95 via-cyan-500/95 to-blue-700/95 backdrop-blur-lg mx-4 rounded-lg shadow-xl border border-blue-400/30">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block px-4 py-3 text-white hover:bg-white/20 transition font-medium rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/contact"
                  className="block w-full bg-white hover:bg-white/90 text-blue-600 text-center font-semibold px-6 py-3 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

