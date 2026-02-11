// Schema.org / JSON-LD structured data for SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://premierbathroomremodelaustin.com',
  name: 'Premier Bathroom Remodel Austin',
  image: 'https://premierbathroomremodelaustin.com/og-image.jpg',
  description: 'Expert bathroom remodeling, walk-in baths, shower renovations, and tub to shower conversions in Austin, TX. Licensed and insured with 15+ years experience.',
  url: 'https://premierbathroomremodelaustin.com',
  telephone: '+1-512-492-2321',
  email: 'info@premierbathroomremodelaustin.com',
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
    { '@type': 'City', name: 'Rollingwood' },
    { '@type': 'City', name: 'Manchaca' },
    { '@type': 'City', name: 'Pflugerville' },
    { '@type': 'City', name: 'Round Rock' },
    { '@type': 'City', name: 'Cedar Park' },
    { '@type': 'City', name: 'Georgetown' },
  ],
  sameAs: [
    'https://www.facebook.com/premierbathroomaustin',
    'https://www.instagram.com/premierbathroomaustin',
    'https://www.google.com/maps',
  ],
  priceRange: '$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
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
    ratingValue: '5.0',
    ratingCount: '50',
    reviewCount: '50',
  },
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Premier Bathroom Remodel Austin',
  hasOfferingDescription: [
    {
      '@type': 'Service',
      name: 'Bathroom Remodeling Austin',
      description: 'Complete bathroom renovations including custom designs, vanity installation, tile work, lighting, and modern fixtures. Transform your Austin bathroom with expert craftsmanship.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Austin',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Walk-in Bath Installation',
      description: 'Safe, accessible walk-in bath installations for seniors and individuals with mobility concerns. ADA compliant design with low threshold entry, anti-slip flooring, and grab bars.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Austin',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Shower Remodel Austin',
      description: 'Custom walk-in showers, frameless glass enclosures, rainfall shower heads, and spa-inspired designs. Modern shower renovations for Austin homes.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Austin',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Tub to Shower Conversion',
      description: 'Quick 1-day tub to shower conversions. Increase bathroom space, improve accessibility, and modernize your Austin bathroom with professional installation.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Austin',
      },
      areaServed: {
        '@type': 'City',
        name: 'Austin',
      },
    },
    {
      '@type': 'Service',
      name: 'Tile & Backsplash Installation',
      description: 'Expert tile work and backsplash installation. Porcelain, ceramic, natural stone, and mosaic options for beautiful, durable bathroom surfaces.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Austin',
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
      item: 'https://premierbathroomremodelaustin.com',
    },
    ...(path === '/services' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://premierbathroomremodelaustin.com/services',
    }] : []),
    ...(path === '/contact' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://premierbathroomremodelaustin.com/contact',
    }] : []),
  ],
});

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a bathroom remodel take in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most bathroom remodels in Austin take 2-4 weeks depending on the scope of work. Simple updates can be completed in 1-2 weeks, while full renovations may take 4-6 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does bathroom remodeling cost in Austin, TX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bathroom remodeling costs in Austin typically range from $10,000 to $35,000 depending on size, materials, and scope. We offer free consultations and detailed quotes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need permits for bathroom remodeling in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most bathroom remodels in Austin require permits, especially if you\'re moving plumbing or electrical. We handle all permit applications for you.',
      },
    },
  ],
};

export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Premier Bathroom Remodel Austin',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
};

