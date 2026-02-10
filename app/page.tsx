'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect, MouseEvent } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { getGA4ClientId, getGA4SessionId } from '@/lib/ga4-client'

// Gallery images with project details
const galleryImages = [
  { src: '/IMG_0387 Ben.jpeg', title: 'Modern Bathroom Remodel', location: 'Austin, TX', type: 'Full Renovation' },
  { src: '/IMG_1412 Ben.jpeg', title: 'Luxury Shower Installation', location: 'Round Rock, TX', type: 'Shower Remodel' },
  { src: '/IMG_1551 Ben.jpeg', title: 'Custom Tile Work', location: 'Cedar Park, TX', type: 'Tile Design' },
  { src: '/IMG_2305 Ben.jpeg', title: 'Contemporary Bathroom', location: 'Pflugerville, TX', type: 'Complete Remodel' },
  { src: '/IMG_2324 Ben.jpeg', title: 'Walk-in Bath Installation', location: 'West Lake Hills, TX', type: 'Accessibility' },
  { src: '/IMG_2329 Ben.jpeg', title: 'Premium Flooring', location: 'Austin, TX', type: 'Flooring Install' },
  { src: '/IMG_2596 Ben.jpeg', title: 'Elegant Master Bath', location: 'Bee Cave, TX', type: 'Master Suite' },
  { src: '/IMG_5970 Ben.jpeg', title: 'Spa-Style Shower', location: 'Lakeway, TX', type: 'Luxury Shower' },
  { src: '/IMG_6283 Ben.jpeg', title: 'Modern Vanity Design', location: 'Georgetown, TX', type: 'Vanity Install' },
  { src: '/IMG_7767 Ben.jpeg', title: 'Hardwood Flooring', location: 'Leander, TX', type: 'Premium Floors' },
  { src: '/IMG_8122 Ben.jpeg', title: 'Bathroom Transformation', location: 'Kyle, TX', type: 'Full Remodel' },
  { src: '/IMG_2849 Ben v.jpeg', title: 'Custom Bathroom', location: 'Dripping Springs, TX', type: 'Custom Design' },
]

// Quick Contact Form Component
function QuickContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    smsConsent: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    const name = target.name

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get GA4 identifiers for enhanced tracking
      const [clientId, sessionId] = await Promise.all([
        getGA4ClientId(),
        getGA4SessionId()
      ])

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
          clientId,
          sessionId
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to thank you page with conversion tracking
      if (typeof window !== 'undefined' && (window as any).gtagSendEvent) {
        (window as any).gtagSendEvent('/thank-you')
      } else {
        window.location.href = '/thank-you'
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-cyan-950">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-8">
          
          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
              <span className="text-sm font-bold uppercase tracking-wider">Get Started Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Transform<br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Your Bathroom?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300">
              Fill out the form and our expert team will contact you within 24 hours with a free, no-obligation quote.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { icon: '✓', text: 'Free In-Home Consultation' },
                { icon: '✓', text: 'Transparent Pricing' },
                { icon: '✓', text: 'Licensed & Insured' },
                { icon: '✓', text: 'Quality Guaranteed' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold text-lg">
                    {item.icon}
                  </div>
                  <span className="text-sm text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-8"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-white placeholder-white/60 disabled:opacity-50"
                  placeholder="Your Name *"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-white placeholder-white/60 disabled:opacity-50"
                  placeholder="Phone Number *"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-white placeholder-white/60 disabled:opacity-50"
                  placeholder="Email Address *"
                />
              </div>

              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-white disabled:opacity-50"
                >
                  <option value="" className="text-gray-900">Select a service...</option>
                  <option value="bathroom-remodel" className="text-gray-900">Bathroom Remodeling</option>
                  <option value="shower-remodel" className="text-gray-900">Shower Remodel</option>
                  <option value="walk-in-bath" className="text-gray-900">Walk-in Bath</option>
                  <option value="tub-conversion" className="text-gray-900">Tub to Shower Conversion</option>
                  <option value="flooring" className="text-gray-900">Premium Flooring</option>
                  <option value="other" className="text-gray-900">Other</option>
                </select>
              </div>

              <div className="flex items-start justify-center">
                <input
                  type="checkbox"
                  id="form-sms-consent"
                  name="smsConsent"
                  checked={formData.smsConsent}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="form-sms-consent" className="ml-2 text-sm text-white/80">
                  I agree to receive SMS messages. Reply STOP to opt-out.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? 'SUBMITTING...' : 'GET FREE QUOTE →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* === ADVANCED INTERACTIVE HERO SECTION === */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white overflow-hidden"
      >
        {/* Flying Images Background - 3 Rows on Desktop, Hidden on Mobile */}
        <div className="hidden md:block absolute inset-0 opacity-40">
          {/* Row 1 - Moving Right */}
          <div className="absolute top-[3%] md:top-[3%] left-0 flex gap-8 animate-slide-right group/row1">
            {[...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
              <div key={`row1-${index}`} className="relative w-80 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 hover:[animation-play-state:paused] group-hover/row1:[animation-play-state:paused]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Moving Left */}
          <div className="absolute top-[36%] md:top-[36%] left-0 flex gap-8 animate-slide-left group/row2">
            {[...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages].slice().reverse().map((image, index) => (
              <div key={`row2-${index}`} className="relative w-80 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 hover:[animation-play-state:paused] group-hover/row2:[animation-play-state:paused]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Moving Right (Desktop Only) */}
          <div className="absolute top-[69%] left-0 flex gap-8 animate-slide-right-slow group/row3">
            {[...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
              <div key={`row3-${index}`} className="relative w-80 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:z-10 hover:[animation-play-state:paused] group-hover/row3:[animation-play-state:paused]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlay - Clear at 75% from left, darker on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/98 via-blue-900/80 via-75% to-transparent" />
        
        {/* Animated gradient orbs - More Blue */}
        <motion.div
          style={{
            x: useTransform(smoothMouseX, [0, 1000], [-50, 50]),
            y: useTransform(smoothMouseY, [0, 1000], [-50, 50]),
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 blur-3xl rounded-full"
        />
        <motion.div
          style={{
            x: useTransform(smoothMouseX, [0, 1000], [50, -50]),
            y: useTransform(smoothMouseY, [0, 1000], [50, -50]),
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/30 blur-3xl rounded-full"
        />
        
        {/* Main Content Container - Centered on Mobile, Left on Desktop */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 md:pt-32 pb-20">
          
          {/* Header Text - Centered on Mobile, Left on Desktop */}
          <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-accent-gold animate-pulse rounded-full" />
                <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">15+ Years Serving Texas</span>
              </div>
              
              {/* Mobile Heading */}
              <h1 className="md:hidden text-5xl sm:text-6xl font-display font-black text-white leading-[0.95] uppercase">
                Award winning<br/>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Bathroom design
                </span>
                <br/>
                <span className="text-white">and</span>
                <br/>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Remodeling
                </span>
              </h1>
              
              {/* Desktop Heading */}
              <h1 className="hidden md:block text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] uppercase">
                Premier Bathroom<br/>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Remodeling
                </span>
                <br/>
                <span className="text-accent-gold">In Texas</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-xl mx-auto md:mx-0 font-light">
                Transform your space with award-winning craftsmanship. Explore our latest projects.
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons - Centered on Mobile, Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center md:justify-start"
          >
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              CALL: (512) 706-9577
            </a>
            
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-blue-600 font-bold text-base sm:text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:-translate-y-1"
            >
              GET FREE ESTIMATE
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

          {/* Featured Images - Mobile Only */}
          {/* Mobile Gallery Carousel - Single Row Auto-Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:hidden mt-12 overflow-hidden -mx-6"
          >
            <motion.div
              animate={{
                x: [0, -2400],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="flex gap-4"
            >
              {/* First set of images */}
              {[
                '/IMG_0387 Ben.jpeg',
                '/IMG_1412 Ben.jpeg',
                '/IMG_1551 Ben.jpeg',
                '/IMG_2305 Ben.jpeg',
                '/IMG_2324 Ben.jpeg',
                '/IMG_2329 Ben.jpeg',
                '/IMG_2596 Ben.jpeg',
                '/IMG_2849 Ben v.jpeg',
                '/IMG_5970 Ben.jpeg',
                '/IMG_6283 Ben.jpeg',
                '/IMG_6673 Ben v.jpeg',
                '/IMG_6844 Ben v.jpeg',
                '/IMG_6956 Ben v.jpeg',
                '/IMG_7767 Ben.jpeg',
                '/IMG_8122 Ben.jpeg',
                '/IMG_2305 Ben v.jpeg',
              ].map((src, index) => (
                <div key={`first-${index}`} className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Bathroom project ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                '/IMG_0387 Ben.jpeg',
                '/IMG_1412 Ben.jpeg',
                '/IMG_1551 Ben.jpeg',
                '/IMG_2305 Ben.jpeg',
                '/IMG_2324 Ben.jpeg',
                '/IMG_2329 Ben.jpeg',
                '/IMG_2596 Ben.jpeg',
                '/IMG_2849 Ben v.jpeg',
                '/IMG_5970 Ben.jpeg',
                '/IMG_6283 Ben.jpeg',
                '/IMG_6673 Ben v.jpeg',
                '/IMG_6844 Ben v.jpeg',
                '/IMG_6956 Ben v.jpeg',
                '/IMG_7767 Ben.jpeg',
                '/IMG_8122 Ben.jpeg',
                '/IMG_2305 Ben v.jpeg',
              ].map((src, index) => (
                <div key={`second-${index}`} className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Bathroom project ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating cursor follower for extra interactivity - Desktop Only */}
        {activeImage !== null && (
          <motion.div
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
            className="hidden md:block absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-32 h-32 rounded-full bg-blue-500/20 backdrop-blur-md border-2 border-blue-400/50 flex items-center justify-center">
              <span className="text-white font-bold text-sm">VIEW</span>
            </div>
          </motion.div>
        )}
      </section>

      {/* === QUICK CONTACT FORM SECTION === */}
      <QuickContactForm />

      {/* === REVIEWS SECTION === */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="elfsight-app-395835fd-a621-4c6a-a692-0e93c62fcec9" data-elfsight-app-lazy></div>
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
