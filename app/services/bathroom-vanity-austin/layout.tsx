import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bathroom Vanity Installation Austin TX | Custom Vanities',
  description: 'Expert bathroom vanity installation in Austin, TX. Single & double sink vanities, floating designs, premium countertops. Free quotes. Licensed & insured. Call (512) 492-2321.',
  keywords: 'bathroom vanity installation Austin, custom bathroom vanity Austin TX, vanity replacement Austin, double sink vanity Austin, floating vanity installation Austin',
  openGraph: {
    title: 'Bathroom Vanity Installation Austin TX | Premier Bathroom Remodel',
    description: 'Upgrade your bathroom with expert vanity installation. Custom designs, quality materials, professional service.',
    url: 'https://premierbathroomremodelaustin.com/services/bathroom-vanity-austin',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

