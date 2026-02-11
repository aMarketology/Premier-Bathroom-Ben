'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Success Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-8 text-center border-b border-cyan-500/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Thank You!</h1>
              <p className="text-xl text-cyan-300">Your request has been received</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <p className="text-lg text-gray-200 mb-4">
                  We've received your information and we're excited to help transform your bathroom!
                </p>
                <p className="text-gray-300">
                  A member of our team will contact you shortly to discuss your project and schedule a free consultation.
                </p>
              </motion.div>

              {/* What Happens Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 rounded-xl p-6 mb-8 border border-cyan-500/30 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">What Happens Next?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">We Review Your Request</h3>
                      <p className="text-gray-300 text-sm">Our team will review your project details and requirements within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Personal Consultation</h3>
                      <p className="text-gray-300 text-sm">We'll contact you to schedule a free in-home consultation at your convenience.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Custom Quote</h3>
                      <p className="text-gray-300 text-sm">Receive a detailed, no-obligation quote tailored to your specific project.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-200 font-semibold mb-2">Need immediate assistance?</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:512-492-2321"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call (512) 492-2321
                  </a>
                  
                  <Link
                    href="/"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-cyan-400 text-white font-bold text-lg rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                </div>

                <div className="text-center pt-6">
                  <Link 
                    href="/gallery" 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-2"
                  >
                    View Our Portfolio
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 text-gray-300"
          >
            <p className="text-sm">
              <strong>Response Time:</strong> We typically respond within 1-2 business hours
            </p>
            <p className="text-sm mt-2">
              <strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM CST
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

