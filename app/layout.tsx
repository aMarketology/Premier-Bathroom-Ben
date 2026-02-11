import type { Metadata } from 'next'
import { organizationSchema, servicesSchema, reviewSchema } from '@/lib/schema'
import FloatingContactButton from './components/FloatingContactButton'
import AnalyticsProvider from './components/AnalyticsProvider'
import './globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Premier Bathroom Remodel Austin | Expert Bathroom Renovation Services',
  description: 'Premier bathroom remodeling services in Austin, TX. Specializing in bathroom renovations, walk-in baths, shower remodels, and tub to shower conversions. Licensed, insured, 15+ years experience. Call 512-492-2321 for free quote.',
  keywords: 'bathroom remodeling Austin, bathroom renovation Austin TX, walk-in bath Austin, shower remodel Austin, tub to shower conversion, Austin bathroom contractors, bathroom design Austin',
  metadataBase: new URL('https://premierbathroomremodelaustin.com'),
  openGraph: {
    type: 'website',
    url: 'https://premierbathroomremodelaustin.com',
    title: 'Premier Bathroom Remodel Austin | Expert Bathroom Renovation',
    description: 'Transform your bathroom with Austin\'s trusted remodeling experts. Custom designs, quality craftsmanship, complete bathroom solutions.',
    siteName: 'Premier Bathroom Remodel Austin',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premier Bathroom Remodel Austin',
    description: 'Expert bathroom remodeling services in Austin, TX. Free consultations available.',
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-45B5X6PQ1F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-45B5X6PQ1F');
            `,
          }}
        />
        
        {/* Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17861557264"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17861557264');
            `,
          }}
        />
        
        {/* Google Ads Conversion Tracking Helper */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtagSendEvent(url) {
                var callback = function () {
                  if (typeof url === 'string') {
                    window.location = url;
                  }
                };
                gtag('event', 'ads_conversion_Contact_Us_1', {
                  'event_callback': callback,
                  'event_timeout': 2000,
                });
                return false;
              }
            `,
          }}
        />
        
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
        {/* Elfsight All-in-One Reviews */}
        <script src="https://elfsightcdn.com/platform.js" async></script>
      </head>
      <body>
        <AnalyticsProvider>
          {children}
          <FloatingContactButton />
        </AnalyticsProvider>
      </body>
    </html>
  )
}

