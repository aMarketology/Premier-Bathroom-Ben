import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shower Remodel Austin TX | Custom Walk-in Showers | Premier Bathroom',
  description: 'Expert shower remodeling in Austin, TX. Custom walk-in showers, frameless glass, rainfall heads, and spa-inspired designs. Transform your shower today. Call 512-706-9577.',
  keywords: 'shower remodel Austin, walk-in shower Austin TX, custom shower Austin, shower renovation Austin, frameless shower doors Austin, rainfall shower Austin',
  openGraph: {
    title: 'Custom Shower Remodeling in Austin, TX',
    description: 'Modern walk-in showers, frameless glass, and spa-inspired designs for Austin homes.',
    type: 'website',
  }
}

export default function ShowerRemodelAustinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
