'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function TileInstallationCostAustin() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Does Tile Installation Cost in Austin, TX? (2025 Price Guide)',
    description: 'Complete 2025 price guide for tile installation in Austin TX — backsplash, bathroom, kitchen, and whole-home flooring.',
    author: { '@type': 'Organization', name: 'Tile Pros Austin' },
    publisher: { '@type': 'Organization', name: 'Tile Pros Austin', url: 'https://tileprosaustin.com' },
    datePublished: '2025-01-12',
    dateModified: '2025-01-12',
    mainEntityOfPage: 'https://tileprosaustin.com/blog/how-much-does-tile-installation-cost-in-austin',
  }

  const costs = [
    { project: 'Kitchen Backsplash', sqft: '15 – 30 sq ft', range: '$600 – $1,800', notes: 'Subway tile on the lower end; natural stone or mosaic on the higher end' },
    { project: 'Bathroom Floor', sqft: '40 – 75 sq ft', range: '$1,200 – $3,500', notes: 'Porcelain is most popular; includes backer board prep' },
    { project: 'Shower Surround', sqft: '60 – 100 sq ft', range: '$2,500 – $6,000', notes: 'Waterproofing, niche shelves, and accent strips add cost' },
    { project: 'Kitchen Floor', sqft: '100 – 200 sq ft', range: '$2,000 – $5,500', notes: 'Large-format porcelain is trending; pattern layouts cost more' },
    { project: 'Full Bathroom Remodel Tile', sqft: '100 – 175 sq ft', range: '$4,000 – $10,000', notes: 'Floor + shower + vanity backsplash combined' },
    { project: 'Whole-Home Flooring', sqft: '800 – 2,000 sq ft', range: '$8,000 – $25,000+', notes: 'Volume discounts apply; material choice drives final price' },
  ]

  const factors = [
    { title: 'Tile Material', description: 'Ceramic starts around $1 – $4/sq ft, porcelain $3 – $8, and natural stone (travertine, marble, slate) can run $7 – $20+.' },
    { title: 'Layout Complexity', description: 'A simple straight lay costs less labor than herringbone, chevron, or custom patterns that require more cuts.' },
    { title: 'Substrate Prep', description: 'If the subfloor is uneven, cracked, or lacks cement backer board, prep work adds $1 – $3/sq ft.' },
    { title: 'Waterproofing', description: 'Showers and wet areas need a membrane (Schluter DITRA, RedGard, etc.), which adds $400 – $800 per shower.' },
    { title: 'Demolition & Removal', description: 'Removing old tile, mortar, or flooring typically costs $2 – $5/sq ft depending on what is underneath.' },
    { title: 'Trim & Finishing Details', description: 'Bullnose edges, Schluter strips, accent bands, and niche shelves add material and labor costs.' },
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
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How Much Does Tile Installation Cost in Austin, TX?</h1>
            <p className="text-amber-100/70">Published January 12, 2025 &middot; 7 min read</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-lg prose-stone max-w-none">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Whether you&rsquo;re refreshing a single backsplash or tiling every floor in your home,
              knowing what to expect on the invoice prevents sticker shock. Below we break down real
              2025 prices from Austin-area tile jobs so you can budget confidently before your first
              consultation.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Austin Tile Installation Costs at a Glance</h2>
            <div className="overflow-x-auto rounded-xl border border-stone-200 mb-10">
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-800 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Project</th>
                    <th className="px-4 py-3 font-semibold">Typical Size</th>
                    <th className="px-4 py-3 font-semibold">Price Range</th>
                    <th className="px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((row, i) => (
                    <tr key={row.project} className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.project}</td>
                      <td className="px-4 py-3 text-gray-600">{row.sqft}</td>
                      <td className="px-4 py-3 font-semibold text-amber-800">{row.range}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 italic text-sm mb-10">
              * Prices reflect labor + materials for mid-range selections in the Austin metro area as of early 2025. Premium materials and complex layouts will be higher.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Drives the Final Price?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {factors.map((f) => (
                <div key={f.title} className="p-6 rounded-xl border border-stone-200 bg-stone-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">DIY vs. Professional Tile Installation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A weekend warrior can save on labor — but tile is one trade where mistakes are
              expensive to fix. Cracked tiles, lippage (uneven edges), and failed waterproofing in
              wet areas can turn a budget project into a costly redo. Professional installers bring:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Laser-level subfloor prep for perfectly flat surfaces</li>
              <li>Proper thinset coverage — no hollow spots that lead to cracks</li>
              <li>Waterproof membrane systems in showers and tub surrounds</li>
              <li>Clean, consistent grout lines and professional finishing details</li>
              <li>Warranty on labor — so if anything shifts, it&rsquo;s covered</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How to Get the Best Value in Austin</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-8">
              <li><strong>Get 2 – 3 written quotes</strong> — compare scope, not just bottom-line price.</li>
              <li><strong>Ask about material markups</strong> — some contractors let you supply your own tile, which can save 10 – 20 %.</li>
              <li><strong>Bundle projects</strong> — tiling the kitchen floor and backsplash together is cheaper per square foot than two separate jobs.</li>
              <li><strong>Choose in-stock tile</strong> — special orders add lead time and sometimes freight costs.</li>
              <li><strong>Time your project wisely</strong> — late fall through early spring is typically slower, so you may negotiate better rates.</li>
            </ol>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Austin Homeowners Choose Tile Pros</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Tile Pros Austin we provide transparent, line-item estimates so you know exactly
              where every dollar goes. No hidden fees, no surprise change orders. Our team has
              completed hundreds of tile installations across Austin, Round Rock, Cedar Park,
              Pflugerville, and West Lake Hills — from simple backsplash refreshes to complete
              whole-home flooring transformations.
            </p>
          </motion.div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-amber-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Tile Installation Estimate</h2>
          <p className="text-amber-100/80 mb-8">Tell us about your project and we&rsquo;ll send a detailed quote — usually within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:512-706-9577" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-900 rounded-lg font-bold hover:bg-amber-50 transition">
              (512) 706-9577
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-amber-900 transition">
              Request Estimate Online
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
