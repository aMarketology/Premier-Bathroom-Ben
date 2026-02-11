import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Premier Bathroom Remodel Austin',
  description: 'Thank you for contacting Premier Bathroom Remodel Austin. We\'ll be in touch soon to discuss your bathroom remodeling project.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing thank you pages
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

