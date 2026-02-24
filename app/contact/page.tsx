'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import { getGA4ClientId, getGA4SessionId } from '@/lib/ga4-client'

const galleryImages = [
  { src: '/IMG_0387 Ben.jpeg', alt: 'Modern Bathroom Remodel Austin' },
  { src: '/IMG_1412 Ben.jpeg', alt: 'Luxury Shower Installation Austin' },
  { src: '/IMG_1551 Ben.jpeg', alt: 'Contemporary Bathroom Design Austin' },
  { src: '/IMG_2305 Ben.jpeg', alt: 'Custom Tile Work Austin' },
  { src: '/IMG_6283 Ben.jpeg', alt: 'Spa-Style Bathroom Austin' },
  { src: '/IMG_2596 Ben.jpeg', alt: 'Designer Bathroom Upgrade Austin' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    const name = target.name
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const [clientId, sessionId] = await Promise.all([getGA4ClientId(), getGA4SessionId()])
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, pageUrl: window.location.href, clientId, sessionId }),
      })
      if (!response.ok) throw new Error('Failed to submit form')
      if (typeof window !== 'undefined' && (window as any).gtagSendEvent) {
        (window as any).gtagSendEvent('/thank-you')
      } else {
        window.location.href = '/thank-you'
      }
    } catch (err) {
      setError('Failed to submit. Please try again or call us directly.')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 text-center text-white">
        <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-4">
          <span className="text-sm font-bold uppercase tracking-wider">Free Consultation</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Get Your Free <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Bathroom Quote</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Austin's top-rated bathroom remodelers. We respond within 24 hours ” usually same day.
        </p>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-300">
          {[
            { icon: <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />, text: 'Licensed & Insured' },
            { icon: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />, text: 'Same-Day Response' },
            { icon: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />, text: '5-Star Rated on Google' },
            { icon: <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />, text: 'Serving Greater Austin' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">{item.icon}</svg>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main 2-col layout */}
      <section className="flex-1 py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT ” Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Your Free Quote</h2>
            <p className="text-gray-500 mb-8 text-sm">No obligation. Our team will reach out within 24 hours.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" name="name" value={formData.name} onChange={handleChange}
                required disabled={loading}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 disabled:opacity-50"
                placeholder="Your Full Name *"
              />
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                required disabled={loading}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 disabled:opacity-50"
                placeholder="Phone Number *"
              />
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                required disabled={loading}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 disabled:opacity-50"
                placeholder="Email Address *"
              />
              <select
                name="service" value={formData.service} onChange={handleChange}
                required disabled={loading}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 disabled:opacity-50"
              >
                <option value="">Select a service...</option>
                <option value="bathroom-remodel">Bathroom Remodeling</option>
                <option value="shower-remodel">Shower Remodel</option>
                <option value="walk-in-bath">Walk-in Bath</option>
                <option value="tub-conversion">Tub to Shower Conversion</option>
                <option value="flooring">Premium Flooring</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message" value={formData.message} onChange={handleChange}
                disabled={loading} rows={4}
                placeholder="Tell us about your project (optional)..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 resize-none disabled:opacity-50"
              />
              <button
                type="submit" disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Speak with an Expert'}
              </button>
            </form>

            {/* Direct call CTA */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-2">Prefer to talk? Call us directly:</p>
              <a href="tel:512-492-2321" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                512-492-2321
              </a>
            </div>
          </div>

          {/* RIGHT ” Gallery + Info */}
          <div className="space-y-8">

            {/* Gallery grid */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Recent Work in Austin</h3>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={img.src} alt={img.alt} fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 33vw, 200px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:512-492-2321" className="text-xl font-bold text-blue-600 hover:text-blue-700">512-492-2321</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:info@premierbathroomremodel.com" className="text-blue-600 hover:text-blue-700 font-medium break-all">info@premierbathroomremodel.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-gray-700">516 Congress Ave., Austin, TX 78701</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-gray-700 text-sm">Mon “ Fri: 8am “ 6pm<br/>Saturday: 8am “ 4pm<br/>Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Service Area</p>
                  <p className="text-gray-700 text-sm">Austin, Round Rock, Cedar Park,<br/>Pflugerville, West Lake Hills,<br/>Bee Cave & all of Central Texas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


