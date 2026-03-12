import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shower Remodel Texas | Custom Walk-in Showers | Premier Bathroom Remodel Texas',
  description: 'Expert shower remodeling across Texas. Custom walk-in showers, frameless glass, rainfall heads, and spa-inspired designs. Serving Austin, Houston, Dallas, San Antonio, and more. Call 512-492-2321.',
  keywords: 'shower remodel Texas, shower remodel Austin, walk-in shower Texas, custom shower Texas, shower renovation Texas, frameless shower doors Texas, walk-in shower Houston, shower remodel Dallas',
  openGraph: {
    title: 'Custom Shower Remodeling in Texas | Premier Bathroom Remodel Texas',
    description: 'Modern walk-in showers, frameless glass, and spa-inspired designs for Texas homes. Serving Austin, Houston, Dallas, San Antonio, and more.',
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

