'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const posts = [
  {
    slug: 'how-much-does-tile-installation-cost-in-austin',
    title: 'How Much Does Tile Installation Cost in Austin, TX? (2025 Price Guide)',
    excerpt:
      'Full cost breakdown for tile installation projects in Austin — backsplashes, bathroom tile, kitchen floors, and whole-home flooring. See real price ranges so you can budget with confidence.',
    date: 'January 12, 2025',
  },
  {
    slug: 'best-tile-types-for-austin-homes',
    title: 'Best Tile Types for Austin Homes: Porcelain vs. Ceramic vs. Natural Stone',
    excerpt:
      'Not every tile handles Texas heat and humidity the same way. Compare porcelain, ceramic, and natural stone to find the best fit for your Austin home.',
    date: 'January 26, 2025',
  },
  {
    slug: 'how-long-does-bathroom-remodel-take-austin',
    title: 'How Long Does a Bathroom Remodel Take in Austin? (Realistic Timeline)',
    excerpt:
      'From demo to final walk-through — here is exactly how long each phase of a bathroom remodel takes in Austin, plus the common delays and how to avoid them.',
    date: 'February 8, 2025',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-700/30 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">Tile Pros Austin Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Tile &amp; Remodeling Insights</h1>
            <p className="text-lg md:text-xl text-amber-100/80 max-w-2xl mx-auto">
              Expert advice on tile installation, bathroom remodeling, and flooring — straight from Austin&rsquo;s most trusted tile contractors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-10">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block p-8 rounded-2xl border border-stone-200 bg-white hover:shadow-xl transition-all duration-300">
                <time className="text-sm text-stone-500">{post.date}</time>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{post.title}</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-amber-700 font-semibold text-sm group-hover:gap-2 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-amber-100/80 mb-8">Call us today or request a free estimate online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:512-706-9577" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-900 rounded-lg font-bold hover:bg-amber-50 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              (512) 706-9577
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-amber-900 transition">
              Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
