'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const serviceLinks = [
    { name: 'All Services', href: '/services' },
    { name: 'Bathroom Remodeling', href: '/services/bathroom-remodeling-austin' },
    { name: 'Walk-in Bath', href: '/services/walk-in-bath-austin' },
    { name: 'Shower Remodel', href: '/services/shower-remodel-austin' },
    { name: 'Tub to Shower Conversion', href: '/services/tub-to-shower-conversion-austin' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className="text-2xl font-bold text-slate-900">
                <span className="text-blue-600">Premier Bathroom</span> Remodel Austin
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 * 0.1 }}
            >
              <Link
                href="/"
                className="font-medium transition-colors relative group text-gray-700 hover:text-blue-600"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            </motion.div>

            {/* Services Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 * 0.1 }}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="font-medium transition-colors relative group flex items-center gap-1 text-gray-700 hover:text-blue-600"
              >
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {['Gallery', 'About', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="font-medium transition-colors relative group text-gray-700 hover:text-blue-600"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            <Link
              href="/contact"
              className="font-semibold px-6 py-2 rounded-lg transition-all bg-blue-600 text-white hover:bg-blue-700"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-6 h-0.5 transition-all bg-gray-900"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 8 : 0,
              }}
            />
            <motion.div
              className="w-6 h-0.5 transition-all bg-gray-900"
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.div
              className="w-6 h-0.5 transition-all bg-gray-900"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -8 : 0,
              }}
            />
          </motion.button>
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
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                >
                  <Link
                    href="/"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>

                {/* Services with Submenu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 * 0.1 }}
                >
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                  >
                    Services
                    <svg 
                      className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-blue-50/50 ml-4 rounded overflow-hidden"
                      >
                        {serviceLinks.map((service, index) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setServicesOpen(false)
                            }}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {['Gallery', 'About', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 2) * 0.1 }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-4 pt-2">
                  <Link
                    href="/contact"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Join Marketplace
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
