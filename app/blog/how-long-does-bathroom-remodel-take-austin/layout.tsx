import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Long Does a Bathroom Remodel Take in Austin? (Realistic Timeline) | Tile Pros Austin',
  description:
    'Realistic 2025 bathroom remodel timeline for Austin TX — from demo day to final walk-through. Learn what to expect at every phase and how to avoid common delays.',
  openGraph: {
    title: 'How Long Does a Bathroom Remodel Take in Austin? (Realistic Timeline)',
    description: 'Phase-by-phase bathroom remodel timeline from Austin contractors who do this every day.',
    url: 'https://tileprosaustin.com/blog/how-long-does-bathroom-remodel-take-austin',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
