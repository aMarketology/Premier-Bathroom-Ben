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
  title: 'Premier Bathroom Remodel Texas | Expert Bathroom Renovation Statewide',
  description: 'Premier bathroom remodeling services across Texas — Austin, Houston, Dallas, San Antonio, and 50+ cities. Walk-in baths, shower remodels, tub to shower conversions. Licensed, 15+ years experience. Call 512-492-2321.',
  keywords: 'bathroom remodeling Texas, bathroom renovation Texas, walk-in bath Texas, shower remodel Texas, tub to shower conversion Texas, Texas bathroom contractors, bathroom remodeling Austin, bathroom remodeling Houston, bathroom remodeling Dallas, bathroom remodeling San Antonio',
  metadataBase: new URL('https://premierbathroomremodelaustin.com'),
  openGraph: {
    type: 'website',
    url: 'https://premierbathroomremodelaustin.com',
    title: 'Premier Bathroom Remodel Texas | Expert Bathroom Renovation',
    description: 'Transform your bathroom with Texas\'s trusted remodeling experts. Serving Austin, Houston, Dallas, San Antonio, and all major TX cities. Custom designs, quality craftsmanship.',
    siteName: 'Premier Bathroom Remodel Texas',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premier Bathroom Remodel Texas',
    description: 'Expert bathroom remodeling services across Texas. Serving Austin, Houston, Dallas, San Antonio, and more. Free consultations available.',
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

