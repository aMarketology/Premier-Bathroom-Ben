import { notFound } from 'next/navigation'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'

const serviceAreas: Record<string, { name: string; description: string }> = {
  austin: { name: 'Austin', description: 'Premier bathroom remodeling services in Austin, TX.' },
  'round-rock': { name: 'Round Rock', description: 'Expert bathroom renovations in Round Rock, TX.' },
  'cedar-park': { name: 'Cedar Park', description: 'Quality bathroom remodeling in Cedar Park, TX.' },
  pflugerville: { name: 'Pflugerville', description: 'Top-rated bathroom remodels in Pflugerville, TX.' },
  'west-lake-hills': { name: 'West Lake Hills', description: 'Luxury bathroom renovations in West Lake Hills, TX.' },
  'bee-cave': { name: 'Bee Cave', description: 'Beautiful bathroom transformations in Bee Cave, TX.' },
  rollingwood: { name: 'Rollingwood', description: 'Premium bathroom remodeling in Rollingwood, TX.' },
  manchaca: { name: 'Manchaca', description: 'Expert bathroom renovations in Manchaca, TX.' },
  georgetown: { name: 'Georgetown', description: 'Quality bathroom remodeling in Georgetown, TX.' },
  lakeway: { name: 'Lakeway', description: 'Top-rated bathroom remodels in Lakeway, TX.' },
  'dripping-springs': { name: 'Dripping Springs', description: 'Premier bathroom renovations in Dripping Springs, TX.' },
  leander: { name: 'Leander', description: 'Expert bathroom remodeling in Leander, TX.' },
  kyle: { name: 'Kyle', description: 'Quality bathroom transformations in Kyle, TX.' },
}

export async function generateStaticParams() {
  return Object.keys(serviceAreas).map((id) => ({ id }))
}

export default function ServiceAreaPage({ params }: { params: { id: string } }) {
  const area = serviceAreas[params.id]
  if (!area) notFound()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bathroom Remodeling in {area.name}
          </h1>
          <p className="text-xl text-gray-600 mb-10">{area.description}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            Get a Free Quote
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
