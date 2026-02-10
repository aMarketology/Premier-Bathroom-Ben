'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

export default function BathroomVanityAustin() {
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
              <span className="text-sm font-bold uppercase tracking-wider">Custom Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bathroom Vanity Installation <br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Austin, TX
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Upgrade your bathroom with custom vanity installation from Premier Bathroom Remodel Austin. Quality craftsmanship, premium materials, and expert design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 706-9577
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
                Transform Your Bathroom with a Custom Vanity
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Your bathroom vanity is more than just storage—it's the centerpiece of your bathroom design. Premier Bathroom Remodel Austin specializes in custom vanity installation that combines style, functionality, and quality craftsmanship.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From modern floating vanities to traditional double-sink designs, we offer a wide range of options to match your style and maximize your space. Our expert installers ensure precise measurements, proper plumbing connections, and flawless finishing.
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
                src="/IMG_2329 Ben.jpeg"
                alt="Bathroom Vanity Installation Austin"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Vanity Options */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl p-12 mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Vanity Styles & Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Single Sink Vanities',
                  items: ['Freestanding designs', 'Wall-mounted options', '24" to 48" widths', 'Modern & traditional styles']
                },
                {
                  title: 'Double Sink Vanities',
                  items: ['60" to 84" widths', 'His & hers storage', 'Luxury countertops', 'Dual mirror options']
                },
                {
                  title: 'Floating Vanities',
                  items: ['Contemporary look', 'Easy floor cleaning', 'Illusion of space', 'LED lighting options']
                },
                {
                  title: 'Countertop Materials',
                  items: ['Quartz', 'Granite', 'Marble', 'Solid surface']
                },
                {
                  title: 'Storage Features',
                  items: ['Soft-close drawers', 'Pull-out organizers', 'Built-in hampers', 'Medicine cabinets']
                },
                {
                  title: 'Finishes & Hardware',
                  items: ['Brushed nickel', 'Matte black', 'Polished chrome', 'Oil-rubbed bronze']
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

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Upgrade Your Bathroom Vanity?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '📦', title: 'Increased Storage', desc: 'Maximize space with organized drawers and cabinets' },
                { icon: '✨', title: 'Enhanced Style', desc: 'Update your bathroom\'s look and feel instantly' },
                { icon: '💰', title: 'Better ROI', desc: 'One of the best bathroom upgrades for home value' },
                { icon: '🔧', title: 'Improved Function', desc: 'Better lighting, outlets, and accessibility' },
                { icon: '💎', title: 'Quality Materials', desc: 'Durable countertops and premium finishes' },
                { icon: '⚡', title: 'Quick Installation', desc: 'Professional install in 1-2 days typically' }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Installation Process */}
          <div className="bg-gray-50 rounded-3xl p-12 mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Installation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Measure & Design', desc: 'Precise measurements and style selection' },
                { step: '02', title: 'Remove Old Vanity', desc: 'Safe removal and disposal of existing vanity' },
                { step: '03', title: 'Prepare & Install', desc: 'Plumbing updates and new vanity installation' },
                { step: '04', title: 'Finish & Inspect', desc: 'Final touches, sealing, and quality check' }
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
            <h2 className="text-4xl font-bold mb-4">Ready for a Beautiful New Vanity?</h2>
            <p className="text-xl mb-8 text-blue-100">Get expert bathroom vanity installation from Austin's trusted remodeling professionals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
