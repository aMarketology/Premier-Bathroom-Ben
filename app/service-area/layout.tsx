import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Service Areas | Texas Statewide | Premier Bathroom Remodel Texas',
  description: 'Premier Bathroom Remodel Texas serves Austin, Houston, Dallas, San Antonio, Fort Worth, Plano, Frisco, and 50+ Texas cities. Expert bathroom renovation services statewide. Call 512-492-2321.',
  keywords: 'bathroom remodeling Texas, bathroom renovation Texas cities, Austin bathroom remodeling, Houston bathroom remodeling, Dallas bathroom remodeling, San Antonio bathroom remodeling, Texas bathroom contractors',
  openGraph: {
    title: 'Bathroom Remodeling Service Areas — All of Texas | Premier Bathroom Remodel Texas',
    description: 'Professional bathroom remodeling services throughout Texas. Austin, Houston, Dallas, San Antonio, Fort Worth, and 50+ cities.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://premierbathroomremodelaustin.com/service-area',
  },
}

export default function ServiceAreaRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

