'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BathroomRemodelingAustin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    smsConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const honeypotRef = useRef('')
  const loadedAtRef = useRef(Date.now())

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {}
    if (!data.name.trim() || !/^[a-zA-Z\s'\-.]{2,80}$/.test(data.name.trim())) {
      errs.name = 'Please enter your name.'
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number.'
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
          _hp: honeypotRef.current,
          _lt: loadedAtRef.current,
        }),
      })
      if (res.ok) {
        router.push('/thank-you')
      } else {
        throw new Error('Failed')
      }
    } catch {
      alert('There was an error submitting your request. Please call us at (512) 706-9577.')
      setIsSubmitting(false)
    }
  }

  const services = [
    { icon: '🚿', title: 'Shower Remodel', desc: 'Custom walk-in showers, tile surrounds, frameless glass enclosures, and full shower overhauls.' },
    { icon: '🛁', title: 'Tub to Shower Conversion', desc: 'Convert your old tub into a beautiful, modern walk-in shower that maximizes your space.' },
    { icon: '🪟', title: 'Full Bathroom Renovation', desc: 'Complete gut-and-rebuild remodels — flooring, walls, vanity, fixtures, and tile work.' },
    { icon: '🔲', title: 'Custom Tile & Flooring', desc: 'Ceramic, porcelain, natural stone, and mosaic tile for floors, walls, and backsplashes.' },
    { icon: '🪠', title: 'Vanity & Fixture Upgrades', desc: 'New vanities, sinks, faucets, mirrors, and lighting to modernize your bathroom fast.' },
    { icon: '♿', title: 'Accessibility Remodels', desc: 'Walk-in tubs, grab bars, and ADA-compliant upgrades for safe, comfortable living.' },
  ]

  const reviews = [
    { name: 'Jennifer M.', stars: 5, text: 'TP Bathroom Remodeling Austin completely transformed our master bath. The tile work is flawless and they finished ahead of schedule. Highly recommend!', location: 'Austin, TX' },
    { name: 'Carlos R.', stars: 5, text: 'We converted our tub to a walk-in shower and couldn\'t be happier. Clean, professional crew and the price was very fair. Will use again for the guest bath.', location: 'Round Rock, TX' },
    { name: 'Susan T.', stars: 5, text: 'From the quote to the final walk-through, everything was smooth. Our shower tile is gorgeous. These guys are the real deal.', location: 'Cedar Park, TX' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── MINIMAL HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-slate-900">
              <span className="text-sky-600">TP</span> Bathroom Remodeling Austin
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-medium">
              A Tile Pros Company
            </span>
          </div>
          <a
            href="tel:512-706-9577"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-bold text-sm hover:bg-sky-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            (512) 706-9577
          </a>
        </div>
      </header>

      {/* ── HERO + FORM ── */}
      <section className="relative bg-gradient-to-br from-sky-800 via-sky-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
            <source src="/0202 (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/85 via-sky-800/75 to-slate-900/85" />
        </div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* GMB Badge */}
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/40 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sky-200 text-sm font-medium">Austin's Top-Rated Bathroom Remodelers</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Bathroom Remodeling
                <span className="block text-sky-300">Austin, TX</span>
              </h1>

              <p className="text-xl text-white/85 leading-relaxed">
                Custom bathroom renovations, shower remodels, and tile work by TP Bathroom Remodeling Austin — a trusted Tile Pros company serving Austin and surrounding areas for over 15 years.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {['Licensed & Insured', 'Free Estimates', '5-Star Rated', 'Local Austin Experts'].map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-semibold">5.0</span>
                <span className="text-white/70 text-sm">· 150+ Google Reviews</span>
              </div>

              {/* Call CTA (mobile-first) */}
              <div className="pt-2">
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-sky-900 rounded-xl font-bold text-lg hover:bg-sky-50 transition-all shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now: (512) 706-9577
                </a>
              </div>
            </motion.div>

            {/* Right: Lead Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Get Your Free Estimate</h2>
                  <p className="text-gray-500 text-sm mt-1">Usually responds within 1 hour</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="_hp_br">Leave this empty</label>
                    <input type="text" id="_hp_br" name="_hp" tabIndex={-1} autoComplete="off" onChange={e => { honeypotRef.current = e.target.value }} />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name *"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-900 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-900 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-900 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      style={{ color: formData.service ? '#111827' : '#9CA3AF' }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">What do you need? (optional)</option>
                      <option value="shower-remodel">Shower Remodel</option>
                      <option value="tub-to-shower">Tub to Shower Conversion</option>
                      <option value="full-bathroom-remodel">Full Bathroom Renovation</option>
                      <option value="tile-installation">Custom Tile Installation</option>
                      <option value="vanity-upgrade">Vanity & Fixture Upgrade</option>
                      <option value="accessibility-remodel">Accessibility Remodel</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your project (optional)"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-900 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="smsConsent"
                      name="smsConsent"
                      checked={formData.smsConsent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <label htmlFor="smsConsent" className="text-xs text-gray-500 leading-relaxed">
                      By checking this box, you agree to receive SMS messages about your project from TP Bathroom Remodeling Austin (a Tile Pros company). Reply STOP to opt-out anytime.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold text-lg rounded-xl hover:from-sky-700 hover:to-sky-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Get My Free Estimate →'}
                  </button>

                  <p className="text-center text-xs text-gray-400">No spam. We respect your privacy.</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING TRUST BAR ── */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          {[
            '⭐ 5-STAR RATED ON GOOGLE',
            '✓ LICENSED & INSURED',
            '✓ FREE ESTIMATES',
            '✓ SERVING AUSTIN 15+ YEARS',
            '✓ TP BATHROOM REMODELING AUSTIN',
            '⭐ 5-STAR RATED ON GOOGLE',
            '✓ LICENSED & INSURED',
            '✓ FREE ESTIMATES',
            '✓ SERVING AUSTIN 15+ YEARS',
          ].map((t, i) => (
            <span key={i} className="inline-block px-8 text-sm font-semibold tracking-wide">{t}</span>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Bathroom Remodeling Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From shower remodels to full gut-and-rebuild renovations, TP Bathroom Remodeling Austin handles every scope.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-sky-100"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 text-white rounded-xl font-bold text-lg hover:bg-sky-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call for a Free Estimate: (512) 706-9577
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Why Austin Homeowners Choose TP Bathroom Remodeling
                </h2>
                <p className="text-xl text-gray-600">
                  We're not a franchise. We're a local Austin team with real craftsmanship, honest pricing, and a track record you can verify.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: '15+ Years of Austin Experience',
                    desc: 'We\'ve completed hundreds of bathroom remodels across Austin, Round Rock, Cedar Park, and surrounding communities.',
                  },
                  {
                    title: 'Transparent, Upfront Pricing',
                    desc: 'No hidden fees. You get a detailed, itemized quote before any work starts — and we stick to it.',
                  },
                  {
                    title: 'Expert Tile & Waterproofing',
                    desc: 'Our installers are specialists. Proper waterproofing, precision tile layouts, and clean grout lines — every time.',
                  },
                  {
                    title: 'Fast Turnaround',
                    desc: 'Most bathroom remodels completed in 5–10 business days. We keep your disruption to a minimum.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/pexels-vladimirsrajber-11806476.jpg"
                alt="Bathroom remodel by TP Bathroom Remodeling Austin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm font-bold text-gray-900">5.0 · 150+ Reviews</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">"Best bathroom remodel company in Austin, hands down."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Are Saying</h2>
            <p className="text-xl text-gray-600">Real reviews from Austin homeowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">"{r.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-gradient-to-br from-sky-800 to-sky-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Bathroom?</h2>
          <p className="text-xl text-sky-100">
            Get a free estimate from Austin's most trusted bathroom remodeling team. No pressure, no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="tel:512-706-9577"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-sky-900 rounded-xl font-bold text-lg hover:bg-sky-50 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (512) 706-9577
            </a>
            <a
              href="#top"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Get Free Estimate Online →
            </a>
          </div>
          <p className="text-sky-300 text-sm">
            Serving Austin · Round Rock · Cedar Park · Pflugerville · Bee Cave · West Lake Hills
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-white py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <div className="text-xl font-bold">
            <span className="text-sky-500">TP</span> Bathroom Remodeling Austin
          </div>
          <p className="text-gray-400 text-sm">A Tile Pros Company · Austin, TX · (512) 706-9577</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-gray-600 text-xs pt-2">© {new Date().getFullYear()} TP Bathroom Remodeling Austin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
