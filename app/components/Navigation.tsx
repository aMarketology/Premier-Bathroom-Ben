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
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="text-lg font-bold">
                  <span className="text-blue-400">Premier Bathroom</span>
                  <span className="text-white"> Remodel Austin</span>
                </div>
              </motion.div>
            </Link>

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
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="text-lg font-bold text-slate-900">
                  <span className="text-blue-600">Premier Bathroom</span>
                  <span className="text-black"> Remodel Austin</span>
                </div>
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="flex flex-col gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-6 h-0.5 bg-gray-900"
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-900"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-900"
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
            <div className="py-4 space-y-1 bg-white/95 backdrop-blur-lg mx-4 rounded-lg shadow-xl">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition font-medium rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/contact"
                  className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 text-center font-semibold px-6 py-3 rounded-lg transition"
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
