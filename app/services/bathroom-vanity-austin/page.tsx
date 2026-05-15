'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import ServiceLeadForm from '@/app/components/ServiceLeadForm'

export default function BathroomVanityAustin() {
  const vanityOptions = [
    { title: 'Single Sink Vanities', items: ['24"–48" widths', 'Freestanding & wall-mounted', 'Modern & traditional styles'] },
    { title: 'Double Sink Vanities', items: ['60"–84" widths', 'His & hers storage', 'Luxury countertop options'] },
    { title: 'Floating Vanities', items: ['Contemporary wall-mounted look', 'Illusion of more floor space', 'LED lighting options'] },
    { title: 'Countertop Materials', items: ['Quartz', 'Granite', 'Marble', 'Solid surface'] },
    { title: 'Storage Features', items: ['Soft-close drawers', 'Pull-out organizers', 'Medicine cabinets'] },
    { title: 'Finishes & Hardware', items: ['Brushed nickel', 'Matte black', 'Polished chrome', 'Oil-rubbed bronze'] },
  ]

  const process = [
    { step: '01', title: 'Free Consultation', desc: 'We visit your home, measure the space, and help you choose the perfect style and size.' },
    { step: '02', title: 'Detailed Quote', desc: 'Written quote with no hidden fees — materials, plumbing, and installation all included.' },
    { step: '03', title: 'Professional Install', desc: 'We remove the old vanity, update plumbing as needed, and install your new vanity.' },
    { step: '04', title: 'Final Walkthrough', desc: 'You inspect every detail before we leave. Guaranteed satisfaction.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-300">Austin Vanity Specialists</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Bathroom Vanity<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Installation Austin
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                From a simple vanity swap to a fully custom double-sink build — we handle everything including plumbing. Completed in 1–2 days in most cases.
              </p>

              <ul className="space-y-3">
                {[
                  'All plumbing connections included',
                  'Single, double & custom-width vanities',
                  'Quartz, granite & marble countertops',
                  'Completed in 1–2 days in most cases',
                  'Free in-home consultation and written quote',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[0,1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-blue-800 border-2 border-slate-900 flex items-center justify-center text-sm">👤</div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-xs text-gray-400">200+ satisfied Austin homeowners</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ServiceLeadForm
                service="bathroom-vanity"
                serviceLabel="Bathroom Vanity Installation"
                accentColor="blue"
                pageLocation="Hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vanity Options */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vanity Styles & Options</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every style, size, and finish — matched to your bathroom and your budget.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vanityOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-3">{option.title}</h3>
                <ul className="space-y-2">
                  {option.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + ROI section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/IMG_2329 Ben.jpeg"
              alt="Bathroom vanity installation Austin TX"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white text-sm font-semibold">Premier Bathroom Remodel — Austin, TX</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Why a New Vanity Makes Sense</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The vanity is the focal point of any bathroom. An outdated vanity makes the whole space feel old — no matter how nice everything else is. A modern vanity with quality countertop and updated fixtures can transform your bathroom in a single day.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              It is also one of the highest-ROI upgrades you can make before a home sale, often returning more than it costs.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '1–2 Days', label: 'Typical install time' },
                { stat: '$1,500+', label: 'Starting investment' },
                { stat: '200+', label: 'Austin installs done' },
                { stat: '5★', label: 'Average rating' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{item.stat}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Simple 4-Step Process</h2>
            <p className="text-gray-300 text-lg">Easy from first call to final reveal</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-4">{phase.step}</div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone CTA strip */}
      <section className="py-12 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-2">Questions? Call Us Directly</h3>
          <p className="text-blue-100 mb-6">Speak with Ben — Austin's bathroom vanity expert</p>
          <a
            href="tel:512-706-9577"
            className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold text-xl px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            512-706-9577
          </a>
        </div>
      </section>

      {/* Bottom form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Ready to See What's Possible?</h2>
            <p className="text-lg text-gray-600">Get a free quote from Austin's trusted vanity team — we respond same day.</p>
          </motion.div>
          <ServiceLeadForm
            service="bathroom-vanity"
            serviceLabel="Bathroom Vanity Installation"
            accentColor="blue"
            pageLocation="Bottom CTA"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
