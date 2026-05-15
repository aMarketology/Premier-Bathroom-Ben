import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Tile Installation Austin TX | Premier Bathroom Remodel',
  description: 'Expert bathroom tile installation in Austin TX. Shower tile, floor tile, backsplash, natural stone & more. Local tile contractors with 200+ installs. Free quote — call 512-706-9577.',
  keywords: [
    'tile work Austin TX',
    'bathroom tile installation Austin',
    'shower tile Austin',
    'floor tile Austin',
    'tile contractors Austin TX',
    'backsplash installation Austin',
    'natural stone tile Austin',
    'tile remodel Austin',
  ],
  openGraph: {
    title: 'Bathroom Tile Installation Austin TX | Premier Bathroom Remodel',
    description: 'Expert bathroom tile installation in Austin TX. Free in-home quote. Call 512-706-9577.',
    url: 'https://www.premierremodelaustin.com/services/tile-work-austin',
    siteName: 'Premier Bathroom Remodel',
    locale: 'en_US',
    type: 'website',
  },
}

export default function TileWorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
