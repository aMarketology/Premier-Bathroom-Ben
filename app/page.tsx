'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect, MouseEvent } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Gallery images with project details
const galleryImages = [
  {
    src: '/IMG_0387 Ben.jpeg',
    title: 'Modern Bathroom Remodel',
    category: 'Complete Remodel',
    description: 'Complete bathroom remodeling in Austin featuring contemporary fixtures, custom tile work, and premium finishes for a spa-like experience.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_1412 Ben.jpeg',
    title: 'Luxury Shower Installation',
    category: 'Shower Remodel',
    description: 'Professional shower remodel in Austin with frameless glass enclosure, rainfall showerhead, and elegant tile patterns for modern living.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_1551 Ben.jpeg',
    title: 'Contemporary Bathroom Design',
    category: 'Complete Remodel',
    description: 'Full bathroom renovation showcasing sleek vanities, energy-efficient lighting, and beautiful countertops by Austin bathroom remodeling experts.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_2305 Ben.jpeg',
    title: 'Custom Tile Work',
    category: 'Tile Installation',
    description: 'Expert tile installation featuring precision craftsmanship in shower walls, flooring, and accent details for Austin bathroom projects.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_2324 Ben.jpeg',
    title: 'Walk-in Bath Installation',
    category: 'Walk-in Bath',
    description: 'Safe and accessible walk-in bath installation in Austin TX with low threshold entry and therapeutic features for enhanced mobility.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_2329 Ben.jpeg',
    title: 'Elegant Vanity Installation',
    category: 'Vanity & Fixtures',
    description: 'Premium bathroom vanity installation with double sinks, modern faucets, and ample storage for functional bathroom remodeling in Austin.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_2596 Ben.jpeg',
    title: 'Designer Bathroom Upgrade',
    category: 'Complete Remodel',
    description: 'Classic bathroom transformation combining traditional elegance with modern functionality through expert Austin bathroom renovation services.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_5970 Ben.jpeg',
    title: 'Tub to Shower Conversion',
    category: 'Shower Conversion',
    description: 'Professional tub to shower conversion in Austin featuring walk-in accessibility, custom tile, and modern fixtures for easier daily use.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_6283 Ben.jpeg',
    title: 'Spa-Style Bathroom',
    category: 'Luxury Remodel',
    description: 'Luxury bathroom remodeling in Austin with high-end materials, ambient lighting, and spa-inspired design for ultimate relaxation.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_7767 Ben.jpeg',
    title: 'Premium Flooring Installation',
    category: 'Flooring',
    description: 'Beautiful bathroom flooring installation featuring durable, waterproof materials with modern patterns for Austin bathroom projects.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_8122 Ben.jpeg',
    title: 'Modern Fixtures & Lighting',
    category: 'Bathroom Update',
    description: 'Contemporary bathroom update in Austin with LED lighting, chrome fixtures, and coordinated hardware for a fresh, modern look.',
    location: 'Austin, TX',
  },
  {
    src: '/IMG_2849 Ben v.jpeg',
    title: 'Custom Bathroom Design',
    category: 'Custom Design',
    description: 'Fully customized bathroom renovation with bespoke tile selection, unique fixtures, and expert craftsmanship for a one-of-a-kind Austin bathroom.',
    location: 'Austin, TX',
  },
]

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
              href="tel:512-492-2321"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              CALL: (512) 492-2321
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

      {/* === GALLERY PREVIEW SECTION === */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-blue-700">Our Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recent <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our latest bathroom transformations across Austin. Each project reflects our commitment to quality craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.slice(0, 11).map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/gallery" className="text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <p className="font-bold text-lg">Click to View</p>
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full">
                      {img.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{img.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{img.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mt-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {img.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
            >
              View Full Gallery
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* === REVIEWS SECTION === */}
      {/* Elfsight All-in-One Reviews | Untitled All-in-One Reviews */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elfsight-app-395835fd-a621-4c6a-a692-0e93c62fcec9" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* === 3-STEP PROCESS SECTION === */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              OUR 3-STEP REMODELING PROCESS:<br/>
              FAST, TRANSPARENT, AND BUILT TO LAST
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Remodeling your bathroom shouldn't be complicated. At Premier Bathroom Remodel Texas, our process is straightforward, from your first call through final inspection. Quick turnaround, complete transparency, and no shortcuts.
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
                href="tel:512-492-2321"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Today: (512) 492-2321
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
            Take the first step in transforming your space. Contact Premier Bathroom Remodel Texas today for a free consultation and quote. Serving Austin, Houston, Dallas, San Antonio, and all of Texas.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:512-492-2321"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 512-492-2321
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
              Serving All of Texas — Austin, Houston, Dallas, San Antonio & More
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

