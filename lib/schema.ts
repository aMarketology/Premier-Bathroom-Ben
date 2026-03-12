// Schema.org / JSON-LD structured data for SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://premierbathroomremodelaustin.com',
  name: 'Premier Bathroom Remodel Texas',
  image: 'https://premierbathroomremodelaustin.com/og-image.jpg',
  description: 'Expert bathroom remodeling, walk-in baths, shower renovations, and tub to shower conversions across Texas. Serving Austin, Houston, Dallas, San Antonio, and all major Texas cities. Licensed and insured with 15+ years experience.',
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
    // Austin Metro
    { '@type': 'City', name: 'Austin' },
    { '@type': 'City', name: 'Round Rock' },
    { '@type': 'City', name: 'Cedar Park' },
    { '@type': 'City', name: 'Georgetown' },
    { '@type': 'City', name: 'Pflugerville' },
    { '@type': 'City', name: 'Leander' },
    { '@type': 'City', name: 'Kyle' },
    { '@type': 'City', name: 'Buda' },
    { '@type': 'City', name: 'San Marcos' },
    { '@type': 'City', name: 'New Braunfels' },
    { '@type': 'City', name: 'Lakeway' },
    { '@type': 'City', name: 'Dripping Springs' },
    { '@type': 'City', name: 'Rollingwood' },
    { '@type': 'City', name: 'Manchaca' },
    { '@type': 'City', name: 'West Lake Hills' },
    { '@type': 'City', name: 'Bee Cave' },
    // Houston Metro
    { '@type': 'City', name: 'Houston' },
    { '@type': 'City', name: 'The Woodlands' },
    { '@type': 'City', name: 'Sugar Land' },
    { '@type': 'City', name: 'Pearland' },
    { '@type': 'City', name: 'Pasadena' },
    { '@type': 'City', name: 'Baytown' },
    { '@type': 'City', name: 'Katy' },
    // Dallas-Fort Worth Metro
    { '@type': 'City', name: 'Dallas' },
    { '@type': 'City', name: 'Fort Worth' },
    { '@type': 'City', name: 'Arlington' },
    { '@type': 'City', name: 'Plano' },
    { '@type': 'City', name: 'Garland' },
    { '@type': 'City', name: 'Irving' },
    { '@type': 'City', name: 'Frisco' },
    { '@type': 'City', name: 'McKinney' },
    { '@type': 'City', name: 'Carrollton' },
    { '@type': 'City', name: 'Denton' },
    { '@type': 'City', name: 'Lewisville' },
    // San Antonio Metro
    { '@type': 'City', name: 'San Antonio' },
    { '@type': 'City', name: 'Converse' },
    { '@type': 'City', name: 'Universal City' },
    // Other Major Texas Cities
    { '@type': 'City', name: 'El Paso' },
    { '@type': 'City', name: 'Corpus Christi' },
    { '@type': 'City', name: 'Lubbock' },
    { '@type': 'City', name: 'Amarillo' },
    { '@type': 'City', name: 'Laredo' },
    { '@type': 'City', name: 'Waco' },
    { '@type': 'City', name: 'Killeen' },
    { '@type': 'City', name: 'Midland' },
    { '@type': 'City', name: 'Odessa' },
    { '@type': 'City', name: 'Abilene' },
    { '@type': 'City', name: 'Tyler' },
    { '@type': 'City', name: 'Wichita Falls' },
    { '@type': 'City', name: 'Beaumont' },
    { '@type': 'City', name: 'McAllen' },
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
  name: 'Premier Bathroom Remodel Texas',
  hasOfferingDescription: [
    {
      '@type': 'Service',
      name: 'Bathroom Remodeling Texas',
      description: 'Complete bathroom renovations including custom designs, vanity installation, tile work, lighting, and modern fixtures. Serving Austin, Houston, Dallas, San Antonio, and all major Texas cities.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Texas',
      },
      areaServed: {
        '@type': 'State',
        name: 'Texas',
      },
    },
    {
      '@type': 'Service',
      name: 'Walk-in Bath Installation Texas',
      description: 'Safe, accessible walk-in bath installations for seniors and individuals with mobility concerns across Texas. ADA compliant design with low threshold entry, anti-slip flooring, and grab bars.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Texas',
      },
      areaServed: {
        '@type': 'State',
        name: 'Texas',
      },
    },
    {
      '@type': 'Service',
      name: 'Shower Remodel Texas',
      description: 'Custom walk-in showers, frameless glass enclosures, rainfall shower heads, and spa-inspired designs. Modern shower renovations for Texas homeowners.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Texas',
      },
      areaServed: {
        '@type': 'State',
        name: 'Texas',
      },
    },
    {
      '@type': 'Service',
      name: 'Tub to Shower Conversion Texas',
      description: 'Quick 1-day tub to shower conversions across Texas. Increase bathroom space, improve accessibility, and modernize your home with professional installation.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Texas',
      },
      areaServed: {
        '@type': 'State',
        name: 'Texas',
      },
    },
    {
      '@type': 'Service',
      name: 'Tile & Backsplash Installation Texas',
      description: 'Expert tile work and backsplash installation across Texas. Porcelain, ceramic, natural stone, and mosaic options for beautiful, durable bathroom surfaces.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Premier Bathroom Remodel Texas',
      },
      areaServed: {
        '@type': 'State',
        name: 'Texas',
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
      name: 'How long does a bathroom remodel take in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most bathroom remodels in Texas take 2-4 weeks depending on the scope of work. Simple updates can be completed in 1-2 weeks, while full renovations may take 4-6 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does bathroom remodeling cost in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bathroom remodeling costs in Texas typically range from $10,000 to $35,000 depending on size, materials, and scope. We offer free consultations and detailed quotes for all Texas cities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve cities outside of Austin in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We serve homeowners throughout Texas including Houston, Dallas, San Antonio, Fort Worth, El Paso, Corpus Christi, Plano, and many more cities. Call us for service availability in your area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need permits for bathroom remodeling in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most bathroom remodels in Texas require permits, especially if you\'re moving plumbing or electrical. We handle all permit applications for you.',
      },
    },
  ],
};

export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Premier Bathroom Remodel Texas',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
};

