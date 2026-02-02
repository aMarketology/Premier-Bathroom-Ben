// Schema.org / JSON-LD structured data for SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://champstile.com',
  name: 'Champs Tile',
  image: 'https://champstile.com/og-image.jpg',
  description: 'Professional tile installation, custom tile work, kitchen backsplashes, bathroom tiles, and premium flooring services in Austin, Texas',
  url: 'https://champstile.com',
  telephone: '+1 512-706-9577',
  email: 'info@champstile.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78701',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '30.2672',
    longitude: '-97.7431',
  },
  areaServed: [
    { '@type': 'City', name: 'Austin' },
    { '@type': 'City', name: 'Round Rock' },
    { '@type': 'City', name: 'Cedar Park' },
    { '@type': 'City', name: 'Pflugerville' },
    { '@type': 'City', name: 'West Lake Hills' },
    { '@type': 'City', name: 'Bee Cave' },
    { '@type': 'City', name: 'Georgetown' },
  ],
  sameAs: [
    'https://www.facebook.com',
    'https://www.instagram.com',
    'https://www.google.com/maps',
  ],
  priceRange: '$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      closes: '00:00',
      opens: '00:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    ratingCount: '19',
    reviewCount: '19',
  },
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Champs Tile',
  hasOfferingDescription: [
    {
      '@type': 'Service',
      name: 'Custom Tile Installation',
      description: 'Professional tile installation for floors, walls, backsplashes, and showers. Expert craftsmanship with ceramic, porcelain, natural stone, and glass tiles.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Champs Tile',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Kitchen Backsplash',
      description: 'Custom kitchen backsplash design and installation. Beautiful patterns, colors, and materials to complement your kitchen design.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Champs Tile',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Bathroom Tile Installation',
      description: 'Complete bathroom tile services including shower walls, floors, tub surrounds, and decorative accents. Water-resistant and durable installations.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Champs Tile',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Premium Flooring',
      description: 'Expert installation of tile flooring, luxury vinyl plank, and natural stone. Durable, beautiful floors for residential and commercial spaces.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Champs Tile',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
  ],
};

export const breadcrumbSchema = (path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://champstile.com',
    },
    ...(path === '/services' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://champstile.com/services',
    }] : []),
    ...(path === '/contact' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://champstile.com/contact',
    }] : []),
  ],
});

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does tile installation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tile installation time varies based on project size. A typical bathroom takes 3-5 days, while kitchen backsplashes can be completed in 1-2 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of tile do you install?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We install all types of tile including ceramic, porcelain, natural stone (marble, granite, travertine), glass tiles, and mosaic patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free estimates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide free, no-obligation estimates for all tile installation and flooring projects in the Austin area.',
      },
    },
  ],
};

export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Champs Tile',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    ratingCount: '19',
    bestRating: '5',
    worstRating: '1',
  },
};
