import type { Metadata } from 'next'
import { organizationSchema, servicesSchema, reviewSchema } from '@/lib/schema'
import './globals.css'

export const metadata: Metadata = {
  title: 'Champs Tile Austin TX | Professional Tile Installation & Flooring Services',
  description: 'Champs Tile - Austin\'s premier tile installation and flooring experts. Specializing in custom tile work, kitchen backsplashes, bathroom tiles, shower installations, and premium flooring. Licensed, insured, 15+ years experience. Call 512-706-9577 for free quote.',
  keywords: 'tile installation Austin TX, tile contractor Austin, flooring services Austin, kitchen backsplash Austin, bathroom tile Austin, shower tile installation, custom tile work Austin, ceramic tile Austin, porcelain tile Austin, tile flooring Austin, Champs Tile',
  metadataBase: new URL('https://champstile.com'),
  openGraph: {
    type: 'website',
    url: 'https://champstile.com',
    title: 'Champs Tile Austin TX | Expert Tile Installation & Flooring',
    description: 'Transform your space with Austin\'s trusted tile installation experts. Custom designs, quality craftsmanship, complete tile and flooring solutions.',
    siteName: 'Champs Tile Austin',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Champs Tile Austin TX',
    description: 'Expert tile installation and flooring services in Austin, TX. Free consultations available.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: '#57534e', // stone-600
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-verification" />
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
