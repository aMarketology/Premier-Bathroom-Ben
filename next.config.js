/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Location-specific bathroom remodel pages â†’ main bathroom remodeling service
      {
        source: '/bathroom-remodel-round-rock',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-leander',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-cedar-park',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-austin',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-central-austin',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-south-austin',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-pflugerville',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-lakeway',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-bee-cave',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodel-downtown-austin',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      {
        source: '/bathroom-remodeling-austin',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      
      // Walk-in bath and accessibility
      {
        source: '/walk-in-bath',
        destination: '/services/walk-in-bath-austin',
        permanent: true,
      },
      {
        source: '/safety-accessibility-austin',
        destination: '/services/walk-in-bath-austin',
        permanent: true,
      },
      
      // Tub to shower conversion
      {
        source: '/tub-to-shower-conversion',
        destination: '/services/tub-to-shower-conversion-austin',
        permanent: true,
      },
      
      // Tub and shower combo
      {
        source: '/tub-and-shower-combo',
        destination: '/services/bathroom-remodeling-austin',
        permanent: true,
      },
      
      // Blog posts â†’ Home page (no blog currently exists)
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/no-more-water-woes-why-concrete-boards-are-a-must-for-shower-walls',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

