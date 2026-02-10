import { Metadata } from 'next'

// City data for metadata
const cityData: { [key: string]: { name: string; description: string } } = {
  'austin': {
    name: 'Austin',
    description: 'Premier Bathroom Remodel serves Austin, TX with expert bathroom renovation services. Custom designs, quality craftsmanship, and complete remodeling solutions for Austin homeowners.'
  },
  'round-rock': {
    name: 'Round Rock',
    description: 'Professional bathroom remodeling services in Round Rock, TX. Transform your bathroom with expert craftsmanship and personalized designs tailored to Round Rock homes.'
  },
  'cedar-park': {
    name: 'Cedar Park',
    description: 'Expert bathroom renovation services in Cedar Park, TX. Quality remodeling solutions with custom designs and professional installation for Cedar Park residents.'
  },
  'pflugerville': {
    name: 'Pflugerville',
    description: 'Transform your Pflugerville bathroom with Premier Bathroom Remodel. Expert renovation services, custom designs, and quality craftsmanship for Pflugerville homeowners.'
  },
  'west-lake-hills': {
    name: 'West Lake Hills',
    description: 'Luxury bathroom remodeling in West Lake Hills, TX. Premium materials, expert craftsmanship, and custom designs for West Lake Hills luxury homes.'
  },
  'bee-cave': {
    name: 'Bee Cave',
    description: 'Premier bathroom renovation services in Bee Cave, TX. Expert remodeling with custom designs and quality materials for Bee Cave homeowners.'
  },
  'rollingwood': {
    name: 'Rollingwood',
    description: 'Professional bathroom remodeling in Rollingwood, TX. Quality craftsmanship and personalized designs for Rollingwood homes.'
  },
  'manchaca': {
    name: 'Manchaca',
    description: 'Expert bathroom renovation services in Manchaca, TX. Transform your bathroom with custom designs and professional installation.'
  },
  'georgetown': {
    name: 'Georgetown',
    description: 'Premier bathroom remodeling in Georgetown, TX. Custom designs, quality materials, and expert craftsmanship for Georgetown homeowners.'
  },
  'lakeway': {
    name: 'Lakeway',
    description: 'Luxury bathroom renovation services in Lakeway, TX. Expert remodeling with premium materials and custom designs for Lakeway residents.'
  },
  'dripping-springs': {
    name: 'Dripping Springs',
    description: 'Professional bathroom remodeling in Dripping Springs, TX. Quality craftsmanship and personalized bathroom designs.'
  },
  'leander': {
    name: 'Leander',
    description: 'Expert bathroom renovation services in Leander, TX. Transform your bathroom with custom designs and professional installation.'
  },
  'kyle': {
    name: 'Kyle',
    description: 'Premier bathroom remodeling in Kyle, TX. Quality materials, expert craftsmanship, and custom designs for Kyle homeowners.'
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const city = cityData[params.id] || { name: 'Austin Area', description: 'Expert bathroom remodeling services in the Austin area.' }
  
  return {
    title: `Bathroom Remodeling ${city.name} TX | Premier Bathroom Renovation Services`,
    description: city.description,
    keywords: `bathroom remodeling ${city.name}, bathroom renovation ${city.name} TX, bathroom remodel near me, ${city.name} bathroom contractors, custom bathroom design ${city.name}`,
    openGraph: {
      title: `Professional Bathroom Remodeling in ${city.name}, TX`,
      description: `Transform your bathroom with ${city.name}'s trusted remodeling experts. Free consultations available.`,
      type: 'website',
    }
  }
}

export default function ServiceAreaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
