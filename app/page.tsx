'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    smsConsent: false
  })
  const [heroLoading, setHeroLoading] = useState(false)
  const [heroSubmitted, setHeroSubmitted] = useState(false)
  const [heroError, setHeroError] = useState('')

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    const name = target.name

    setHeroFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHeroLoading(true)
    setHeroError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroFormData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setHeroSubmitted(true)
      setHeroFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        smsConsent: false
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setHeroSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setHeroError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setHeroLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 text-white overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-gold/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="w-2 h-2 bg-accent-gold animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">15+ YEARS SERVING AUSTIN</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] uppercase tracking-tight">
                  TRUSTED BATHROOM REMODELING
                  <span className="block text-accent-gold mt-2">COMPANY IN AUSTIN</span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-xl md:text-2xl text-white/90 font-light leading-relaxed"
              >
                Austin's premier experts in bathroom remodeling and luxury flooring. Transform your space with quality craftsmanship and unmatched service.
              </motion.p>

              {/* CTA Buttons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-gold text-gray-900 font-bold text-lg hover:bg-accent-gold/90 transition-all duration-300 shadow-2xl hover:shadow-accent-gold/50 hover:-translate-y-1"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  CALL: (512) 706-9577
                </a>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300"
                >
                  FREE ESTIMATE
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-8 bg-white shadow-2xl border-t-4 border-accent-gold"
              >
                <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-2 uppercase">REQUEST FREE QUOTE</h3>
                <p className="text-sm text-gray-600 mb-6 font-semibold">Get started on your dream bathroom today!</p>
                
                {heroSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Thank you for your request! We will contact you soon.
                  </div>
                )}

                {heroError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {heroError}
                  </div>
                )}
                
                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={heroFormData.name}
                      onChange={handleHeroChange}
                      required
                      disabled={heroLoading}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition disabled:bg-gray-100"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={heroFormData.phone}
                      onChange={handleHeroChange}
                      required
                      disabled={heroLoading}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition disabled:bg-gray-100"
                      placeholder="(512) 555-1234"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={heroFormData.email}
                      onChange={handleHeroChange}
                      required
                      disabled={heroLoading}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition disabled:bg-gray-100"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={heroFormData.service}
                      onChange={handleHeroChange}
                      required
                      disabled={heroLoading}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition bg-white disabled:bg-gray-100"
                    >
                      <option value="">Select a service...</option>
                      <option value="bathroom-remodel">Bathroom Remodeling</option>
                      <option value="shower-remodel">Shower Remodel</option>
                      <option value="walk-in-bath">Walk-in Bath</option>
                      <option value="tub-conversion">Tub to Shower Conversion</option>
                      <option value="tub-shower-combo">Tub & Shower Combo</option>
                      <option value="flooring">Premium Flooring</option>
                      <option value="accessibility">Safety & Accessibility</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="sms-consent"
                      name="smsConsent"
                      checked={heroFormData.smsConsent}
                      onChange={handleHeroChange}
                      disabled={heroLoading}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                    />
                    <label htmlFor="sms-consent" className="ml-2 text-xs text-gray-600">
                      By checking this box, you agree to receive SMS messages about your appointment/job from Premier Bathroom Remodel. 
                      You may reply STOP to opt-out at any time. Message frequency may vary.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={heroLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold uppercase tracking-wider hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {heroLoading ? 'SUBMITTING...' : 'GET FREE QUOTE →'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === SCROLLING BANNER === */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-6 overflow-hidden border-y-4 border-accent-gold">
        <div className="whitespace-nowrap animate-scroll">
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ SERVING AUSTIN FOR 15+ YEARS ★</span>
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ LICENSED & INSURED ★</span>
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ 100% SATISFACTION GUARANTEED ★</span>
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ SERVING AUSTIN FOR 15+ YEARS ★</span>
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ LICENSED & INSURED ★</span>
          <span className="inline-block px-8 text-lg font-bold uppercase tracking-widest">★ 100% SATISFACTION GUARANTEED ★</span>
        </div>
      </section>

      {/* === WHY CHOOSE US SECTION === */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border-2 border-purple-900 mb-6"
            >
              <span className="text-xs font-bold text-purple-900 uppercase tracking-[0.2em]">Why Choose Us</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-display font-extrabold text-gray-900 mb-6 uppercase leading-tight">
              AUSTIN'S PREMIER<br/>
              <span className="text-purple-800">REMODELING EXPERTS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Need a trusted bathroom remodeling company for renovations, walk-in baths, or premium flooring? Our experienced team delivers quality, integrity, and reliable results.
            </p>
          </div>

          {/* Features with Images Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            {/* Left: Feature Cards */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-white p-8 border-l-4 border-purple-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-purple-800 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-3 uppercase">LICENSED & INSURED</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      Fully certified contractors with comprehensive insurance coverage and professional certifications. Your project is protected every step of the way.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-accent-gold/10 to-white p-8 border-l-4 border-accent-gold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent-gold flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-3 uppercase">15+ YEARS EXPERIENCE</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      For over 15 years, we've provided exceptional bathroom remodeling and flooring services, earning hundreds of five-star reviews from Austin homeowners.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-white p-8 border-l-4 border-purple-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-purple-800 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-3 uppercase">PREMIUM QUALITY</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      Unlike other remodeling companies, we never reuse materials or cut corners. Each project features premium materials, meticulous craftsmanship, and lasting durability.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/IMG_1412 Ben.jpeg"
                  alt="Luxury Bathroom Remodel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-8"
              >
                <Image
                  src="/IMG_2305 Ben.jpeg"
                  alt="Custom Tile Installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg -mt-8"
              >
                <Image
                  src="/IMG_5970 Ben.jpeg"
                  alt="Modern Shower Design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/IMG_6283 Ben.jpeg"
                  alt="Bathroom Renovation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Today: (512) 706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all"
              >
                Free Instant Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === 3-STEP PROCESS SECTION === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              OUR 3-STEP REMODELING PROCESS:<br/>
              FAST, TRANSPARENT, AND BUILT TO LAST
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Remodeling your bathroom shouldn't be complicated. At Premier Bathroom Remodel Austin, our process is straightforward, from your first call through final inspection. Quick turnaround, complete transparency, and no shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                01
              </div>
              <div className="bg-gray-50 p-8 pt-12 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 1: GET IN TOUCH</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dealing with outdated bathrooms, water damage, or accessibility concerns? Contact us by phone, email, or online. We're available for consultations and urgent issues.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                02
              </div>
              <div className="bg-gray-50 p-8 pt-12 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 2: GET A FAST, CUSTOMIZED QUOTE</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our certified specialists inspect your space, discuss your vision, and provide clear options. You'll get a detailed plan, including materials, timelines, and accurate pricing, with no pressure or surprises.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                03
              </div>
              <div className="bg-gray-50 p-8 pt-12 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 3: INSTALL WITH CONFIDENCE</h3>
                <p className="text-gray-600 leading-relaxed">
                  After approval, we begin your bathroom remodel using premium materials and expert craftsmanship. Your new bathroom includes quality warranties, installed by a team dedicated to excellence.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Today: (512) 706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all"
              >
                Request Your Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bathroom & Flooring Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive Remodeling | Custom Design | Quality Installation
            </p>
          </div>

          {/* Services Grid with Photos - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 - Bathroom Remodel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/IMG_0387 Ben.jpeg"
                  alt="Bathroom Remodeling"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-blue-600 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Bathroom Remodeling</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Complete bathroom transformations from design to installation. Custom showers, tubs, vanities, and fixtures.
                </p>

                {/* Feature List */}
                <ul className="space-y-2 mb-6">
                  {['Custom Showers', 'Tub Installation', 'Vanity Design', 'Tile Work'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service Card 2 - Walk-in Baths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/IMG_2324 Ben.jpeg"
                  alt="Walk-in Bath Installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-cyan-600 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Walk-in Baths</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Safe and accessible walk-in bath solutions for enhanced mobility and independence with premium features.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Low Threshold Entry', 'Safety Features', 'Therapeutic Options', 'ADA Compliant'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all">
                  Explore Options
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service Card 3 - Flooring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/IMG_7767 Ben.jpeg"
                  alt="Premium Flooring Installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-blue-500 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Flooring</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  High-quality flooring solutions including tile, hardwood, vinyl, and luxury options for every room.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Tile Installation', 'Hardwood Floors', 'Luxury Vinyl', 'Custom Designs'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all">
                  View Options
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US SECTION === */}
      <section className="relative py-32 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Why Choose Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                Austin's Trusted
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Remodeling Experts</span>
              </h2>

              <p className="text-lg text-slate-400 leading-relaxed">
                At Premier Bathroom Remodel Austin, we combine superior craftsmanship with personalized service to bring your vision to life. Our experienced team is dedicated to quality, attention to detail, and customer satisfaction.
              </p>

              {/* Feature List with Icons */}
              <div className="space-y-4">
                {[
                  { title: 'Expert Craftsmanship', desc: '15+ years of remodeling experience' },
                  { title: 'Custom Designs', desc: 'Tailored solutions for your unique needs' },
                  { title: 'Quality Materials', desc: 'Premium products built to last' },
                  { title: 'Licensed & Insured', desc: 'Fully certified and bonded contractors' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-100 font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image Placeholder / Stats */}
            <div className="space-y-6">
              {/* Large Feature Card */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-6xl font-bold text-blue-500">4.6</div>
                    <div className="text-left">
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-yellow-400/50'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">19 Google reviews</p>
                    </div>
                  </div>
                  <p className="text-slate-400 mt-4">Trusted by Austin homeowners for quality bathroom remodeling</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="text-3xl font-bold text-blue-500 mb-1">Free</div>
                  <div className="text-sm text-slate-400">Consultations</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="text-3xl font-bold text-cyan-500 mb-1">Licensed</div>
                  <div className="text-sm text-slate-400">& Insured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICE AREAS SECTION === */}
      <section className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Service Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-100 mb-4">
              Serving Greater Austin
            </h2>
            <p className="text-xl text-slate-400">
              Austin • Round Rock • Cedar Park • Pflugerville • West Lake Hills • Bee Cave & More
            </p>
          </div>

          {/* Cities Grid - 5 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Austin', 'Round Rock', 'Cedar Park', 'Pflugerville', 'West Lake Hills', 'Bee Cave', 'Rollingwood', 'Manchaca', 'Georgetown', 'Lakeway', 'Dripping Springs', 'Leander', 'Kyle'].map((city, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-slate-300">{city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === GALLERY SECTION === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2 block">Our Work</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              RECENT BATHROOM REMODELING PROJECTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our stunning bathroom transformations. From modern renovations to luxury upgrades, see the quality craftsmanship that sets us apart.
            </p>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/IMG_0387 Ben.jpeg', span: 'lg:row-span-2' },
              { src: '/IMG_1412 Ben.jpeg', span: '' },
              { src: '/IMG_1551 Ben.jpeg', span: '' },
              { src: '/IMG_2305 Ben.jpeg', span: '' },
              { src: '/IMG_2324 Ben.jpeg', span: 'lg:row-span-2' },
              { src: '/IMG_2329 Ben.jpeg', span: '' },
              { src: '/IMG_2596 Ben.jpeg', span: '' },
              { src: '/IMG_5970 Ben.jpeg', span: '' },
              { src: '/IMG_6283 Ben.jpeg', span: 'lg:row-span-2' },
              { src: '/IMG_7767 Ben.jpeg', span: '' },
              { src: '/IMG_8122 Ben.jpeg', span: '' },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${image.span}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={`Bathroom Remodeling Project ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="font-semibold text-lg mb-1">Bathroom Remodeling</p>
                      <p className="text-sm text-blue-200">Austin, TX</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
            >
              View Full Gallery
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS SECTION === */}
      <section className="relative py-32 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-100 mb-4">
              What Our <span className="text-blue-500">Clients Say</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < 4 ? 'text-yellow-400' : 'text-yellow-400/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl text-slate-400">4.6 out of 5 stars from 19 Google reviews</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                "Communication was seamless and work quality exceptional."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">IR</span>
                </div>
                <div>
                  <div className="text-slate-200 font-semibold">Itai Roded</div>
                  <div className="text-sm text-slate-500">Google Review</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                "This company transformed our cramped bathroom into a stunning, modern space."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">JR</span>
                </div>
                <div>
                  <div className="text-slate-200 font-semibold">Joaquin Ramirez</div>
                  <div className="text-sm text-slate-500">Google Review</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                "They did an amazing job and I can't wait to use my new shower!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold text-lg">DM</span>
                </div>
                <div>
                  <div className="text-slate-200 font-semibold">Dan McCree</div>
                  <div className="text-sm text-slate-500">Google Review</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Link */}
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Read more reviews on Google</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              View All Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* === FINAL CTA SECTION === */}
      <section className="relative py-32 bg-gradient-to-b from-black to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-slate-100 mb-6">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Your Bathroom?</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Take the first step in transforming your space. Contact Premier Bathroom Remodel Austin today for a free consultation and quote.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 512-706-9577
            </a>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900/50 border-2 border-slate-800 rounded-lg font-semibold text-lg text-slate-300 hover:bg-slate-800/50 hover:border-slate-700 backdrop-blur-sm transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <p className="text-slate-500 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Serving Austin, TX & Surrounding Areas
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
