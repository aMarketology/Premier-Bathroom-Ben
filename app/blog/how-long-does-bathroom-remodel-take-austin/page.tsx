'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function BathroomRemodelTimelineAustin() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Long Does a Bathroom Remodel Take in Austin? (Realistic Timeline)',
    description: 'Phase-by-phase bathroom remodel timeline for Austin TX homes, from demolition to final walk-through.',
    author: { '@type': 'Organization', name: 'Tile Pros Austin' },
    publisher: { '@type': 'Organization', name: 'Tile Pros Austin', url: 'https://tileprosaustin.com' },
    datePublished: '2025-02-08',
    dateModified: '2025-02-08',
    mainEntityOfPage: 'https://tileprosaustin.com/blog/how-long-does-bathroom-remodel-take-austin',
  }

  const phases = [
    { phase: 'Design & Material Selection', days: '1 – 2 weeks', description: 'Choose tile, fixtures, vanity, paint colors, and layout. If materials need to be ordered, add 1 – 3 weeks for shipping.' },
    { phase: 'Demolition', days: '1 – 2 days', description: 'Tear out old tile, drywall, vanity, and fixtures. Plumbing and electrical are exposed for inspection.' },
    { phase: 'Rough Plumbing & Electrical', days: '2 – 3 days', description: 'Relocate water lines, drains, and electrical if the layout is changing. City of Austin inspection may be required.' },
    { phase: 'Subfloor & Backer Board', days: '1 – 2 days', description: 'Level the subfloor, install cement backer board, and apply waterproof membrane in the shower/tub area.' },
    { phase: 'Tile Installation', days: '3 – 5 days', description: 'Set floor tile, shower tile, and any accent features. Includes thinset cure time between floor and wall work.' },
    { phase: 'Grouting & Sealing', days: '1 – 2 days', description: 'Grout all joints, clean haze, and apply sealant to natural stone or porous grout. Needs 24 – 48 hrs to cure.' },
    { phase: 'Vanity, Fixtures & Hardware', days: '1 – 2 days', description: 'Install vanity, countertop, faucet, showerhead, toilet, mirrors, towel bars, and accessories.' },
    { phase: 'Paint & Finishing Touches', days: '1 day', description: 'Paint walls and ceiling, install baseboards, caulk edges, and final cleanup.' },
    { phase: 'Final Walk-Through', days: '1 day', description: 'Review every detail with the homeowner. Touch up anything that isn\u0027t perfect. Hand over warranty info.' },
  ]

  const timelines = [
    { scope: 'Half-Bath / Powder Room', range: '1 – 2 weeks', notes: 'No shower or tub — just floor tile, vanity, toilet, and paint.' },
    { scope: 'Standard Guest Bathroom', range: '2 – 3 weeks', notes: 'Tub/shower combo, floor, vanity. Straightforward layout.' },
    { scope: 'Primary Bathroom Remodel', range: '3 – 5 weeks', notes: 'Walk-in shower, double vanity, new flooring. More tile, more fixtures.' },
    { scope: 'Luxury / Custom Bathroom', range: '5 – 8 weeks', notes: 'Custom tile patterns, heated floors, freestanding tub, frameless glass, built-in niches.' },
  ]

  const delays = [
    { issue: 'Back-ordered materials', fix: 'Order tile and fixtures during the design phase — before demo begins. Confirm lead times in writing.' },
    { issue: 'Hidden water damage or mold', fix: 'Budget a 10 % contingency. Experienced contractors know where to look before surprises snowball.' },
    { issue: 'City permit delays', fix: 'Austin permits can take 1 – 3 weeks. Your contractor should file permits early in the planning stage.' },
    { issue: 'Scope creep', fix: 'Lock in your design decisions before demo day. Changes mid-project add days and dollars.' },
    { issue: 'Subcontractor scheduling', fix: 'Work with a contractor who manages their own tile, plumbing, and electrical crews in-house.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/blog" className="inline-flex items-center gap-1 text-amber-200 hover:text-white text-sm mb-6 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How Long Does a Bathroom Remodel Take in Austin?</h1>
            <p className="text-lg text-amber-100/80">A realistic timeline from demo to done.</p>
            <p className="text-amber-100/70 mt-2">Published February 8, 2025 &middot; 7 min read</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-lg prose-stone max-w-none">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              &ldquo;How long is this going to take?&rdquo; — it&rsquo;s the first question every
              homeowner asks, right after &ldquo;how much?&rdquo; The honest answer depends on the
              scope of your project, but here&rsquo;s a phase-by-phase breakdown based on the
              hundreds of bathroom remodels our Austin crew has completed.
            </p>

            {/* Quick summary table */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Quick Timeline by Project Scope</h2>
            <div className="overflow-x-auto rounded-xl border border-stone-200 mb-10">
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-800 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Project Scope</th>
                    <th className="px-4 py-3 font-semibold">Typical Duration</th>
                    <th className="px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {timelines.map((row, i) => (
                    <tr key={row.scope} className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.scope}</td>
                      <td className="px-4 py-3 font-semibold text-amber-800">{row.range}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phase breakdown */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Phase-by-Phase Breakdown</h2>
            <div className="space-y-6 mb-12">
              {phases.map((p, i) => (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-6 border-b border-stone-200 last:border-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{p.phase}</h3>
                      <span className="text-sm font-semibold text-amber-700">{p.days}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Common delays */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Delays &amp; How to Avoid Them</h2>
            <div className="space-y-4 mb-12">
              {delays.map((d) => (
                <div key={d.issue} className="p-5 rounded-xl border border-stone-200 bg-stone-50">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{d.issue}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-amber-800">How to avoid it:</strong> {d.fix}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Tile Pros Austin Stays on Schedule</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Delays usually happen when a contractor is juggling too many jobs or waiting on
              third-party subcontractors. At Tile Pros Austin we keep our project pipeline
              manageable, run our own tile crews, and coordinate plumbing and electrical with trusted
              local partners we&rsquo;ve worked with for years. That means:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>A detailed schedule shared with you before day one</li>
              <li>Materials ordered and confirmed before demolition starts</li>
              <li>Daily on-site progress — no ghost contractors</li>
              <li>Proactive communication if anything changes</li>
              <li>A clean job site at the end of every workday</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We serve Austin, Round Rock, Cedar Park, Pflugerville, West Lake Hills, Bee Cave, and
              surrounding communities. Whether you&rsquo;re updating a small guest bath or building
              the primary bathroom of your dreams, we&rsquo;ll give you an honest timeline you can
              plan around.
            </p>
          </motion.div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-amber-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Plan Your Bathroom Remodel Today</h2>
          <p className="text-amber-100/80 mb-8">Get a free estimate with a realistic timeline — no guesswork, no surprises.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:512-706-9577" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-900 rounded-lg font-bold hover:bg-amber-50 transition">
              (512) 706-9577
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-amber-900 transition">
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
