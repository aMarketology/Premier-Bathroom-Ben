'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ServiceLeadForm from '../components/ServiceLeadForm'

const SERVICE_CONFIG: Record<string, { headline: string; sub: string; serviceLabel: string; accentColor: 'blue' | 'cyan' | 'indigo' }> = {
  'shower-remodel': {
    headline: 'Get Your Free Shower Remodel Quote',
    sub: 'Custom walk-in showers, frameless glass, and premium tile — designed and built by Ben in Austin.',
    serviceLabel: 'Shower Remodel',
    accentColor: 'blue',
  },
  'tub-conversion': {
    headline: 'Get Your Free Tub-to-Shower Quote',
    sub: 'Remove the old tub and install a beautiful walk-in shower. Fast, clean, warrantied.',
    serviceLabel: 'Tub-to-Shower Conversion',
    accentColor: 'cyan',
  },
  'walk-in-bath': {
    headline: 'Get Your Free Walk-In Bath Quote',
    sub: 'Safe, ADA-compliant walk-in baths for Austin homeowners. Lifetime warranty included.',
    serviceLabel: 'Walk-In Bath',
    accentColor: 'cyan',
  },
  'bathroom-vanity': {
    headline: 'Get Your Free Vanity Quote',
    sub: "Custom vanities, double sinks, quartz countertops — installed by Austin's best.",
    serviceLabel: 'Bathroom Vanity',
    accentColor: 'blue',
  },
  'full-bathroom-remodel': {
    headline: 'Get Your Free Full Bathroom Remodel Quote',
    sub: 'Full renovations, tile, fixtures, vanity, shower — all done by Ben. Licensed & insured.',
    serviceLabel: 'Full Bathroom Remodel',
    accentColor: 'blue',
  },
}

type ConfigType = { headline: string; sub: string; serviceLabel: string; accentColor: 'blue' | 'cyan' | 'indigo' }

const DEFAULT: ConfigType = {
  headline: 'Get Your Free Bathroom Remodel Quote',
  sub: "Austin's most trusted bathroom remodeler. Tell us about your project and Ben will reach out within 2 hours.",
  serviceLabel: 'Bathroom Remodel',
  accentColor: 'blue',
}

const PROJECT_PHOTOS = [
  { src: '/bathroom remodel/DSCF8715.JPG', alt: 'Bathroom remodel Austin TX' },
  { src: '/bathroom remodel/DSCF8719.JPG', alt: 'Custom shower Austin' },
  { src: '/bathroom remodel/DSCF8729.JPG', alt: 'Walk-in shower Austin TX' },
  { src: '/bathroom remodel/DSCF8746.JPG', alt: 'Master bath remodel Austin' },
  { src: '/bathroom remodel/DSCF8758.JPG', alt: 'Luxury bathroom renovation Austin' },
]

export default function GetStarted() {
  const [service, setService] = useState('bathroom-remodel')
  const [config, setConfig] = useState<ConfigType>(DEFAULT)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const svc = params.get('service') ?? ''
    if (svc && SERVICE_CONFIG[svc]) {
      setService(svc)
      setConfig(SERVICE_CONFIG[svc])
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">Austin, TX &middot; Free Estimate</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                {config.headline}
              </h1>

              <p className="text-base md:text-xl text-blue-100 leading-relaxed">
                {config.sub}
              </p>

              <div className="flex flex-wrap gap-5 pt-2">
                {[
                  { icon: '✅', text: 'Licensed & Insured' },
                  { icon: '⚡', text: 'Response in 2 Hours' },
                  { icon: '🔒', text: 'No Spam, Ever' },
                  { icon: '📍', text: 'Austin, TX Based' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-blue-100 text-sm font-medium">
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-400 shrink-0">
                  <Image
                    src="/IMG_1412 Ben.jpeg"
                    alt="Ben — Owner, Premier Bathroom Remodel Austin"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Ben — Owner &amp; Lead Installer</p>
                  <p className="text-blue-200 text-xs mt-0.5">15+ years &middot; Austin, TX &middot; Licensed &amp; Insured</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-blue-200 ml-1">5-Star Rated</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-xs text-blue-300 uppercase tracking-widest">Or call directly</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/30 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (512) 706-9577
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ServiceLeadForm
                service={service}
                serviceLabel={config.serviceLabel}
                accentColor={config.accentColor}
                pageLocation="GetStarted Hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Real Austin Projects — Completed by Ben
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {PROJECT_PHOTOS.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET BEN */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] max-h-[480px] lg:max-h-none rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/IMG_2305 Ben.jpeg"
                  alt="Ben — Owner of Premier Bathroom Remodel Austin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
                  <p className="font-bold text-gray-900">Ben — Owner &amp; Lead Installer</p>
                  <p className="text-gray-500 text-sm">Austin, TX &middot; 15+ Years &middot; Licensed &amp; Insured</p>
                  <div className="flex gap-1 mt-1.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">5-Star Rated</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Why Homeowners Choose Ben</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
                You Talk to <span className="text-blue-600">Ben.</span><br />Ben Does the Work.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No sales reps. No call centers. No subcontractors you have never met. When you reach out, I personally call you back. When we start your project, I am on site every day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '15+', sub: 'Years Experience' },
                  { label: '200+', sub: 'Austin Bathrooms' },
                  { label: '5★', sub: 'Average Rating' },
                  { label: '100%', sub: 'Licensed & Insured' },
                ].map((stat, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
              How It <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Simple and pressure-free</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Answer 2 Quick Questions', desc: 'Tell us your timeline and budget — takes 20 seconds. No commitment.' },
              { step: '02', title: 'Ben Calls You Back', desc: 'I personally reach out within 2 hours to schedule your free in-home estimate.' },
              { step: '03', title: 'Get a Detailed Quote', desc: 'We visit your home, measure, discuss design options, and give you an exact price. No surprises.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-blue-50 border border-blue-100"
              >
                <div className="text-5xl font-bold text-blue-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
              What We <span className="text-blue-600">Remodel</span>
            </h2>
            <p className="text-xl text-gray-600">Each quote is 100% free — no obligation, ever</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/services/shower-remodel-austin', label: 'Shower Remodel', desc: 'Walk-in showers, frameless glass, custom tile', icon: '🚿', param: 'shower-remodel' },
              { href: '/services/tub-to-shower-conversion-austin', label: 'Tub-to-Shower', desc: 'Remove old tub, build a beautiful walk-in shower', icon: '🔄', param: 'tub-conversion' },
              { href: '/services/bathroom-remodeling-austin', label: 'Full Bathroom Remodel', desc: 'Tile, vanity, shower, fixtures — complete renovation', icon: '🏠', param: 'full-bathroom-remodel' },
              { href: '/services/bathroom-vanity-austin', label: 'Vanity Upgrade', desc: 'Custom vanities, quartz tops, double sinks', icon: '🪞', param: 'bathroom-vanity' },
              { href: '/services/walk-in-bath-austin', label: 'Walk-In Bath', desc: 'ADA-compliant, safe bathing, lifetime warranty', icon: '♿', param: 'walk-in-bath' },
              { href: '/gallery', label: 'See All Our Work', desc: 'Browse completed Austin bathroom remodels', icon: '🎨', param: 'bathroom-remodel' },
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={`/get-started?service=${svc.param}`}
                  className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{svc.label}</h3>
                  <p className="text-gray-500 text-sm mt-1">{svc.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-blue-600 text-sm font-medium">
                    Get a free quote
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100">
            Fill out the quiz above — takes 30 seconds. Ben will call you within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl font-semibold text-blue-700 hover:bg-blue-50 transition-all text-lg shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Ben — (512) 706-9577
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-lg"
            >
              See Our Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-blue-200 pt-2">
            Serving Austin &middot; Round Rock &middot; Cedar Park &middot; Pflugerville &middot; West Lake Hills &amp; more
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
