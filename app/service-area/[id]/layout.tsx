import { Metadata } from 'next'

// City name map for metadata generation — matches page.tsx serviceAreas keys
const cityNames: Record<string, string> = {
  austin: 'Austin', 'round-rock': 'Round Rock', 'cedar-park': 'Cedar Park',
  pflugerville: 'Pflugerville', 'west-lake-hills': 'West Lake Hills', 'bee-cave': 'Bee Cave',
  rollingwood: 'Rollingwood', manchaca: 'Manchaca', georgetown: 'Georgetown',
  lakeway: 'Lakeway', 'dripping-springs': 'Dripping Springs', leander: 'Leander',
  kyle: 'Kyle', buda: 'Buda', 'san-marcos': 'San Marcos', 'new-braunfels': 'New Braunfels',
  houston: 'Houston', 'the-woodlands': 'The Woodlands', 'sugar-land': 'Sugar Land',
  pearland: 'Pearland', katy: 'Katy', dallas: 'Dallas', 'fort-worth': 'Fort Worth',
  arlington: 'Arlington', plano: 'Plano', garland: 'Garland', irving: 'Irving',
  frisco: 'Frisco', mckinney: 'McKinney', denton: 'Denton', 'san-antonio': 'San Antonio',
  'el-paso': 'El Paso', 'corpus-christi': 'Corpus Christi', lubbock: 'Lubbock',
  amarillo: 'Amarillo', waco: 'Waco', midland: 'Midland', odessa: 'Odessa',
  abilene: 'Abilene', tyler: 'Tyler', 'wichita-falls': 'Wichita Falls',
  beaumont: 'Beaumont', mcallen: 'McAllen', laredo: 'Laredo',
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const city = cityNames[params.id] ?? params.id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `Bathroom Remodeling ${city}, TX | Premier Bathroom Remodel Texas`,
    description: `Expert bathroom remodeling in ${city}, TX. Walk-in showers, tub to shower conversions, walk-in baths, full renovations, and vanity upgrades. Licensed & insured. Call 512-492-2321 for a free quote.`,
    keywords: `bathroom remodeling ${city}, bathroom renovation ${city} TX, shower remodel ${city}, walk-in bath ${city}, tub to shower conversion ${city}, bathroom contractor ${city} Texas`,
    openGraph: {
      title: `Bathroom Remodeling in ${city}, TX | Premier Bathroom Remodel Texas`,
      description: `Transform your ${city} bathroom with Texas\'s trusted remodeling experts. Free consultations. Call 512-492-2321.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://premierbathroomremodelaustin.com/service-area/${params.id}`,
    },
  }
}

export default function ServiceAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
