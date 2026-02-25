import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Services Austin TX | Premier Bathroom Remodel',
  description:
    'Premier Bathroom Remodel Austin offers complete bathroom remodeling, shower remodels, tub-to-shower conversions, walk-in baths, vanity installation, and ADA-accessible upgrades in Austin, TX and surrounding areas. Call 512-492-2321 for a free quote.',
  keywords: [
    'bathroom remodeling Austin TX',
    'shower remodel Austin',
    'tub to shower conversion Austin',
    'walk in bath Austin',
    'bathroom renovation Austin',
    'bathroom contractor Austin',
    'custom shower Austin',
    'frameless shower doors Austin',
    'ADA bathroom remodel Austin',
    'vanity installation Austin',
    'tile work Austin',
    'bathroom near me Austin',
  ],
  alternates: {
    canonical: 'https://premierbathroomremodelaustin.com/services',
  },
  openGraph: {
    title: 'Bathroom Remodeling Services Austin TX | Premier Bathroom Remodel',
    description:
      'Expert bathroom remodeling in Austin, TX. Shower remodels, tub conversions, walk-in baths, tile work & more. Licensed & insured. Free quotes — call 512-492-2321.',
    url: 'https://premierbathroomremodelaustin.com/services',
    siteName: 'Premier Bathroom Remodel Austin',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://premierbathroomremodelaustin.com/IMG_0387 Ben.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bathroom Remodeling Services Austin TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bathroom Remodeling Services Austin TX | Premier Bathroom Remodel',
    description:
      'Expert bathroom remodeling in Austin, TX — shower remodels, tub conversions, walk-in baths & more. Free quotes!',
    images: ['https://premierbathroomremodelaustin.com/IMG_0387 Ben.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bathroom Remodeling Services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Premier Bathroom Remodel Austin',
    url: 'https://premierbathroomremodelaustin.com',
    telephone: '512-492-2321',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2672,
      longitude: -97.7431,
    },
    areaServed: [
      'Austin, TX',
      'Round Rock, TX',
      'Cedar Park, TX',
      'Pflugerville, TX',
      'West Lake Hills, TX',
      'Bee Cave, TX',
      'Rollingwood, TX',
      'Manchaca, TX',
      'Georgetown, TX',
      'Lakeway, TX',
      'Dripping Springs, TX',
      'Leander, TX',
      'Kyle, TX',
    ],
    priceRange: '$$',
    image: 'https://premierbathroomremodelaustin.com/IMG_0387 Ben.jpeg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '47',
    },
  },
  serviceType: [
    'Bathroom Remodeling',
    'Shower Remodel',
    'Tub to Shower Conversion',
    'Walk-in Bath Installation',
    'Bathroom Vanity Installation',
    'Tile Work',
    'ADA Bathroom Modifications',
    'Frameless Shower Doors',
  ],
  description:
    'Complete bathroom remodeling services in Austin TX including shower remodels, tub-to-shower conversions, walk-in baths, vanity design, tile work, and ADA accessibility upgrades.',
  url: 'https://premierbathroomremodelaustin.com/services',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
