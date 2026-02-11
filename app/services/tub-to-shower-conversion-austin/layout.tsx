import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tub to Shower Conversion Austin TX | One Day Install | Premier Bathroom',
  description: 'Convert your bathtub to a walk-in shower in Austin, TX. Quick 1-day installation, increased space, modern design. Licensed professionals. Call 512-492-2321 for free quote.',
  keywords: 'tub to shower conversion Austin, bathtub removal Austin TX, shower conversion Austin, replace tub with shower Austin, walk-in shower conversion',
  openGraph: {
    title: 'Tub to Shower Conversion in Austin, TX',
    description: 'Fast 1-day bathtub to shower conversions. Increase space and accessibility in your Austin bathroom.',
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

