import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Tile Installation Blog | Tips & Guides | Champs Tile Austin',
  description: 'Expert tile installation tips, cost guides, and material advice for Austin homeowners. Learn what to expect from your tile project with Champs Tile.',
  keywords: 'tile installation blog Austin, tile cost guide Austin TX, tile contractor tips Austin, best tile Austin homes, Champs Tile blog',
  openGraph: {
    title: 'Tile Installation Blog | Champs Tile Austin',
    description: 'Expert tile tips, cost guides, and material advice for Austin homeowners from Champs Tile.',
    type: 'website',
    url: 'https://champstile.com/blog',
  },
}

const posts = [
  {
    slug: 'how-much-does-tile-installation-cost-in-austin',
    title: 'How Much Does Tile Installation Cost in Austin, TX? (2025 Guide)',
    excerpt: 'Real numbers on tile installation costs in Austin — kitchen backsplash, bathroom floors, shower tile, and full room flooring. See what drives prices and where to put your budget.',
    date: 'March 10, 2025',
    readTime: '5 min read',
    category: 'Costs & Budgeting',
  },
  {
    slug: 'how-long-does-tile-installation-take-in-austin',
    title: 'How Long Does Tile Installation Take? (Realistic Timelines for Austin Projects)',
    excerpt: 'A backsplash can be done in a day. A full bathroom tile job takes a week. Here\'s an honest breakdown of how long different tile projects take from demo to grout cure.',
    date: 'March 18, 2025',
    readTime: '4 min read',
    category: 'Planning & Timeline',
  },
  {
    slug: 'best-tile-for-austin-homes',
    title: 'Best Tile for Austin Homes: What Works in Texas\'s Heat and Humidity',
    excerpt: 'Not all tile performs equally in Central Texas. Austin\'s heat, humidity swings, and slab foundations affect what materials last longest. Here\'s what tile contractors actually recommend.',
    date: 'March 25, 2025',
    readTime: '5 min read',
    category: 'Materials & Design',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
            Tile Installation Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Austin Tile Installation Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practical guides, cost breakdowns, and material advice from Austin&apos;s tile installation specialists.
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
                className="border border-stone-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <span className="text-sm text-gray-400">· {post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-amber-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Tile Project?</h2>
          <p className="text-amber-200 mb-8">
            Get a free, no-pressure quote from Austin&apos;s trusted tile installation team.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
          >
            Get My Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
