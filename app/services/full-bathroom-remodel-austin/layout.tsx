import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Full Bathroom Remodel Austin TX | Complete Renovation Services',
  description: 'Professional full bathroom remodeling in Austin, TX. Complete renovation services including design, demolition, installation & finishing. Free consultation. Licensed & insured. Call (512) 492-2321.',
  keywords: 'full bathroom remodel Austin, complete bathroom renovation Austin TX, bathroom remodeling services Austin, custom bathroom design Austin, bathroom renovation contractors Austin',
  openGraph: {
    title: 'Full Bathroom Remodel Austin TX | Premier Bathroom Remodel',
    description: 'Transform your entire bathroom with a complete remodel from Austin\'s trusted experts. Custom design, quality materials, expert installation.',
    url: 'https://premierbathroomremodelaustin.com/services/full-bathroom-remodel-austin',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

