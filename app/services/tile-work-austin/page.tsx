'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import ServiceLeadForm from '@/app/components/ServiceLeadForm'

export default function TileWorkAustin() {
  const tileServices = [
    {
      title: 'Shower Tile',
      desc: 'Full shower surround tile installs — walls, floors, niche shelves, and custom patterns.',
      icon: '🚿',
    },
    {
      title: 'Bathroom Floor Tile',
      desc: 'Slip-resistant floor tile in any format: large format, mosaic, herringbone, and more.',
      icon: '🏠',
    },
    {
      title: 'Backsplash Installation',
      desc: 'Vanity backsplash and accent tile to tie your whole bathroom together.',
      icon: '✨',
    },
    {
      title: 'Natural Stone',
      desc: 'Marble, travertine, slate, and limestone — properly sealed and installed to last.',
      icon: '🪨',
    },
    {
      title: 'Tile Repair & Regrouting',
      desc: 'Cracked tiles, failing grout, or leaking shower pans — we fix it right.',
      icon: '🔧',
    },
    {
      title: 'Full Tile Remodel',
      desc: 'Demo old tile and start fresh with a complete floor-to-ceiling tile transformation.',
      icon: '🔄',
    },
  ]

  const process = [
    { step: '01', title: 'Free In-Home Estimate', desc: 'We measure the space, review your style preferences, and provide a written quote — no surprises.' },
    { step: '02', title: 'Material Selection', desc: 'We help you pick the right tile, grout color, and layout pattern for your space and budget.' },
    { step: '03', title: 'Expert Installation', desc: 'Proper substrate prep, waterproofing, and precision tile setting — built to last decades.' },
    { step: '04', title: 'Final Inspection', desc: 'Every grout joint, every edge. You sign off before we pack up.' },
  ]

  const faqs = [
    {
      q: 'How long does bathroom tile installation take?',
      a: 'Most bathroom tile jobs take 2–5 days depending on scope. A shower wall tile install is typically 2–3 days. Full floor and wall tile remodels may take 4–5 days.',
    },
    {
      q: 'Do you handle waterproofing?',
      a: 'Yes — waterproofing is included on all wet area tile work. We use Schluter KERDI or equivalent systems to ensure your shower stays watertight for years.',
    },
    {
      q: 'Can I supply my own tile?',
      a: 'Absolutely. You can purchase tile from any supplier and we will handle installation. We can also source tile for you if preferred.',
    },
    {
      q: 'What areas of Austin do you serve?',
      a: 'We serve all of Austin and surrounding areas including Cedar Park, Round Rock, Pflugerville, Georgetown, Kyle, Buda, and Leander.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-300">Austin Tile Specialists</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Bathroom Tile<br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Installation Austin
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Shower tile, floor tile, natural stone, and full tile remodels — installed with precision by Austin's trusted bathroom tile team.
              </p>

              <ul className="space-y-3">
                {[
                  'Shower walls, floors, niches & benches',
                  'Large format, mosaic, herringbone patterns',
                  'Natural stone properly waterproofed & sealed',
                  'Full waterproofing included on all wet areas',
                  'Free written estimate — no obligation',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[0,1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-slate-900 flex items-center justify-center text-sm">👤</div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-xs text-gray-400">200+ Austin tile installs completed</p>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ServiceLeadForm
                service="tile-work"
                serviceLabel="Bathroom Tile Installation"
                accentColor="emerald"
                pageLocation="Hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Tile</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">From a single wall to a full floor-to-ceiling transformation — we do it all.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tileServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-emerald-600 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + why tile section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/IMG_6673 Ben v.jpeg"
              alt="Bathroom tile installation Austin TX"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white text-sm font-semibold">Premier Bathroom Remodel — Austin, TX</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Why Tile Is the Best Investment</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tile is the most durable finish material in any bathroom. Unlike paint or wallpaper, quality tile properly installed can last 20–30 years or more — making it one of the highest-return investments you can make in your home.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Austin's hard water and humidity make professional waterproofing critical. Every tile job we do includes proper substrate preparation and waterproofing so your investment stays protected.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '2–5 Days', label: 'Typical project time' },
                { stat: '20+ Yrs', label: 'Expected lifespan' },
                { stat: '200+', label: 'Austin installs done' },
                { stat: '5★', label: 'Average rating' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{item.stat}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our 4-Step Tile Process</h2>
            <p className="text-gray-300 text-lg">Professional from estimate to final grout</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-5xl font-bold text-emerald-400 mb-4">{phase.step}</div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone CTA strip */}
      <section className="py-12 px-4 bg-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-2">Ready to Talk Tile?</h3>
          <p className="text-emerald-100 mb-6">Call Ben directly — Austin's bathroom tile specialist</p>
          <a
            href="tel:512-706-9577"
            className="inline-flex items-center gap-3 bg-white text-emerald-600 font-bold text-xl px-8 py-4 rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
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
            <h2 className="text-4xl font-bold text-gray-900">Get Your Free Tile Quote</h2>
            <p className="text-lg text-gray-600">Tell us about your project — we respond same day.</p>
          </motion.div>
          <ServiceLeadForm
            service="tile-work"
            serviceLabel="Bathroom Tile Installation"
            accentColor="emerald"
            pageLocation="Bottom CTA"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
