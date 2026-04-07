import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Tile Types for Austin Homes: Porcelain vs. Ceramic vs. Natural Stone | Tile Pros Austin',
  description:
    'Compare porcelain, ceramic, and natural stone tile for Austin TX homes. Learn which tile material handles Texas heat, humidity, and heavy foot traffic best.',
  openGraph: {
    title: 'Best Tile Types for Austin Homes: Porcelain vs. Ceramic vs. Natural Stone',
    description: 'Which tile material is best for Texas heat and humidity? Compare your top options.',
    url: 'https://tileprosaustin.com/blog/best-tile-types-for-austin-homes',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
