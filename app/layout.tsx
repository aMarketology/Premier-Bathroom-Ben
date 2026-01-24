import type { Metadata } from 'next'
import { organizationSchema, servicesSchema, reviewSchema } from '@/lib/schema'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Precision Flow | Engineering Marketplace',
  description: 'Global marketplace connecting engineering professionals with innovative products and services. CAD design, 3D modeling, engineering consulting, and more.',
  keywords: 'engineering marketplace, CAD design, 3D modeling, engineering services, engineering products, technical consulting, product development',
  metadataBase: new URL('https://projectprecisionflow.com'),
  openGraph: {
    type: 'website',
    url: 'https://projectprecisionflow.com',
    title: 'Project Precision Flow | Engineering Marketplace',
    description: 'Global marketplace connecting engineering professionals with innovative products and services.',
    siteName: 'Project Precision Flow',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Precision Flow',
    description: 'Engineering Marketplace - Connect, Collaborate, Create',
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
        <meta name="theme-color" content="#ff8c00" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
