import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Walk-in Bath Austin TX | Safe Accessible Bathtubs | Premier Bathroom',
  description: 'Premier walk-in bath installations in Austin, TX. Safe, accessible bathing solutions for seniors and mobility concerns. Low threshold entry, anti-slip flooring, ADA compliant. Call 512-706-9577.',
  keywords: 'walk-in bath Austin, walk-in tub Austin TX, accessible bathtub Austin, senior bathroom Austin, ADA compliant bath Austin, safe bathtub installation',
  openGraph: {
    title: 'Walk-in Bath Installation in Austin, TX',
    description: 'Safe, accessible walk-in baths for Austin seniors and individuals with mobility concerns.',
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
