import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Full Bathroom Remodel Texas | Complete Renovation Services | Premier Bathroom Remodel Texas',
  description: 'Professional full bathroom remodeling across Texas. Complete renovation services including design, demolition, installation & finishing. Serving Austin, Houston, Dallas, San Antonio, and more. Free consultation. Call (512) 492-2321.',
  keywords: 'full bathroom remodel Texas, complete bathroom renovation Texas, bathroom remodeling services Texas, full bathroom remodel Austin, full bathroom remodel Houston, full bathroom remodel Dallas, Texas bathroom renovation contractors',
  openGraph: {
    title: 'Full Bathroom Remodel Texas | Premier Bathroom Remodel Texas',
    description: 'Transform your entire Texas bathroom with a complete remodel from trusted statewide experts. Serving Austin, Houston, Dallas, San Antonio, and more.',
    url: 'https://premierbathroomremodelaustin.com/services/full-bathroom-remodel-austin',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

