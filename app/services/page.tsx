'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Services() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Our Services</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-slate-100 tracking-tight">
              Bathroom & Flooring
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">Remodeling Services</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Expert bathroom renovation and premium flooring solutions serving Austin, Rollingwood, Manchaca, Pflugerville, and surrounding areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* === MAIN SERVICES SECTION === */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Service 1: Bathroom Remodeling Austin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Featured Service</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Bathroom Remodeling <span className="text-purple-500">Austin</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  When you're looking for a bathroom remodel in Austin, TX, make sure to call the experts at Premier Bathroom Remodel Austin. We take pride in transforming ordinary bathrooms into stunning, functional spaces that exceed expectations.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Our Comprehensive Services Include:</h3>
                  <ul className="space-y-3">
                    {[
                      'Complete bathroom renovations',
                      'Custom shower and tub installations',
                      'Vanity design and installation',
                      'Tile work and backsplash',
                      'Modern fixtures and fittings',
                      'Lighting design and installation',
                      'Flooring upgrades',
                      'ADA-compliant modifications'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-purple-500">15+</div>
                    <div className="text-xl text-slate-300">Years Experience</div>
                    <div className="text-sm text-slate-500">in Austin Bathroom Remodeling</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 2: Walk-in Bath */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-950 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <svg className="w-24 h-24 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div className="text-2xl font-bold text-purple-400">Safe & Accessible</div>
                    <div className="text-sm text-slate-400">Walk-in Bath Solutions</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Safety & Comfort</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Walk-in Bath <span className="text-purple-500">Austin</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  Experience enhanced safety, accessibility, and independence with our premium walk-in bath installations. Perfect for seniors and individuals with mobility concerns, our walk-in baths combine safety features with luxurious comfort.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Key Features:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Low threshold entry',
                      'Anti-slip flooring',
                      'Built-in seating',
                      'Grab bars & handrails',
                      'Quick-drain technology',
                      'Therapeutic jets (optional)',
                      'ADA compliant design',
                      'Lifetime warranty options'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Free Quote 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 3: Shower Remodel Austin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Modern Designs</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Shower Remodel <span className="text-purple-500">Austin</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  Premier Bathroom Remodel Austin specializes in reimagining ordinary bathrooms as relaxing, spa-inspired spaces designed for both comfort and everyday functionality. From stepping onto warm, heated flooring in the morning to unwinding beneath a soothing rainfall shower at night, every detail is carefully considered.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Shower Features:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Walk-in showers',
                      'Rainfall shower heads',
                      'Custom glass enclosures',
                      'Frameless shower doors',
                      'Tile & stone work',
                      'Built-in benches',
                      'Modern fixtures',
                      'Spa-inspired designs'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-950 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <svg className="w-24 h-24 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div className="text-xl font-bold text-purple-400">Modern Shower Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 4: Tub to Shower Conversion Austin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-950 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <svg className="w-24 h-24 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <div className="text-2xl font-bold text-purple-400">Convert & Upgrade</div>
                    <div className="text-sm text-slate-400">Quick Installation</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Quick Conversion</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Tub to Shower Conversion <span className="text-purple-500">Austin</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  Transform your outdated bathtub into a sleek, modern walk-in shower. Perfect for homeowners looking to improve accessibility, increase space, or simply update the look of their bathroom with a more contemporary design.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Conversion Benefits:</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      'One-day installation available',
                      'Increased bathroom space',
                      'Enhanced safety & accessibility',
                      'Modern, low-maintenance materials',
                      'Custom design options',
                      'Improved home value',
                      'Energy-efficient fixtures',
                      'Warranty included'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Free Quote 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 5: Tub & Shower Combo Austin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Best of Both</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Tub & Shower Combo <span className="text-purple-500">Austin</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  No matter if your preference is clean, contemporary design or the timeless charm of traditional style, our skilled professionals collaborate with you to bring your ideal bathroom to life. We combine premium materials with detailed workmanship to create spaces that are as beautiful as they are functional.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Combo Features:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Versatile design options',
                      'Space-saving solutions',
                      'Premium tub & shower fixtures',
                      'Custom tile surrounds',
                      'Modern or traditional styles',
                      'High-quality materials',
                      'Professional installation',
                      'Perfect for family homes'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <svg className="w-24 h-24 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <div className="text-xl font-bold text-purple-400">Dual Functionality</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 6: Safety & Accessibility */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-950 to-slate-950 border border-slate-800 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-2xl font-bold text-green-400">Safety First</div>
                    <div className="text-sm text-slate-400">ADA Compliant Solutions</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-800 bg-green-900/20">
                  <span className="text-xs font-medium text-green-400 uppercase tracking-widest">Safety Solutions</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Safety & <span className="text-green-500">Accessibility</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  We specialize in creating safer, more accessible bathrooms for people of all ages and abilities. From aging-in-place modifications to ADA-compliant installations, we ensure your bathroom is both safe and stylish.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Safety Features:</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      'Grab bars & handrails',
                      'Non-slip flooring',
                      'Wheelchair-accessible showers',
                      'Raised toilets',
                      'Barrier-free entry',
                      'Adjustable shower heads',
                      'Comfort height fixtures',
                      'ADA compliance expertise'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-green-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Free Quote 512-706-9577
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service 7: Premium Flooring */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800 bg-purple-900/20">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-widest">Premium Quality</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-slate-100">
                  Premium <span className="text-purple-500">Flooring</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed">
                  Transform your space with our high-quality flooring solutions. From elegant tile to luxurious hardwood and modern vinyl options, we offer comprehensive flooring services that enhance both beauty and functionality.
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-200">Flooring Options:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Ceramic & Porcelain Tile', desc: 'Durable and water-resistant' },
                      { name: 'Luxury Vinyl Plank', desc: 'Modern and maintenance-free' },
                      { name: 'Hardwood Flooring', desc: 'Timeless elegance' },
                      { name: 'Natural Stone', desc: 'Premium marble & granite' }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="text-slate-200 font-medium">{item.name}</div>
                            <div className="text-sm text-slate-500">{item.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="tel:512-706-9577"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </a>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8">
                  <div className="h-full flex flex-col justify-center space-y-6">
                    {[
                      { icon: '🏠', title: 'Residential', count: '500+' },
                      { icon: '🏢', title: 'Commercial', count: '100+' },
                      { icon: '⭐', title: 'Rating', count: '5.0' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="text-4xl">{item.icon}</div>
                        <div>
                          <div className="text-2xl font-bold text-purple-500">{item.count}</div>
                          <div className="text-sm text-slate-400">{item.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SERVICE AREAS SECTION === */}
      <section className="relative py-24 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Service Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-100 mb-4">
              Proudly Serving <span className="text-purple-500">Greater Austin</span>
            </h2>
            <p className="text-xl text-slate-400">
              Professional bathroom remodeling and flooring services throughout Austin and surrounding communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Austin', desc: 'Downtown & Central Austin' },
              { name: 'Round Rock', desc: 'Custom bathroom designs' },
              { name: 'Cedar Park', desc: 'Quality craftsmanship' },
              { name: 'Pflugerville', desc: 'Bathroom & flooring experts' },
              { name: 'West Lake Hills', desc: 'Luxury renovations' },
              { name: 'Bee Cave', desc: 'Expert contractors' },
              { name: 'Rollingwood', desc: 'Premium remodeling' },
              { name: 'Manchaca', desc: 'Complete remodeling services' },
              { name: 'Georgetown', desc: 'Professional installation' },
              { name: 'Lakeway', desc: 'Premium remodeling' },
              { name: 'Dripping Springs', desc: 'Full-service remodeling' },
              { name: 'Leander', desc: 'Trusted professionals' },
              { name: 'Kyle', desc: 'Reliable service' }
            ].map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-purple-600 hover:bg-slate-900/70 transition-all"
              >
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-1 group-hover:text-purple-400 transition-colors">
                      Bathroom Remodel {area.name}
                    </h3>
                    <p className="text-sm text-slate-400">{area.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6">Don't see your area? We serve all of Central Texas!</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-600/40 transition-all"
            >
              Contact Us Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-100 mb-4">
              Why Choose <span className="text-purple-500">Premier Bathroom Remodel Austin</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the difference of working with Austin's trusted remodeling experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Licensed & Insured',
                desc: 'Fully certified contractors with comprehensive insurance coverage'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '15+ Years Experience',
                desc: 'Extensive expertise in bathroom remodeling and flooring'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: '5-Star Rated',
                desc: 'Consistently high ratings from satisfied Austin homeowners'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Free Quotes',
                desc: 'No-obligation consultations and transparent pricing'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center hover:border-purple-600 transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-24 bg-gradient-to-b from-black to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-slate-100 mb-6">
            Ready to Start Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">Remodeling Project?</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Contact Premier Bathroom Remodel Austin today for a free consultation. Let's bring your vision to life!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300"
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
              Request Free Quote
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Serving Greater Austin, TX
              </div>
              <div className="hidden sm:block text-slate-700">•</div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Licensed & Insured
              </div>
              <div className="hidden sm:block text-slate-700">•</div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                5-Star Rated
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
