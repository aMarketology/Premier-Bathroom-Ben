'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    smsConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thank-you')
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please call us at 512-706-9577.')
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-white overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/0202 (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-amber-900/80" />
        </div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  AUSTIN'S PREMIER TILE INSTALLATION & FLOORING EXPERTS
                </h1>
                <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-amber-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  CHAMPS TILE
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-xl md:text-2xl text-white/90 font-normal leading-relaxed"
              >
                Austin's trusted experts in custom tile installation, kitchen backsplashes, bathroom tile, and premium flooring. Serving Austin, Round Rock, Cedar Park, Pflugerville, West Lake Hills, Bee Cave, and surrounding areas for over 15 years.
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
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-amber-900 rounded-lg font-bold text-lg hover:bg-amber-50 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Us Today: (512) 706-9577
                </a>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-amber-900 transition-all duration-300"
                >
                  Free Instant Estimate
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
                className="p-8 rounded-xl bg-white/95 backdrop-blur-sm shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">REQUEST AN APPOINTMENT ONLINE</h3>
                <p className="text-sm text-gray-600 mb-6">Get your free quote today!</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-gray-900"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-gray-900"
                      placeholder="(512) 555-1234"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      What type of service do you need? *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      style={{ color: formData.service ? '#111827' : '#9CA3AF' }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900"
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="tile-installation">Custom Tile Installation</option>
                      <option value="kitchen-backsplash">Kitchen Backsplash</option>
                      <option value="bathroom-tile">Bathroom Tile</option>
                      <option value="shower-tile">Shower Tile Installation</option>
                      <option value="floor-tile">Floor Tile</option>
                      <option value="flooring">Premium Flooring</option>
                      <option value="backsplash">Decorative Backsplash</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="sms-consent"
                      name="smsConsent"
                      checked={formData.smsConsent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms-consent" className="ml-2 text-xs text-gray-600">
                      By checking this box, you agree to receive SMS messages about your appointment/job from Champs Tile. 
                      You may reply STOP to opt-out at any time. Message frequency may vary.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === SCROLLING BANNER === */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          <span className="inline-block px-8 text-lg font-semibold">★ CHAMPS TILE - SERVING AUSTIN FOR 15 YEARS ★</span>
          <span className="inline-block px-8 text-lg font-semibold">★ EXPERT TILE INSTALLATION ★</span>
          <span className="inline-block px-8 text-lg font-semibold">★ LICENSED & INSURED ★</span>
          <span className="inline-block px-8 text-lg font-semibold">★ CHAMPS TILE - SERVING AUSTIN FOR 15 YEARS ★</span>
          <span className="inline-block px-8 text-lg font-semibold">★ EXPERT TILE INSTALLATION ★</span>
          <span className="inline-block px-8 text-lg font-semibold">★ LICENSED & INSURED ★</span>
        </div>
      </section>

      {/* === WHY CHOOSE US SECTION === */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              WHY CHOOSE CHAMPS TILE AUSTIN?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Need a trusted tile installation company for custom tile work, kitchen backsplashes, bathroom tiles, or premium flooring? Our experienced team delivers quality, integrity, and reliable results.
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">LICENSED & INSURED PROFESSIONALS</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Fully certified tile installation contractors with comprehensive insurance coverage and professional certifications. Your project is protected every step of the way.
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">15+ YEARS SERVING AUSTIN</h3>
                    <p className="text-gray-600 leading-relaxed">
                      For over 15 years, we've provided exceptional tile installation and flooring services, earning hundreds of five-star reviews from Austin homeowners and businesses.
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PREMIUM MATERIALS & CRAFTSMANSHIP</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We specialize in ceramic, porcelain, natural stone, glass, and mosaic tiles. Each project features premium materials, expert installation, and lasting durability.
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
                  src="/pexels-curtis-adams-1694007-7168080.jpg"
                  alt="Professional Tile Installation"
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
                  src="/pexels-vladimirsrajber-11806476.jpg"
                  alt="Modern Bathroom Design"
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
                  src="/pexels-vladimirsrajber-11806490.jpg"
                  alt="Elegant Bathroom Fixture"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Today: (512) 706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-amber-600 text-amber-900 rounded-lg font-bold text-lg hover:bg-amber-50 transition-all"
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
              OUR 3-STEP TILE INSTALLATION PROCESS:<br/>
              FAST, TRANSPARENT, AND BUILT TO LAST
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your tile project shouldn't be complicated. At Champs Tile, our process is straightforward, from your first call through final inspection. Expert installation, complete transparency, and no shortcuts.
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
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                01
              </div>
              <div className="bg-amber-50 p-8 pt-12 rounded-xl border-2 border-amber-200 hover:border-amber-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 1: GET IN TOUCH</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ready for a tile upgrade? Contact us by phone, email, or online. We're available for consultations about kitchen backsplashes, bathroom tile, flooring projects, and custom tile work.
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
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                02
              </div>
              <div className="bg-amber-50 p-8 pt-12 rounded-xl border-2 border-amber-200 hover:border-amber-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 2: GET A FAST, CUSTOMIZED QUOTE</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our tile experts inspect your space, discuss your design vision, and provide clear options. You'll get a detailed plan, including tile selection, materials, timelines, and accurate pricing.
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
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                03
              </div>
              <div className="bg-amber-50 p-8 pt-12 rounded-xl border-2 border-amber-200 hover:border-amber-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">STEP 3: PROFESSIONAL INSTALLATION</h3>
                <p className="text-gray-600 leading-relaxed">
                  After approval, we begin your tile installation using premium materials and expert craftsmanship. Your beautiful new tiles include quality warranties, installed by certified professionals.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Today: (512) 706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-amber-600 text-amber-900 rounded-lg font-bold text-lg hover:bg-amber-50 transition-all"
              >
                Request Your Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-amber-800 uppercase tracking-widest mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert Tile Installation & Flooring Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Custom Tile Work | Beautiful Designs | Professional Installation
            </p>
          </div>

          {/* Services Grid with Photos - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 - Kitchen Backsplash */}
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
                  src="/pexels-curtis-adams-1694007-7168080.jpg"
                  alt="Kitchen Backsplash Installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-amber-700 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Kitchen Backsplash</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Transform your kitchen with stunning custom backsplash designs. From subway tile to intricate mosaics.
                </p>

                {/* Feature List */}
                <ul className="space-y-2 mb-6">
                  {['Custom Patterns', 'Ceramic & Porcelain', 'Glass Tile', 'Natural Stone'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link href="/services" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service Card 2 - Bathroom Tile */}
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
                  src="/pexels-vladimirsrajber-11806476.jpg"
                  alt="Bathroom Tile Installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-amber-800 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Bathroom Tile</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Beautiful, water-resistant bathroom tile for showers, floors, walls, and tub surrounds.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Shower Walls', 'Floor Tile', 'Tub Surrounds', 'Decorative Accents'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:gap-3 transition-all">
                  Explore Options
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service Card 3 - Premium Flooring */}
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
                  src="/pexels-vladimirsrajber-11806490.jpg"
                  alt="Premium Flooring Installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="w-14 h-14 -mt-20 mb-6 rounded-xl bg-amber-900 flex items-center justify-center shadow-xl relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Flooring</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Durable, beautiful floors for every room. Expert installation of tile, LVP, and natural stone.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Tile Flooring', 'Luxury Vinyl Plank', 'Natural Stone', 'Wood-Look Tile'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-amber-900 font-semibold hover:gap-3 transition-all">
                  View Services
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800 bg-amber-900/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-amber-400 uppercase tracking-widest">Why Choose Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                Austin's Trusted
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Tile Installation Experts</span>
              </h2>

              <p className="text-lg text-slate-400 leading-relaxed">
                At Champs Tile, we combine superior craftsmanship with personalized service to bring your vision to life. Our experienced team specializes in custom tile work, creating stunning spaces that last.
              </p>

              {/* Feature List with Icons */}
              <div className="space-y-4">
                {[
                  { title: 'Expert Craftsmanship', desc: '15+ years of tile installation experience' },
                  { title: 'Custom Designs', desc: 'Tailored tile solutions for your unique style' },
                  { title: 'Quality Materials', desc: 'Premium products built to last' },
                  { title: 'Licensed & Insured', desc: 'Fully certified and bonded contractors' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
                    <div className="w-10 h-10 rounded-lg bg-stone-500/10 border border-stone-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
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
                  <p className="text-slate-400 mt-4">Trusted by Austin homeowners for quality tile installation</p>
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
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2 block">Our Work</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              RECENT TILE INSTALLATION PROJECTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our stunning tile transformations. From kitchen backsplashes to bathroom remodels and floor installations, see the quality craftsmanship that sets us apart.
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.1),transparent_50%)]" />
        
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-slate-100 mb-6">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Your Space with Tile?</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Take the first step in transforming your space. Contact Champs Tile today for a free consultation and quote.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-amber-600/40 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 512-706-9577
            </a>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900/50 border-2 border-amber-800 rounded-lg font-semibold text-lg text-slate-300 hover:bg-slate-800/50 hover:border-amber-700 backdrop-blur-sm transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <p className="text-slate-500 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
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
