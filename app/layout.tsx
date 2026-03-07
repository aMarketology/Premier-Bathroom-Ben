import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { organizationSchema, servicesSchema, reviewSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#0ea5e9', // sky-500 — Tile Pros Austin light blue
}

export const metadata: Metadata = {
  title: 'Tile Pros Austin TX | Expert Tile Installation & Bathroom Remodeling',
  description: 'Tile Pros Austin — expert tile installation, bathroom remodeling, shower tile, kitchen backsplash, and flooring services in Austin TX. Licensed & insured. Call (512) 706-9577 for a free quote.',
  keywords: 'tile installation Austin TX, tile contractor Austin, bathroom remodel Austin, shower tile Austin, kitchen backsplash Austin, floor tile Austin, Tile Pros Austin',
  metadataBase: new URL('https://tileprosaustin.com'),
  openGraph: {
    type: 'website',
    url: 'https://tileprosaustin.com',
    title: 'Tile Pros Austin TX | Expert Tile Installation & Bathroom Remodeling',
    description: 'Expert tile installation and bathroom remodeling in Austin TX. Free quotes, licensed & insured.',
    siteName: 'Tile Pros Austin',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tile Pros Austin TX',
    description: 'Expert tile installation & bathroom remodeling — Austin TX. Call (512) 706-9577.',
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
    <html lang="en" className={inter.variable}>
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
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
