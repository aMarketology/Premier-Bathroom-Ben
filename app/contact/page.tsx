'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useState } from 'react'
import { getGA4ClientId, getGA4SessionId } from '@/lib/ga4-client'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    smsConsent: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Redirect to thank you page with conversion tracking
      if (typeof window !== 'undefined' && (window as any).gtagSendEvent) {
        (window as any).gtagSendEvent('/thank-you')
      } else {
        window.location.href = '/thank-you'
      }
    } catch (err) {
      setError('Failed to submit form. Please try again or call us directly.')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Contact Section */}
      <section className="flex-1 py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form - Now First */}
          <div className="text-white space-y-6">
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
            <div className="grid grid-cols-2 gap-4 pt-4">
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

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 pt-8">
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

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Tell us about your bathroom remodel or flooring project..."
                  rows={4}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-white placeholder-white/60 resize-none disabled:opacity-50"
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="sms-consent"
                  name="smsConsent"
                  checked={formData.smsConsent}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="sms-consent" className="ml-2 text-sm text-white/80">
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
          </div>

          {/* Contact Info - Now Second */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Ready to transform your bathroom or upgrade your flooring? Contact Premier Bathroom Remodel Austin today for a free consultation and quote. We're here to answer all your questions and help you create the perfect space.
            </p>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <a href="tel:512-706-9577" className="text-cyan-400 font-bold hover:text-cyan-300 text-2xl">
                    512-706-9577
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="text-3xl">✉️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <a href="mailto:info@premierbathroomremodel.com" className="text-cyan-400 font-bold hover:text-cyan-300">
                    info@premierbathroomremodel.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Address</h3>
                  <p className="text-gray-300">
                    516 Congress Ave.<br/>
                    Austin, TX 78701
                  </p>
                </div>
              </div>

              {/* Service Area */}
              <div className="flex gap-4">
                <div className="text-3xl">🗺️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Service Area</h3>
                  <p className="text-gray-300">
                    Austin & Nearby Areas<br/>
                    Including: Round Rock, Cedar Park,<br/>
                    Pflugerville, West Lake Hills,<br/>
                    Bee Cave & More
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="text-3xl">🕒</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 8am - 6pm<br/>
                    Saturday: 8am - 4pm<br/>
                    Sunday: Closed
                  </p>
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
