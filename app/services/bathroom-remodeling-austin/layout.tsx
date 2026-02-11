import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Austin TX | Expert Renovation Services | Premier Bathroom',
  description: 'Premier Bathroom Remodel Austin offers expert bathroom renovation services in Austin, TX. Custom designs, quality craftsmanship, and complete remodeling solutions. Call 512-492-2321 for a free quote.',
  keywords: 'bathroom remodeling Austin, bathroom renovation Austin TX, bathroom remodel near me, Austin bathroom contractors, custom bathroom design Austin',
  openGraph: {
    title: 'Professional Bathroom Remodeling in Austin, TX',
    description: 'Transform your bathroom with Austin\'s trusted remodeling experts. Free consultations available.',
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

