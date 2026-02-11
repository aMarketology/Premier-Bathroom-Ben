import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Areas | Bathroom Remodeling Austin & Greater Texas | Premier Bathroom',
  description: 'Premier Bathroom Remodel serves Austin, Round Rock, Cedar Park, Pflugerville, Georgetown, Lakeway, and more. Expert bathroom renovation services throughout the Greater Austin area.',
  keywords: 'bathroom remodeling Austin area, bathroom renovation Central Texas, Austin metro bathroom contractors, Greater Austin bathroom remodeling',
  openGraph: {
    title: 'Bathroom Remodeling Service Areas - Greater Austin, TX',
    description: 'Professional bathroom remodeling services throughout the Austin metro area and Central Texas.',
    type: 'website',
  }
}

export default function ServiceAreaRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

