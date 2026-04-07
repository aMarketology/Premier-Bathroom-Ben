'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function BestTileTypesAustin() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Tile Types for Austin Homes: Porcelain vs. Ceramic vs. Natural Stone',
    description: 'Compare porcelain, ceramic, and natural stone tile for Austin TX homes. Learn which material handles Texas heat and humidity best.',
    author: { '@type': 'Organization', name: 'Tile Pros Austin' },
    publisher: { '@type': 'Organization', name: 'Tile Pros Austin', url: 'https://tileprosaustin.com' },
    datePublished: '2025-01-26',
    dateModified: '2025-01-26',
    mainEntityOfPage: 'https://tileprosaustin.com/blog/best-tile-types-for-austin-homes',
  }

  const tiles = [
    {
      name: 'Porcelain',
      water: '< 0.5 % absorption',
      durability: 'Extremely high — rated for heavy commercial traffic',
      cost: '$3 – $8 / sq ft (material)',
      bestFor: 'Bathrooms, kitchens, entryways, outdoor patios',
      pros: ['Nearly waterproof', 'Scratch & stain resistant', 'Huge range of styles including wood-look planks', 'Handles Austin heat without expansion issues'],
      cons: ['Harder to cut — requires a wet saw', 'Heavier than ceramic — may need subfloor reinforcement upstairs'],
    },
    {
      name: 'Ceramic',
      water: '3 – 7 % absorption',
      durability: 'Moderate — best for lighter-traffic areas',
      cost: '$1 – $4 / sq ft (material)',
      bestFor: 'Backsplashes, guest bathrooms, laundry rooms, accent walls',
      pros: ['Most affordable option', 'Easy to cut and install', 'Wide variety of colors and patterns', 'Great for vertical surfaces and low-moisture areas'],
      cons: ['More porous — not ideal for shower floors', 'Chips more easily under heavy impact', 'PEI rating matters — choose Class 3+ for floors'],
    },
    {
      name: 'Natural Stone (Travertine, Marble, Slate)',
      water: 'Varies — travertine ~2 %, marble ~0.4 %, slate ~0.1 %',
      durability: 'High for slate; moderate for marble (scratches); moderate for travertine (pits)',
      cost: '$7 – $20+ / sq ft (material)',
      bestFor: 'Luxury bathrooms, feature walls, outdoor living areas, entryway floors',
      pros: ['Unique, natural beauty — no two tiles are alike', 'Increases home value', 'Travertine stays cool underfoot in Texas sun', 'Timeless aesthetic that never goes out of style'],
      cons: ['Requires periodic sealing (every 1 – 3 years)', 'Marble stains easily from acidic spills', 'Higher material and labor costs', 'Heavier — may need structural considerations'],
    },
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
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Best Tile Types for Austin Homes</h1>
            <p className="text-lg text-amber-100/80">Porcelain vs. Ceramic vs. Natural Stone — which one wins in Texas?</p>
            <p className="text-amber-100/70 mt-2">Published January 26, 2025 &middot; 8 min read</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-lg prose-stone max-w-none">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Austin&rsquo;s climate throws a lot at your floors: triple-digit summer heat, sudden
              rainstorms, expansive clay soil that shifts your foundation, and high foot traffic from
              an active household. The tile you choose has to handle all of it. Here&rsquo;s how the
              three most popular options stack up for Central Texas living.
            </p>

            {/* Tile comparison cards */}
            {tiles.map((tile, i) => (
              <motion.div
                key={tile.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-12 rounded-xl border border-stone-200 overflow-hidden"
              >
                <div className="bg-amber-800 text-white px-6 py-4">
                  <h2 className="text-2xl font-bold m-0">{tile.name}</h2>
                </div>
                <div className="p-6 space-y-4 bg-stone-50">
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block font-semibold text-gray-900">Water Absorption</span>
                      <span className="text-gray-600">{tile.water}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-900">Durability</span>
                      <span className="text-gray-600">{tile.durability}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-900">Material Cost</span>
                      <span className="text-amber-800 font-semibold">{tile.cost}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-900 text-sm">Best For</span>
                    <span className="text-gray-600 text-sm">{tile.bestFor}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h3 className="text-sm font-bold text-green-700 mb-2">Pros</h3>
                      <ul className="space-y-1">
                        {tile.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-red-700 mb-2">Cons</h3>
                      <ul className="space-y-1">
                        {tile.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Which Tile Works Best Room-by-Room?</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Bathroom Floors &amp; Showers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Winner: Porcelain.</strong> Its near-zero water absorption makes it the safest
              choice for wet areas. Choose a matte or textured finish for slip resistance. If you
              want a luxury look, large-format porcelain slabs minimize grout lines and simplify
              cleaning.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Kitchen Floors</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Winner: Porcelain or high-PEI ceramic.</strong> Kitchens see heavy traffic,
              dropped pans, and spills. Porcelain wood-look planks give you the warmth of hardwood
              without the moisture risk. Ceramic rated PEI Class 4+ also holds up well.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Kitchen Backsplashes</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Winner: Ceramic or glass mosaic.</strong> Vertical surfaces don&rsquo;t take
              foot traffic, so durability matters less. This is where you can save money with ceramic
              or get creative with glass, metal, or patterned tiles.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Outdoor Patios &amp; Pool Decks</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Winner: Porcelain (outdoor-rated) or travertine.</strong> Austin&rsquo;s
              summers push surface temps above 150 °F. Travertine naturally stays cooler than most
              options. Porcelain pavers rated for exterior use resist freeze-thaw and UV fading.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Entryways &amp; Living Areas</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              <strong>Winner: Porcelain or natural stone.</strong> First impressions matter. A polished
              marble entryway or large-format porcelain floor makes a statement. Just remember: marble
              needs annual sealing, while porcelain is virtually maintenance-free.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Austin-Specific Tips</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li><strong>Clay soil movement:</strong> Austin sits on expansive clay that swells when
                wet and shrinks when dry. This can stress rigid tile installations. A proper
                crack-isolation membrane (like Schluter DITRA) absorbs substrate movement and
                prevents cracked tiles.</li>
              <li><strong>Radiant heat:</strong> Central Texas homes rarely need heated floors, but if
                you want the option, porcelain and stone conduct heat better than ceramic.</li>
              <li><strong>Allergen reduction:</strong> Tile is one of the best flooring choices for
                allergy sufferers — it doesn&rsquo;t trap pollen, dust mites, or pet dander like
                carpet does.</li>
              <li><strong>Resale value:</strong> Updated tile floors and showers are among the top
                features Austin buyers look for, especially in neighborhoods like Tarrytown, Zilker,
                Mueller, and Circle C.</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Let Tile Pros Austin Help You Choose</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Still not sure which tile material is right for your space? Our team walks you through
              samples, explains real-world performance for Central Texas conditions, and gives you a
              transparent quote — no pressure, no hidden add-ons. We&rsquo;ve installed tile in
              hundreds of Austin-area homes and know exactly what works (and what doesn&rsquo;t) in
              this climate.
            </p>
          </motion.div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-amber-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Tile?</h2>
          <p className="text-amber-100/80 mb-8">Call us for a free consultation — we&rsquo;ll bring samples to your home.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:512-706-9577" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-900 rounded-lg font-bold hover:bg-amber-50 transition">
              (512) 706-9577
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-amber-900 transition">
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
