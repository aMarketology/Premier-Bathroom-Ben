import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Walk-in Bath Texas | Safe Accessible Bathtubs | Premier Bathroom Remodel Texas',
  description: 'Premier walk-in bath installations across Texas. Safe, accessible bathing solutions for seniors and mobility concerns throughout Austin, Houston, Dallas, San Antonio, and more. ADA compliant. Call 512-492-2321.',
  keywords: 'walk-in bath Texas, walk-in tub Texas, accessible bathtub Texas, senior bathroom Texas, ADA compliant bath Texas, walk-in bath Austin, walk-in bath Houston, walk-in bath San Antonio',
  openGraph: {
    title: 'Walk-in Bath Installation in Texas | Premier Bathroom Remodel Texas',
    description: 'Safe, accessible walk-in baths for Texas seniors and individuals with mobility concerns. Serving Austin, Houston, Dallas, San Antonio, and more.',
    type: 'website',
  }
}

export default function WalkInBathAustinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

