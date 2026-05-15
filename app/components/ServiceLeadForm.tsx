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

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible', icon: '⚡' },
  { value: '1-3mo', label: 'Within 1–3 months', icon: '📅' },
  { value: '3-6mo', label: 'Within 3–6 months', icon: '🗓️' },
  { value: 'just-looking', label: 'Just exploring', icon: '👀' },
]

const BUDGET_OPTIONS = [
  { value: 'under-5k', label: 'Under $5,000', icon: '💰' },
  { value: '5k-10k', label: '$5,000 – $10,000', icon: '💰💰' },
  { value: '10k-20k', label: '$10,000 – $20,000', icon: '💰💰💰' },
  { value: '20k-plus', label: '$20,000+', icon: '💎' },
]

export default function ServiceLeadForm({
  service,
  serviceLabel,
  accentColor = 'cyan',
  pageLocation,
}: ServiceLeadFormProps) {
  const startTime = useRef(Date.now())
  const [step, setStep] = useState(1)

  const [quiz, setQuiz] = useState({ timeline: '', budget: '' })
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
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
          if (saved.quiz) setQuiz(q => ({ ...q, ...saved.quiz }))
          if (saved.fields) {
            setFields(f => ({ ...f, ...saved.fields }))
            // If they already filled contact info, jump to step 2
            if (saved.fields.name || saved.fields.phone) {
              setStep(2)
              setRestored(true)
            } else if (saved.quiz?.timeline) {
              setStep(2)
            }
          }
        }
      }
    } catch {}
  }, [service])

  const savePartial = (updatedQuiz: typeof quiz, updatedFields: typeof fields) => {
    try {
      localStorage.setItem(PARTIAL_KEY, JSON.stringify({
        ts: Date.now(),
        service,
        quiz: updatedQuiz,
        fields: { name: updatedFields.name, phone: updatedFields.phone, email: updatedFields.email },
      }))
    } catch {}
  }

  const trackGA4 = (eventName: string, extra?: Record<string, string>) => {
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', eventName, { service, page_location: pageLocation, ...extra })
    }
  }

  const selectQuiz = (key: 'timeline' | 'budget', value: string) => {
    const updated = { ...quiz, [key]: value }
    setQuiz(updated)
    savePartial(updated, fields)
    trackGA4('quiz_answer', { question: key, answer: value })
  }

  const updateField = (key: keyof typeof fields, value: string | boolean) => {
    const updated = { ...fields, [key]: value }
    setFields(updated)
    savePartial(quiz, updated)
    trackGA4('form_field_interaction', { field_name: key })
  }

  const goToStep2 = () => {
    if (!quiz.timeline || !quiz.budget) return
    trackGA4('quiz_step1_complete')
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fields.name || !fields.phone) {
      setError('Please fill in your name and phone number.')
      return
    }

    const elapsed = Math.floor((Date.now() - startTime.current) / 1000)
    trackGA4('form_submit_attempt')

    setIsSubmitting(true)

    const message = [
      `Service: ${serviceLabel}`,
      quiz.timeline ? `Timeline: ${TIMELINE_OPTIONS.find(o => o.value === quiz.timeline)?.label}` : '',
      quiz.budget ? `Budget: ${BUDGET_OPTIONS.find(o => o.value === quiz.budget)?.label}` : '',
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          service,
          message,
          smsConsent: fields.smsConsent,
          pageUrl: window.location.pathname,
          _lt: elapsed,
          quiz,
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
    cyan:    { ring: 'focus:ring-cyan-500',    btn: 'from-cyan-600 to-blue-600',    dot: 'bg-cyan-400',    selected: 'border-cyan-500 bg-cyan-50 text-cyan-700',    check: 'accent-cyan-600' },
    blue:    { ring: 'focus:ring-blue-500',    btn: 'from-blue-600 to-cyan-600',    dot: 'bg-blue-400',    selected: 'border-blue-500 bg-blue-50 text-blue-700',    check: 'accent-blue-600' },
    purple:  { ring: 'focus:ring-purple-500',  btn: 'from-purple-600 to-blue-600',  dot: 'bg-purple-400',  selected: 'border-purple-500 bg-purple-50 text-purple-700', check: 'accent-purple-600' },
    indigo:  { ring: 'focus:ring-indigo-500',  btn: 'from-indigo-600 to-blue-600',  dot: 'bg-indigo-400',  selected: 'border-indigo-500 bg-indigo-50 text-indigo-700', check: 'accent-indigo-600' },
    emerald: { ring: 'focus:ring-emerald-500', btn: 'from-emerald-600 to-teal-600', dot: 'bg-emerald-400', selected: 'border-emerald-500 bg-emerald-50 text-emerald-700', check: 'accent-emerald-600' },
  }
  const c = colors[accentColor]

  const step1Complete = quiz.timeline && quiz.budget

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Free Quote — No Obligation</span>
        </div>
        <h3 className="text-xl font-semibold text-white">
          {step === 1 ? 'Tell us about your project' : 'How should we reach you?'}
        </h3>
        {/* Step progress */}
        <div className="flex items-center gap-2 mt-3">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? `bg-gradient-to-r ${c.btn} text-white` : 'bg-gray-700 text-gray-400'
              }`}>{s}</div>
              {s < 2 && <div className={`h-0.5 w-8 transition-all ${step > s ? `bg-gradient-to-r ${c.btn}` : 'bg-gray-700'}`} />}
            </div>
          ))}
          <span className="text-xs text-gray-500 ml-1">Step {step} of 2</span>
        </div>
      </div>

      {/* Restored banner */}
      {restored && step === 2 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 text-sm text-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          Welcome back — we saved your progress!
        </div>
      )}

      <div className="px-6 py-5">
        {/* ── STEP 1: Quiz ── */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Timeline */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">When are you looking to get started?</p>
              <div className="grid grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectQuiz('timeline', opt.value)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      quiz.timeline === opt.value
                        ? c.selected + ' border-2'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">What&apos;s your approximate budget?</p>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectQuiz('budget', opt.value)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      quiz.budget === opt.value
                        ? c.selected + ' border-2'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!step1Complete}
              onClick={goToStep2}
              className={`w-full py-4 bg-gradient-to-r ${c.btn} text-white rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl`}
            >
              Next: Get My Free Quote →
            </button>

            <p className="text-center text-xs text-gray-400">🔒 Your info stays private — no spam, ever</p>
          </div>
        )}

        {/* ── STEP 2: Contact Info ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summary chip */}
            <div className="flex flex-wrap gap-2 mb-1">
              {quiz.timeline && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                  {TIMELINE_OPTIONS.find(o => o.value === quiz.timeline)?.icon}{' '}
                  {TIMELINE_OPTIONS.find(o => o.value === quiz.timeline)?.label}
                  <button type="button" onClick={() => setStep(1)} className="ml-1 text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {quiz.budget && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                  {BUDGET_OPTIONS.find(o => o.value === quiz.budget)?.label}
                  <button type="button" onClick={() => setStep(1)} className="ml-1 text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
            </div>

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
                  onChange={e => updateField('name', e.target.value)}
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
                  onChange={e => updateField('phone', e.target.value)}
                  placeholder="(512) 555-0123"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-gray-400 text-xs">(optional)</span></label>
              <input
                type="email"
                value={fields.email}
                onChange={e => updateField('email', e.target.value)}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${c.ring} focus:border-transparent text-gray-900 placeholder-gray-400 transition-all`}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={`sms-${service}-${pageLocation}`}
                checked={fields.smsConsent}
                onChange={e => updateField('smsConsent', e.target.checked)}
                className={`mt-1 w-4 h-4 rounded border-gray-300 ${c.check}`}
              />
              <label htmlFor={`sms-${service}-${pageLocation}`} className="text-xs text-gray-500 leading-relaxed">
                By checking this box you agree to receive SMS messages about your quote from Premier Bathroom Remodel Austin. Reply STOP to opt-out anytime.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-gradient-to-r ${c.btn} text-white rounded-lg font-semibold text-base hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Sending…' : 'Send My Free Quote Request →'}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>🔒 No spam, ever</span>
              <span>⚡ Response in 2 hrs</span>
              <span>✅ Free estimate</span>
            </div>

            <button type="button" onClick={() => setStep(1)} className="w-full text-xs text-gray-400 hover:text-gray-600 underline">
              ← Back to project details
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
