'use client'

import { useState, useEffect, useRef } from 'react'
import { trackCTAClick, trackPhoneClick, trackFormInteraction, trackFormError } from '@/lib/ga4-client'

interface ServiceLeadFormProps {
  service: string          // pre-filled service value e.g. 'tub-to-shower-conversion'
  serviceLabel: string     // human-readable e.g. 'Tub to Shower Conversion'
  accentColor?: 'cyan' | 'blue' | 'purple' // theme color
  pageLocation: string     // e.g. '/services/tub-to-shower-conversion-austin'
}

const PARTIAL_KEY = 'pbr_partial_lead'

export default function ServiceLeadForm({
  service,
  serviceLabel,
  accentColor = 'cyan',
  pageLocation,
}: ServiceLeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service,
    message: '',
    smsConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const loadTimeRef = useRef(Date.now())

  // Restore any partial fill from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PARTIAL_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Only restore if saved within last 48 hours
        if (Date.now() - parsed._ts < 48 * 60 * 60 * 1000) {
          setFormData((prev) => ({
            ...prev,
            name: parsed.name || '',
            phone: parsed.phone || '',
            email: parsed.email || '',
          }))
        }
      }
    } catch {}
  }, [])

  // Save partial fill to localStorage on every change
  const savePartial = (updated: typeof formData) => {
    try {
      localStorage.setItem(
        PARTIAL_KEY,
        JSON.stringify({
          name: updated.name,
          phone: updated.phone,
          email: updated.email,
          service: updated.service,
          _ts: Date.now(),
        })
      )
    } catch {}
  }

  // Fire GA4 partial step events
  const handleFieldChange = (field: string, value: string | boolean) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    savePartial(updated)
    // Track each field interaction for funnel visibility
    trackFormInteraction(`${serviceLabel} Hero Form`, field, 'change')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim()) {
      trackFormError(`${serviceLabel} Hero Form`, 'name', 'required')
      setError('Please enter your name.')
      return
    }
    if (!formData.phone.trim()) {
      trackFormError(`${serviceLabel} Hero Form`, 'phone', 'required')
      setError('Please enter your phone number.')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Track CTA click
    trackCTAClick(`${serviceLabel} Form Submit`, pageLocation, '/thank-you')

    // Fire GA4 partial-capture event immediately on submit attempt
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'form_submit_attempt', {
        form_name: `${serviceLabel} Hero Form`,
        form_location: pageLocation,
        service_type: service,
      })
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageUrl: pageLocation,
          _lt: loadTimeRef.current, // timing check for spam
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Clear partial on success
      try { localStorage.removeItem(PARTIAL_KEY) } catch {}

      window.location.href = '/thank-you'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const accent = {
    cyan: {
      ring: 'focus:ring-cyan-500',
      btn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-cyan-500/40',
      badge: 'bg-cyan-50 border-cyan-200 text-cyan-700',
      dot: 'bg-cyan-500',
      check: 'text-cyan-600 border-cyan-300 focus:ring-cyan-500',
    },
    blue: {
      ring: 'focus:ring-blue-500',
      btn: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/40',
      badge: 'bg-blue-50 border-blue-200 text-blue-700',
      dot: 'bg-blue-500',
      check: 'text-blue-600 border-blue-300 focus:ring-blue-500',
    },
    purple: {
      ring: 'focus:ring-purple-500',
      btn: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-purple-500/40',
      badge: 'bg-purple-50 border-purple-200 text-purple-700',
      dot: 'bg-purple-500',
      check: 'text-purple-600 border-purple-300 focus:ring-purple-500',
    },
  }[accentColor]

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-8 py-6">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${accent.dot} animate-pulse`} />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Free Quote — No Obligation</span>
        </div>
        <h3 className="text-2xl font-semibold text-white">Request an Appointment</h3>
        <p className="text-gray-400 text-sm mt-1">We typically respond within 2 hours</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="slp-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slp-name"
            required
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onFocus={() => trackFormInteraction(`${serviceLabel} Hero Form`, 'name', 'focus')}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${accent.ring} focus:border-transparent transition-all text-gray-900 placeholder-gray-400`}
            placeholder="John Smith"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="slp-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="slp-phone"
            required
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            onFocus={() => trackFormInteraction(`${serviceLabel} Hero Form`, 'phone', 'focus')}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${accent.ring} focus:border-transparent transition-all text-gray-900 placeholder-gray-400`}
            placeholder="(512) 555-0123"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="slp-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            id="slp-email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onFocus={() => trackFormInteraction(`${serviceLabel} Hero Form`, 'email', 'focus')}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${accent.ring} focus:border-transparent transition-all text-gray-900 placeholder-gray-400`}
            placeholder="john@example.com"
          />
        </div>

        {/* Service — pre-filled but editable */}
        <div>
          <label htmlFor="slp-service" className="block text-sm font-medium text-gray-700 mb-1.5">
            Service Interested In
          </label>
          <select
            id="slp-service"
            value={formData.service}
            onChange={(e) => handleFieldChange('service', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${accent.ring} focus:border-transparent transition-all bg-white text-gray-900`}
          >
            <option value="tub-to-shower-conversion">Tub to Shower Conversion</option>
            <option value="walk-in-bath">Walk-In Bath</option>
            <option value="shower-remodel">Shower Remodel</option>
            <option value="full-bathroom-remodel">Full Bathroom Remodel</option>
            <option value="bathroom-vanity">Bathroom Vanity</option>
            <option value="other">Other / Not Sure Yet</option>
          </select>
        </div>

        {/* Optional message */}
        <div>
          <label htmlFor="slp-message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tell us about your project <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="slp-message"
            rows={3}
            value={formData.message}
            onChange={(e) => handleFieldChange('message', e.target.value)}
            onFocus={() => trackFormInteraction(`${serviceLabel} Hero Form`, 'message', 'focus')}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${accent.ring} focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none`}
            placeholder="e.g. 5x8 bathroom, want a walk-in shower with frameless glass..."
          />
        </div>

        {/* SMS Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="slp-sms"
            checked={formData.smsConsent}
            onChange={(e) => handleFieldChange('smsConsent', e.target.checked)}
            className={`mt-1 w-4 h-4 rounded ${accent.check}`}
          />
          <label htmlFor="slp-sms" className="text-xs text-gray-500 leading-relaxed">
            By checking this box, you agree to receive SMS messages about your appointment from Premier Bathroom Remodel Austin. Reply STOP to opt-out at any time.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 ${accent.btn} text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Get My Free Quote →'
          )}
        </button>

        {/* Trust micro-copy */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-1">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No spam, ever
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Response in 2 hrs
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free estimate
          </span>
        </div>
      </form>
    </div>
  )
}
