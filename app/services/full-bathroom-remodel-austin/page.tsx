'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

export default function FullBathroomRemodelAustin() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
              <span className="text-sm font-bold uppercase tracking-wider">Complete Renovation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Full Bathroom Remodel <br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Austin, TX
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your entire bathroom with a complete renovation from Premier Bathroom Remodel Austin. Custom design, quality materials, and expert craftsmanship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="tel:512-492-2321"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 492-2321
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Free Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Complete Bathroom Transformation
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A full bathroom remodel in Austin involves completely redesigning and renovating your entire bathroom space. From demolition to the final touches, we handle every aspect of your project with precision and care.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Whether you're looking to create a spa-like retreat, modernize an outdated space, or improve functionality for aging in place, our expert team brings your vision to life with quality materials and masterful craftsmanship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/IMG_0387 Ben.jpeg"
                alt="Full Bathroom Remodel Austin"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* What's Included */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl p-12 mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">What's Included in a Full Bathroom Remodel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Design & Planning',
                  items: ['Custom design consultation', '3D rendering (optional)', 'Material selection', 'Layout optimization']
                },
                {
                  title: 'Demolition & Prep',
                  items: ['Safe demolition', 'Debris removal', 'Structural repairs', 'Plumbing & electrical updates']
                },
                {
                  title: 'Installation',
                  items: ['New fixtures', 'Custom tile work', 'Vanity & countertops', 'Shower/tub installation']
                },
                {
                  title: 'Flooring',
                  items: ['Tile installation', 'Waterproof underlayment', 'Heated floors (optional)', 'Non-slip surfaces']
                },
                {
                  title: 'Finishing Touches',
                  items: ['Paint & trim', 'Lighting fixtures', 'Mirrors & hardware', 'Final inspections']
                },
                {
                  title: 'Warranty',
                  items: ['Workmanship guarantee', 'Installation warranty', 'Ongoing support', 'Quality assurance']
                }
              ].map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-cyan-400">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Popular Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Popular Features & Upgrades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: 'ðŸš¿', title: 'Walk-in Showers', desc: 'Frameless glass, rainfall showerheads, built-in benches' },
                { icon: 'ðŸ›', title: 'Luxury Tubs', desc: 'Freestanding soaking tubs, jetted tubs, clawfoot designs' },
                { icon: 'ðŸ’Ž', title: 'Premium Tile', desc: 'Marble, porcelain, glass mosaic, natural stone' },
                { icon: 'ðŸªž', title: 'Custom Vanities', desc: 'Double sinks, quartz countertops, soft-close drawers' },
                { icon: 'ðŸ’¡', title: 'Smart Lighting', desc: 'LED mirrors, dimmer switches, motion sensors' },
                { icon: 'ðŸŒ¡ï¸', title: 'Heated Floors', desc: 'Radiant floor heating for comfort and luxury' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="bg-gray-50 rounded-3xl p-12 mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Remodeling Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Consultation', desc: 'Free in-home assessment and design discussion' },
                { step: '02', title: 'Design', desc: 'Custom plans, material selection, detailed quote' },
                { step: '03', title: 'Construction', desc: 'Professional installation with minimal disruption' },
                { step: '04', title: 'Completion', desc: 'Final walkthrough and warranty activation' }
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-blue-600 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Full Bathroom Remodel?</h2>
            <p className="text-xl mb-8 text-blue-100">Get a free consultation and quote from Austin's trusted bathroom remodeling experts</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-492-2321"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 492-2321
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

