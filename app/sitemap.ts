import { MetadataRoute } from 'next'

const BASE_URL = 'https://premierbathroomremodelaustin.com'

const serviceAreaSlugs = [
  // Austin Metro
  'austin', 'round-rock', 'cedar-park', 'georgetown', 'leander', 'pflugerville',
  'kyle', 'buda', 'san-marcos', 'lakeway', 'west-lake-hills', 'bee-cave',
  'dripping-springs', 'manchaca', 'rollingwood',
  // Houston Metro
  'houston', 'the-woodlands', 'sugar-land', 'pearland', 'katy',
  // Dallas-Fort Worth Metro
  'dallas', 'fort-worth', 'arlington', 'plano', 'frisco', 'mckinney',
  'garland', 'irving', 'denton',
  // San Antonio Metro
  'san-antonio', 'new-braunfels',
  // Other Major Texas Cities
  'el-paso', 'corpus-christi', 'lubbock', 'amarillo', 'waco',
  'midland', 'odessa', 'abilene', 'tyler', 'wichita-falls',
  'beaumont', 'mcallen', 'laredo',
]

const servicePageSlugs = [
  'bathroom-remodeling-austin',
  'shower-remodel-austin',
  'tub-to-shower-conversion-austin',
  'walk-in-bath-austin',
  'bathroom-vanity-austin',
  'full-bathroom-remodel-austin',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-area`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/get-started`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = servicePageSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const locationPages: MetadataRoute.Sitemap = serviceAreaSlugs.map((slug) => ({
    url: `${BASE_URL}/service-area/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...locationPages]
}
