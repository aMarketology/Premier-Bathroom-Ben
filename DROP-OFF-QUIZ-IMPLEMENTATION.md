# Quiz & Form Drop-Off Capture — Implementation Guide

## The Problem
Most visitors who land on a service page or start filling a form **abandon before submitting**.
Standard analytics only shows you the final conversion. This guide captures leads **at every step**.

---

## What We've Already Built

### `ServiceLeadForm.tsx` — Partial Lead Capture (Live)

Every service landing page form already does this:

```ts
// Saves to localStorage on every keystroke
const savePartial = (updated: typeof formData) => {
  localStorage.setItem('pbr_partial_lead', JSON.stringify({
    name: updated.name,
    phone: updated.phone,
    email: updated.email,
    service: updated.service,
    _ts: Date.now(),
  }))
}

// Restores on return visit (within 48 hours)
useEffect(() => {
  const saved = localStorage.getItem('pbr_partial_lead')
  if (saved) {
    const parsed = JSON.parse(saved)
    if (Date.now() - parsed._ts < 48 * 60 * 60 * 1000) {
      setFormData(prev => ({ ...prev, ...parsed }))
    }
  }
}, [])
```

**Result:** Anyone who comes back within 48 hrs sees their form pre-filled.

### GA4 Field-Level Funnel Tracking (Live)

```ts
// Fires on every field focus and change
trackFormInteraction(`${serviceLabel} Hero Form`, 'name', 'focus')
trackFormInteraction(`${serviceLabel} Hero Form`, 'phone', 'change')
trackFormError(`${serviceLabel} Hero Form`, 'phone', 'required')
```

**In GA4 → Explore → Funnel Exploration**, set these events as steps:
1. `session_start`
2. `form_interaction` (filter: field_name = "name")
3. `form_interaction` (filter: field_name = "phone")
4. `form_submit_attempt`
5. `generate_lead` (thank-you page)

You'll see **exactly which field causes drop-off**.

---

## Next Level: Multi-Step Quiz

If you add a quiz (e.g. "What kind of remodel are you looking for?"), capture each step:

### Step 1 — Fire GA4 on every selection

```ts
// In quiz component
const handleServiceSelect = (service: string) => {
  setSelectedService(service)
  setStep(2)

  // Fires even if they abandon here
  window.gtag?.('event', 'quiz_step_completed', {
    step: 1,
    step_name: 'service_selected',
    value: service,
  })

  // Save partial to localStorage
  localStorage.setItem('pbr_quiz_partial', JSON.stringify({
    service,
    step: 1,
    _ts: Date.now(),
  }))
}

const handleBudgetSelect = (budget: string) => {
  setBudget(budget)
  setStep(3)

  window.gtag?.('event', 'quiz_step_completed', {
    step: 2,
    step_name: 'budget_selected',
    value: budget,
  })

  localStorage.setItem('pbr_quiz_partial', JSON.stringify({
    service: selectedService,
    budget,
    step: 2,
    _ts: Date.now(),
  }))
}
```

### Step 2 — "Continue Where You Left Off" Banner

On page load, check for a partial quiz and show a resume banner:

```tsx
// In any page component
useEffect(() => {
  const partial = localStorage.getItem('pbr_quiz_partial')
  if (partial) {
    const parsed = JSON.parse(partial)
    // Only show if abandoned within last 24 hours and not completed
    if (Date.now() - parsed._ts < 24 * 60 * 60 * 1000 && !parsed.completed) {
      setShowResumeBanner(true)
      setPartialData(parsed)
    }
  }
}, [])

// Resume banner JSX
{showResumeBanner && (
  <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-white rounded-xl shadow-2xl border border-blue-100 p-4 z-50">
    <p className="text-sm font-semibold text-gray-900 mb-1">
      Continue where you left off?
    </p>
    <p className="text-xs text-gray-500 mb-3">
      You were looking at {partialData.service} options
    </p>
    <div className="flex gap-2">
      <button
        onClick={() => { router.push('/get-started?resume=true'); setShowResumeBanner(false) }}
        className="flex-1 bg-blue-600 text-white text-xs font-medium py-2 rounded-lg"
      >
        Continue →
      </button>
      <button
        onClick={() => { localStorage.removeItem('pbr_quiz_partial'); setShowResumeBanner(false) }}
        className="text-gray-400 text-xs px-2"
      >
        Dismiss
      </button>
    </div>
  </div>
)}
```

### Step 3 — Exit-Intent Email Capture Modal

Capture an email when someone is about to leave (mouse leaves viewport upward):

```tsx
useEffect(() => {
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY < 10 && !exitModalShown && !localStorage.getItem('pbr_exit_captured')) {
      setShowExitModal(true)
      setExitModalShown(true)
    }
  }
  document.addEventListener('mouseleave', handleMouseLeave)
  return () => document.removeEventListener('mouseleave', handleMouseLeave)
}, [exitModalShown])

// Exit modal — lightweight, single field
{showExitModal && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Wait — Get Our Free Pricing Guide
      </h3>
      <p className="text-gray-600 mb-6">
        Austin bathroom remodel costs broken down by project type. 
        No spam, just the info you need.
      </p>
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleExitCapture}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg"
      >
        Send Me the Guide
      </button>
      <button onClick={() => setShowExitModal(false)} className="w-full text-gray-400 text-sm mt-3">
        No thanks
      </button>
    </div>
  </div>
)}
```

### Step 4 — Post Result: Embed Form Inside Quiz Result

Instead of showing a "Click here" button at the end of a quiz, embed the `ServiceLeadForm` directly in the result:

```tsx
// In quiz result step
{step === 'result' && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left: Result summary */}
    <div>
      <h2>Your Perfect Solution: {result.title}</h2>
      <p>{result.description}</p>
      <p className="text-2xl font-bold">Estimated: {result.priceRange}</p>
    </div>

    {/* Right: Inline form — no page redirect needed */}
    <ServiceLeadForm
      service={result.serviceKey}
      serviceLabel={result.title}
      accentColor="blue"
      pageLocation="/get-started"
    />
  </div>
)}
```

**This one change typically doubles quiz completion → lead rates.**

---

## Full Drop-Off Funnel Map

| Stage | What Happens | Tool |
|---|---|---|
| Page load | UTM params + referrer saved | localStorage |
| Form field focus | `form_interaction` event fires | GA4 client |
| Partial fill | Saved to localStorage every keystroke | `ServiceLeadForm.tsx` |
| Quiz step 1+ | `quiz_step_completed` event | GA4 |
| Exit intent | Email capture modal triggers | mouseleave event |
| Return visit | Form/quiz pre-filled from localStorage | `ServiceLeadForm.tsx` |
| Submission | Full lead sent to email + GA4 `generate_lead` | `/api/contact` |
| Thank-you page | Google Ads conversion fires | gtag in `thank-you/page.tsx` |

---

## GA4 Reports to Set Up

### Funnel Exploration (Recommended)
Go to **GA4 → Explore → Funnel Exploration**

Steps to add:
1. `page_view` on `/services/tub-to-shower-conversion-austin`
2. `form_interaction` (action = focus)
3. `form_submit_attempt`
4. `generate_lead`

This shows your **drop-off rate at each step** and where to focus optimization.

### Custom Audience for Remarketing
In **GA4 → Admin → Audiences**, create:
- **"Form Started, No Conversion"** — users who triggered `form_interaction` but NOT `generate_lead`
- Use this audience in Google Ads for **remarketing campaigns** at lower CPCs

---

## Priority Order to Implement

1. ✅ **Partial localStorage capture** — already live in `ServiceLeadForm.tsx`
2. ✅ **GA4 field-level tracking** — already live
3. 🔲 **Exit-intent email modal** — build as `ExitIntentModal.tsx` component, add to `AnalyticsProvider.tsx`
4. 🔲 **Quiz with step-level GA4 events** — build in `get-started/page.tsx`
5. 🔲 **"Continue where you left off" banner** — add to `AnalyticsProvider.tsx` so it shows site-wide
6. 🔲 **Remarketing audience in GA4** — configure in GA4 admin (no code needed)

---

*Last updated: May 2026*
*Related files: `app/components/ServiceLeadForm.tsx`, `app/components/AnalyticsProvider.tsx`, `lib/ga4-client.ts`*
