import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'How Long Does Tile Installation Take? Realistic Austin Timelines',
  description: 'A kitchen backsplash can be done in a day. A full shower tile job takes a week. Here\'s an honest timeline breakdown for every type of tile project in Austin, TX.',
  keywords: 'how long tile installation Austin, tile installation timeline Austin TX, how many days does tile take, tile project duration Austin, tile installation schedule Austin',
  openGraph: {
    title: 'How Long Does Tile Installation Take? Realistic Austin Timelines',
    description: 'Honest project timelines for every tile job — backsplash to full bathroom — from an Austin tile contractor.',
    type: 'article',
    url: 'https://champstile.com/blog/how-long-does-tile-installation-take-in-austin',
    publishedTime: '2025-03-18',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Long Does Tile Installation Take? Realistic Timelines for Austin Projects',
  description: 'Realistic tile installation timelines for Austin homeowners.',
  datePublished: '2025-03-18',
  dateModified: '2025-03-18',
  author: {
    '@type': 'Organization',
    name: 'Champs Tile',
    url: 'https://champstile.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Champs Tile',
    logo: {
      '@type': 'ImageObject',
      url: 'https://champstile.com/og-image.jpg',
    },
  },
  url: 'https://champstile.com/blog/how-long-does-tile-installation-take-in-austin',
  mainEntityOfPage: 'https://champstile.com/blog/how-long-does-tile-installation-take-in-austin',
}

export default function BlogPostTileTimeline() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-amber-700">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-amber-700">Blog</Link>
            <span>›</span>
            <span className="text-gray-800">Tile Installation Timeline Austin</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wide mb-4">
              Planning & Timeline
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              How Long Does Tile Installation Take in Austin?
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>March 18, 2025</span>
              <span>·</span>
              <span>By Champs Tile Austin</span>
              <span>·</span>
              <span>4 min read</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none">

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              One of the most common questions we get before a tile project starts is simply: <strong>"How long is this going to take?"</strong> It&apos;s a fair question — especially when the work involves your kitchen or bathroom. The honest answer varies a lot by project type. Here&apos;s a realistic breakdown from the Champs Tile crew, based on actual jobs we complete in Austin every week.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Quick Reference: Tile Installation Timelines</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-amber-700 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Project Type</th>
                    <th className="text-left p-3">Typical Duration</th>
                    <th className="text-left p-3 rounded-tr-lg">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-medium">Kitchen backsplash</td>
                    <td className="p-3 text-green-700 font-semibold">1 – 2 days</td>
                    <td className="p-3 text-gray-600">Mostly a single installer; grout cure is the limiting factor</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="p-3 font-medium">Bathroom floor tile</td>
                    <td className="p-3 text-yellow-700 font-semibold">2 – 4 days</td>
                    <td className="p-3 text-gray-600">Includes prep, set, cure, grout, and final seal</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-medium">Shower tile (walls + floor)</td>
                    <td className="p-3 text-orange-700 font-semibold">5 – 8 days</td>
                    <td className="p-3 text-gray-600">Waterproofing adds a required full cure day before setting</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="p-3 font-medium">Large room floor tile</td>
                    <td className="p-3 text-orange-700 font-semibold">3 – 6 days</td>
                    <td className="p-3 text-gray-600">Depends on sq footage and layout pattern</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Full bathroom tile (floor + full shower)</td>
                    <td className="p-3 text-red-700 font-semibold">7 – 12 days</td>
                    <td className="p-3 text-gray-600">Concurrent work where possible; demo adds 1–2 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why Tile Takes the Time It Does</h2>
            <p className="text-gray-700 mb-6">
              Unlike painting or cabinet installation, tile work is ruled by chemistry. You can&apos;t rush mortar cure time, you can&apos;t walk on a freshly set floor, and you can&apos;t skip waterproofing cure in a shower. Here&apos;s what each phase actually involves:
            </p>

            <div className="space-y-5 mb-10">
              {[
                {
                  phase: 'Phase 1',
                  title: 'Demo & Substrate Prep',
                  desc: 'Old tile comes out. This is louder and dustier than most homeowners expect. Once demo is done, the subfloor or wall substrate is inspected. Any soft spots, mold, or unlevel areas get addressed before anything goes down. Rushing this step causes future tile failures — we never skip it.',
                },
                {
                  phase: 'Phase 2',
                  title: 'Waterproofing (shower only)',
                  desc: 'Shower pans and walls require a waterproof membrane before any tile is set. Whether we use a sheet membrane, liquid-applied system, or foam board, it needs a full cure — typically 24 hours minimum — before setting tile on top. This is non-negotiable for a leak-free shower.',
                },
                {
                  phase: 'Phase 3',
                  title: 'Layout & Tile Setting',
                  desc: 'We dry-lay the tile first to confirm the pattern and adjust for cuts. Then mortar goes down in sections, tiles are set with proper spacing, and the layout is checked continuously for level and plumb. Large-format tiles and complex patterns take measurably longer — a 24×48 porcelain job takes roughly twice as long as standard 12×12.',
                },
                {
                  phase: 'Phase 4',
                  title: 'Mortar Cure',
                  desc: 'Once all tile is set, the mortar needs time to cure before the floor can be used or grouted. Standard thinset takes 24 hours; some situations call for modified thinsets with longer cure windows. Walking on tile too early — even lightly — causes lippage and cracked grout.',
                },
                {
                  phase: 'Phase 5',
                  title: 'Grouting & Sealing',
                  desc: 'Grout joints are filled, the tile is cleaned of haze, and sealers are applied where appropriate — particularly on natural stone and unglazed tile. Grout itself needs 24–72 hours before the area sees regular use, depending on the product.',
                },
              ].map((phase) => (
                <div key={phase.phase} className="flex gap-5 p-5 bg-stone-50 rounded-xl">
                  <div className="flex-shrink-0 w-20 text-center">
                    <span className="inline-block px-2 py-1 bg-amber-700 text-white text-xs font-bold rounded-lg">{phase.phase}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{phase.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What Causes Tile Projects to Run Long</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <span className="text-amber-700 font-bold mt-1">▸</span>
                <span><strong className="text-gray-900">Material not on-site at start</strong> — If tile is still in transit when demo begins, the whole job sits idle. We always confirm delivery before scheduling a start date.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-700 font-bold mt-1">▸</span>
                <span><strong className="text-gray-900">Substrate surprises</strong> — Old homes in Austin — particularly those built in the 1970s–90s — sometimes hide moisture damage, deteriorated backer board, or unlevel slabs that add a day or two of repair work before tile can go down.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-700 font-bold mt-1">▸</span>
                <span><strong className="text-gray-900">Scope changes mid-job</strong> — Adding a niche, extending the tile higher on a wall, or switching tile mid-project all reset portions of the timeline. Locked-in decisions before demo day keep things on track.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-700 font-bold mt-1">▸</span>
                <span><strong className="text-gray-900">Austin heat in summer</strong> — High indoor temperatures accelerate mortar set time, which means smaller working sections. We adjust our mortar mix and staging accordingly for summer projects.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Keep Your Tile Project on Schedule</h2>
            <ol className="space-y-2 mb-8 list-decimal list-inside text-gray-700">
              <li>Have all tile, grout, and materials delivered at least one day before start.</li>
              <li>Make all design decisions — pattern, grout color, niche layout — before demo day.</li>
              <li>Plan bathroom access if we&apos;re tiling your only shower; projects typically finish in under 2 weeks.</li>
              <li>Be reachable for any substrate or layout questions that arise during demo.</li>
              <li>Don&apos;t use the newly tiled space before we give you the all-clear — mortar and grout cure times are real.</li>
            </ol>

          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-amber-800 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Let&apos;s Build Your Project Timeline</h3>
            <p className="text-amber-200 mb-6">We&apos;ll give you a clear schedule and written quote — free, no pressure.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              Schedule My Free Estimate
            </Link>
          </div>

          {/* Related Posts */}
          <div className="mt-14">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/blog/how-much-does-tile-installation-cost-in-austin"
                className="block p-5 border border-stone-100 rounded-xl hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Costs & Budgeting</span>
                <p className="font-semibold text-gray-900 mt-1">How Much Does Tile Installation Cost in Austin? (2025)</p>
              </Link>
              <Link
                href="/blog/best-tile-for-austin-homes"
                className="block p-5 border border-stone-100 rounded-xl hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Materials & Design</span>
                <p className="font-semibold text-gray-900 mt-1">Best Tile for Austin Homes: What Works in Texas&apos;s Climate</p>
              </Link>
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </div>
  )
}
