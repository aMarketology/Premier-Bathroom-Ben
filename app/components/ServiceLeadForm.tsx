'use client'

import { useState, useEffect, useRef } from 'react'

interface ServiceLeadFormProps {
  service: string
  serviceLabel: string
  accentColor?: 'cyan' | 'blue' | 'purple' | 'indigo' | 'emerald'
  pageLocation: string
}

const PARTIAL_KEY = 'pbr_partial_lead'
const TTL_MS = 48 * 60 * 60 * 1000 // 48 hours

export default function ServiceLeadForm({
  service,
  serviceLabel,
  accentColor = 'cyan',
  pageLocation,
}: ServiceLeadFormProps) {
  const startTime = useRef(Date.now())

  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    smsConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [restored, setRestored] = useState(false)

  // Restore partial lead from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PARTIAL_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (Date.now() - saved.ts < TTL_MS && saved.service === service) {
          setFields(f => ({ ...f, ...saved.fields }))
          setRestored(true)
        }
      }
    } catch {}
  }, [service])

  // Save partial lead on every keystroke
  const savePartial = (updated: typeof fields) => {
    try {
      localStorage.setItem(PARTIAL_KEY, JSON.stringify({
        ts: Date.now(),
        service,
        fields: { name: updated.name, phone: updated.phone, email: updated.email },
      }))
    } catch {}
  }

  const update = (key: keyof typeof fields, value: string | boolean) => {
    const updated = { ...fields, [key]: value }
    setFields(updated)
    savePartial(updated)

    // GA4 field interaction tracking
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'form_field_interaction', {
        field_name: key,
        service,
        page_location: pageLocation,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fields.name || !fields.phone) {
      setError('Please fill in your name and phone number.')
      return
    }

    const elapsed = Math.floor((Date.now() - startTime.current) / 1000)

    // GA4 submit attempt
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'form_submit_attempt', { service, page_location: pageLocation })
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          service,
          message: fields.message || `Inquiry from ${serviceLabel} landing page`,
          smsConsent: fields.smsConsent,
          pageUrl: window.location.pathname,
          _lt: elapsed,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      localStorage.removeItem(PARTIAL_KEY)
      window.location.href = '/thank-you'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const colors = {
    cyan:   { ring: 'focus:ring-cyan-500',   btn: 'from-cyan-600 to-blue-600',   dot: 'bg-cyan-400',   check: 'accent-cyan-600' },
    blue:   { ring: 'focus:ring-blue-500',   btn: 'from-blue-600 to-cyan-600',   dot: 'bg-blue-400',   check: 'accent-blue-600' },
    purple: { ring: 'focus:ring-purple-500', btn: 'from-purple-600 to-blue-600', dot: 'bg-purple-400', check: 'accent-purple-600' },
    indigo: { ring: 'focus:ring-indigo-500', btn: 'from-indigo-600 to-blue-600', dot: 'bg-indigo-400', check: 'accent-indigo-600' },
    emerald:{ ring: 'focus:ring-emerald-500',btn: 'from-emerald-600 to-teal-600',dot: 'bg-emerald-400',check: 'accent-emerald-600' },
  }
  const c = colors[accentColor]

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Free Quote — No Obligation</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Request an Appointment</h3>
        <p className="text-gray-400 text-sm mt-0.5">We typically respond within 2 hours</p>
      </div>

      {/* Restored banner */}
      {restored && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 text-sm text-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          We saved your info — just finish and submit!
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={fields.name}
              onChange={e => update('name', e.target.value)}
              placeholder="John Smith"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              required
              value={fields.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="(512) 555-0123"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={fields.email}
            onChange={e => update('email', e.target.value)}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
          <select
            value={service}
            disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
          >
            <option value={service}>{serviceLabel}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your project <span className="text-gray-400">(optional)</span></label>
          <textarea
            rows={3}
            value={fields.message}
            onChange={e => update('message', e.target.value)}
            placeholder="e.g. We want to convert our tub to a walk-in shower..."
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all resize-none`}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`sms-${service}`}
            checked={fields.smsConsent}
            onChange={e => update('smsConsent', e.target.checked)}
            className={`mt-1 w-4 h-4 rounded border-gray-300 ${c.check}`}
          />
          <label htmlFor={`sms-${service}`} className="text-xs text-gray-500 leading-relaxed">
            By checking this box you agree to receive SMS messages about your quote from Premier Bathroom Remodel Austin. Reply STOP to opt-out anytime.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-gradient-to-r ${c.btn} text-white rounded-lg font-semibold text-base hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Sending…' : 'Get My Free Quote →'}
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">🔒 No spam, ever</span>
          <span className="flex items-center gap-1">⚡ Response in 2 hrs</span>
          <span className="flex items-center gap-1">✅ Free estimate</span>
        </div>
      </form>
    </div>
  )
}
