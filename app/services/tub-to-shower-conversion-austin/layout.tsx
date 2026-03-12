import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tub to Shower Conversion Texas | One Day Install | Premier Bathroom Remodel Texas',
  description: 'Convert your bathtub to a walk-in shower anywhere in Texas. Quick 1-day installation, increased space, modern design. Serving Austin, Houston, Dallas, San Antonio, and more. Call 512-492-2321.',
  keywords: 'tub to shower conversion Texas, bathtub removal Texas, shower conversion Texas, replace tub with shower Texas, tub to shower conversion Austin, tub to shower conversion Houston, tub to shower Dallas',
  openGraph: {
    title: 'Tub to Shower Conversion in Texas | Premier Bathroom Remodel Texas',
    description: 'Fast 1-day bathtub to shower conversions across Texas. Serving Austin, Houston, Dallas, San Antonio, and more.',
    type: 'website',
  }
}

export default function TubToShowerConversionAustinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

