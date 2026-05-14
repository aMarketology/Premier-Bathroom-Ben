import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { organizationSchema, servicesSchema, reviewSchema } from '@/lib/schema'
import StickyCallBar from './components/StickyCallBar'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
        {/* Google tag (gtag.js) — GA4 + Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-45B5X6PQ1F"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // GA4 property
            gtag('config', 'G-45B5X6PQ1F', {
              page_path: window.location.pathname,
            });

            // Google Ads conversion tracking
            // TODO: Replace AW-CONVERSION_ID with your actual Google Ads account ID
            gtag('config', 'AW-CONVERSION_ID');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <StickyCallBar />
        {children}
      </body>
    </html>
  )
}
