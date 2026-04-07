import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Much Does Tile Installation Cost in Austin, TX? (2025 Guide) | Tile Pros Austin',
  description:
    'Complete 2025 price guide for tile installation in Austin TX — backsplash, bathroom, kitchen, and whole-home flooring costs with real price ranges from local contractors.',
  openGraph: {
    title: 'How Much Does Tile Installation Cost in Austin, TX? (2025 Guide)',
    description: 'Real price ranges for every tile project in Austin — backsplash to whole-home flooring.',
    url: 'https://tileprosaustin.com/blog/how-much-does-tile-installation-cost-in-austin',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
