import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Texas | Expert Renovation Services | Premier Bathroom Remodel Texas',
  description: 'Premier Bathroom Remodel Texas offers expert bathroom renovation services across the state. Serving Austin, Houston, Dallas, San Antonio, Fort Worth, and more. Custom designs, quality craftsmanship. Call 512-492-2321 for a free quote.',
  keywords: 'bathroom remodeling Texas, bathroom renovation Texas, bathroom remodel Austin, bathroom remodel Houston, bathroom remodel Dallas, bathroom remodel San Antonio, Texas bathroom contractors, custom bathroom design Texas',
  openGraph: {
    title: 'Professional Bathroom Remodeling in Texas | Premier Bathroom Remodel Texas',
    description: 'Transform your bathroom with Texas\'s trusted remodeling experts. Serving Austin, Houston, Dallas, San Antonio, and 50+ cities. Free consultations available.',
    type: 'website',
  }
}

export default function BathroomRemodelingAustinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

