'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-2xl">
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your request has been successfully submitted.
          </p>
          <p className="text-lg text-gray-500">
            We'll be in touch shortly to discuss your project!
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Happens Next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  We'll Review Your Request
                </h3>
                <p className="text-gray-600">
                  Our team will carefully review your project details and requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  We'll Contact You
                </h3>
                <p className="text-gray-600">
                  Expect a call or email within 24 hours to discuss your project and schedule a consultation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Get Your Free Quote
                </h3>
                <p className="text-gray-600">
                  We'll provide you with a detailed, no-obligation quote for your tile project.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="tel:512-706-9577"
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg text-center"
          >
            📞 Call Us Now: 512-706-9577
          </a>
          
          <Link
            href="/"
            className="px-8 py-4 bg-white text-amber-700 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border-2 border-amber-600 text-center"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12 text-gray-500"
        >
          <p className="text-sm">
            Questions? Call us anytime at <a href="tel:512-706-9577" className="text-amber-600 hover:text-amber-700 font-semibold">512-706-9577</a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
