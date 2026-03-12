import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Vanity Installation Texas | Custom Vanities | Premier Bathroom Remodel Texas',
  description: 'Expert bathroom vanity installation across Texas. Single & double sink vanities, floating designs, premium countertops. Serving Austin, Houston, Dallas, San Antonio, and more. Call (512) 492-2321.',
  keywords: 'bathroom vanity installation Texas, custom bathroom vanity Texas, vanity replacement Texas, vanity installation Austin, vanity installation Houston, vanity installation Dallas, floating vanity Texas',
  openGraph: {
    title: 'Bathroom Vanity Installation Texas | Premier Bathroom Remodel Texas',
    description: 'Upgrade your Texas bathroom with expert vanity installation. Custom designs, quality materials, professional service statewide.',
    url: 'https://premierbathroomremodelaustin.com/services/bathroom-vanity-austin',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

