import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Blog | Tips & Guides | Premier Bathroom Remodel Austin',
  description: 'Expert bathroom remodeling tips, cost guides, and project timelines for Austin homeowners. Learn what to expect from your bathroom renovation in Austin, TX.',
  keywords: 'bathroom remodeling blog Austin, bathroom renovation tips Austin, bathroom remodel cost Austin, bathroom remodel guide Texas',
  openGraph: {
    title: 'Bathroom Remodeling Blog | Premier Bathroom Remodel Austin',
    description: 'Expert bathroom remodeling tips, cost guides, and project timelines for Austin homeowners.',
    type: 'website',
    url: 'https://premierbathroomremodelaustin.com/blog',
  },
}

const posts = [
  {
    slug: 'how-much-does-a-bathroom-remodel-cost-in-austin',
    title: 'How Much Does a Bathroom Remodel Cost in Austin, TX? (2025 Guide)',
    excerpt: 'Get real numbers on bathroom remodeling costs in Austin — from a simple refresh to a full luxury renovation. We break down what drives prices and where to invest your budget.',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Costs & Budgeting',
  },
  {
    slug: 'how-long-does-a-bathroom-remodel-take-in-austin',
    title: 'How Long Does a Bathroom Remodel Take in Austin? (Realistic Timelines)',
    excerpt: 'Wondering how long you\'ll be without your bathroom? Here\'s a realistic week-by-week breakdown of a bathroom remodel in Austin, from demo day to final walkthrough.',
    date: 'March 22, 2025',
    readTime: '4 min read',
    category: 'Planning & Timeline',
  },
  {
    slug: 'does-a-bathroom-remodel-add-value-to-your-home-in-austin',
    title: 'Does a Bathroom Remodel Add Value to Your Home in Austin?',
    excerpt: 'Austin\'s hot real estate market means bathroom upgrades can pay off big. Find out what ROI to expect and which upgrades deliver the most value for Austin homeowners.',
    date: 'March 29, 2025',
    readTime: '4 min read',
    category: 'Home Value & ROI',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Bathroom Remodeling Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Austin Bathroom Remodeling Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practical guides, cost breakdowns, and expert tips from Austin&apos;s bathroom remodeling specialists.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <span className="text-sm text-gray-400">· {post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Remodel?</h2>
          <p className="text-gray-300 mb-8">
            Get a free, no-pressure quote from Austin&apos;s trusted bathroom remodeling team.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            Get My Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
