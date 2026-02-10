'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// City-specific data
const cityData: { [key: string]: {
  name: string
  tagline: string
  description: string
  neighborhoods?: string[]
  localInfo: string
}} = {
  'austin': {
    name: 'Austin',
    tagline: 'Capital City Bathroom Excellence',
    description: 'As the capital of Texas, Austin deserves bathroom remodeling that matches its vibrant character. From downtown condos to suburban homes, we bring expert craftsmanship and innovative designs to every Austin bathroom project.',
    neighborhoods: ['Downtown', 'South Congress', 'Hyde Park', 'Zilker', 'Tarrytown', 'Barton Hills'],
    localInfo: 'Serving all of Austin\'s unique neighborhoods with personalized bathroom remodeling services.'
  },
  'round-rock': {
    name: 'Round Rock',
    tagline: 'Round Rock\'s Trusted Bathroom Experts',
    description: 'Round Rock homeowners trust us for quality bathroom renovations that enhance both function and value. From modern updates to complete transformations, we specialize in creating beautiful bathrooms for Round Rock families.',
    neighborhoods: ['Downtown Round Rock', 'Teravista', 'Walsh Ranch', 'Forest Creek', 'Stone Oak'],
    localInfo: 'Proudly serving Round Rock with expert bathroom remodeling and renovation services.'
  },
  'cedar-park': {
    name: 'Cedar Park',
    tagline: 'Cedar Park Bathroom Transformations',
    description: 'Cedar Park homeowners choose Premier Bathroom Remodel for our commitment to quality and attention to detail. We understand Cedar Park homes and deliver bathroom renovations that exceed expectations.',
    neighborhoods: ['Buttercup Creek', 'Cedar Park Town Center', 'Cypress Creek', 'Anderson Mill', 'Brushy Creek'],
    localInfo: 'Expert bathroom remodeling throughout Cedar Park and surrounding communities.'
  },
  'pflugerville': {
    name: 'Pflugerville',
    tagline: 'Pflugerville\'s Premier Bathroom Remodelers',
    description: 'Transform your Pflugerville home with a stunning bathroom remodel. We bring years of experience and dedication to every project, ensuring your bathroom becomes the oasis you deserve.',
    neighborhoods: ['Falcon Pointe', 'Blackhawk', 'Wells Branch', 'Lakeside', 'Springbrook Centre'],
    localInfo: 'Serving Pflugerville with professional bathroom renovation and remodeling services.'
  },
  'west-lake-hills': {
    name: 'West Lake Hills',
    tagline: 'Luxury Bathrooms for West Lake Hills',
    description: 'West Lake Hills luxury homes deserve exceptional bathroom remodeling. We specialize in high-end renovations with premium materials, custom designs, and meticulous attention to detail for discerning homeowners.',
    neighborhoods: ['Davenport Ranch', 'Lost Creek', 'Rob Roy', 'Eanes'],
    localInfo: 'Premier luxury bathroom remodeling for West Lake Hills\' finest homes.'
  },
  'bee-cave': {
    name: 'Bee Cave',
    tagline: 'Bee Cave Bathroom Excellence',
    description: 'Bee Cave homeowners trust us for sophisticated bathroom renovations that complement their beautiful homes. From spa-like retreats to modern family bathrooms, we deliver exceptional results.',
    neighborhoods: ['Spanish Oaks', 'Falconhead', 'Meridian', 'Sweetwater', 'Bella Colinas'],
    localInfo: 'Expert bathroom remodeling services throughout Bee Cave and the Hill Country.'
  },
  'rollingwood': {
    name: 'Rollingwood',
    tagline: 'Rollingwood\'s Bathroom Renovation Experts',
    description: 'Rollingwood\'s charming homes deserve beautiful bathrooms. We specialize in renovations that honor the character of your home while adding modern functionality and style.',
    neighborhoods: ['Rollingwood Estates'],
    localInfo: 'Serving Rollingwood with personalized bathroom remodeling services.'
  },
  'manchaca': {
    name: 'Manchaca',
    tagline: 'Manchaca Bathroom Transformations',
    description: 'From traditional to contemporary, we create stunning bathrooms for Manchaca homeowners. Our expert team brings quality craftsmanship and attention to detail to every project.',
    neighborhoods: ['Manchaca Village', 'Onion Creek'],
    localInfo: 'Professional bathroom remodeling services for Manchaca and South Austin.'
  },
  'georgetown': {
    name: 'Georgetown',
    tagline: 'Georgetown\'s Trusted Remodelers',
    description: 'Georgetown homeowners choose Premier Bathroom Remodel for our expertise and commitment to excellence. We create beautiful, functional bathrooms that enhance your home\'s value and your daily life.',
    neighborhoods: ['Downtown Georgetown', 'Sun City', 'Wolf Ranch', 'Berry Creek', 'Cimarron Hills'],
    localInfo: 'Serving Georgetown with expert bathroom renovation and remodeling services.'
  },
  'lakeway': {
    name: 'Lakeway',
    tagline: 'Lakeway Luxury Bathroom Remodeling',
    description: 'Lakeway\'s stunning homes deserve equally beautiful bathrooms. We specialize in upscale renovations with premium materials, innovative designs, and exceptional craftsmanship for Lakeway residents.',
    neighborhoods: ['The Hills', 'Rough Hollow', 'Serene Hills', 'Lakeway Highlands'],
    localInfo: 'Premier bathroom remodeling for Lakeway\'s lakeside luxury homes.'
  },
  'dripping-springs': {
    name: 'Dripping Springs',
    tagline: 'Hill Country Bathroom Excellence',
    description: 'Dripping Springs homeowners trust us for bathroom renovations that blend seamlessly with Hill Country living. From rustic elegance to modern luxury, we create bathrooms perfectly suited to your lifestyle.',
    neighborhoods: ['Caliterra', 'Headwaters', 'Belterra', 'Saddle Ridge'],
    localInfo: 'Expert bathroom remodeling throughout Dripping Springs and the Texas Hill Country.'
  },
  'leander': {
    name: 'Leander',
    tagline: 'Leander\'s Bathroom Remodeling Experts',
    description: 'Transform your Leander home with a professional bathroom remodel. We bring experience, quality materials, and exceptional craftsmanship to create the bathroom you\'ve always wanted.',
    neighborhoods: ['Crystal Falls', 'Mason Hills', 'Summerlyn', 'Travisso', 'Block House'],
    localInfo: 'Professional bathroom renovation services throughout Leander and Williamson County.'
  },
  'kyle': {
    name: 'Kyle',
    tagline: 'Kyle Bathroom Renovation Specialists',
    description: 'Kyle homeowners choose us for quality bathroom remodeling that transforms their homes. From modern updates to complete renovations, we deliver exceptional results for Kyle families.',
    neighborhoods: ['Gregg Manor', 'Plum Creek', 'Waterleaf', 'Kohlers Crossing', 'Live Oak'],
    localInfo: 'Expert bathroom remodeling services for Kyle and Hays County homeowners.'
  }
}

export default function ServiceAreaPage() {
  const params = useParams()
  const cityId = params?.id as string || 'austin'
  const city = cityData[cityId] || cityData['austin']

  const services = [
    'Complete bathroom renovations',
    'Custom shower and tub installations',
    'Vanity design and installation',
    'Tile work and backsplash',
    'Modern fixtures and fittings',
    'Lighting design and installation',
    'Flooring upgrades',
    'ADA-compliant modifications'
  ]

  const process = [
    {
      step: '1',
      title: 'Free Consultation',
      description: `Schedule a free in-home consultation in ${city.name}. We'll discuss your vision, take measurements, and provide expert recommendations.`
    },
    {
      step: '2',
      title: 'Custom Design',
      description: 'Receive a detailed proposal with 3D renderings, material selections, and a transparent quote tailored to your budget.'
    },
    {
      step: '3',
      title: 'Expert Installation',
      description: 'Our licensed professionals transform your bathroom with precision craftsmanship, staying on schedule and maintaining a clean workspace.'
    },
    {
      step: '4',
      title: 'Final Walkthrough',
      description: 'We ensure every detail meets our high standards and your complete satisfaction before considering the project complete.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">{city.tagline}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
                Bathroom Remodeling
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">{city.name}, TX</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {city.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call (512) 706-9577
                </a>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all text-lg"
                >
                  Free Consultation
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Licensed & Insured</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/IMG_0387 Ben.jpeg"
                  alt={`Bathroom Remodeling in ${city.name}, TX`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">15+</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Years Experience</div>
                    <div className="text-sm text-gray-600">in {city.name}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive bathroom remodeling services for {city.name} homeowners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      {city.neighborhoods && city.neighborhoods.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Areas We <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Serve</span>
              </h2>
              <p className="text-xl text-gray-600">
                {city.localInfo}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {city.neighborhoods.map((neighborhood, index) => (
                <motion.div
                  key={neighborhood}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-medium text-gray-900">{neighborhood}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple, transparent, and stress-free bathroom remodeling in {city.name}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full text-white text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Premier Bathroom</span>
            </h2>
            <p className="text-xl text-gray-600">
              {city.name}'s trusted bathroom remodeling experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Licensed & Insured',
                description: 'Fully licensed, bonded, and insured for your peace of mind and protection.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Transparent Pricing',
                description: 'Clear, upfront quotes with no hidden fees or surprise charges.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Quality Guarantee',
                description: 'We stand behind our work with comprehensive warranties and guarantees.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'On-Time Completion',
                description: 'We respect your time and complete projects on schedule, as promised.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: 'Expert Craftsmen',
                description: 'Skilled professionals with years of experience in bathroom remodeling.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Clean Workspace',
                description: 'We maintain a clean, organized work area and clean up thoroughly daily.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white">
              Ready to Transform Your {city.name} Bathroom?
            </h2>
            <p className="text-xl text-blue-100">
              Get your free consultation and quote today. Let's create the bathroom you've always dreamed of.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-lg font-medium text-blue-600 hover:bg-gray-50 transition-all text-lg shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 706-9577
              </a>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-medium text-white hover:bg-white/10 transition-all text-lg"
              >
                Schedule Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Specialties</span>
            </h2>
            <p className="text-xl text-gray-600">
              Explore our specialized bathroom remodeling services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Bathroom Remodeling', href: '/services/bathroom-remodeling-austin', image: '/IMG_0387 Ben.jpeg' },
              { title: 'Shower Remodel', href: '/services/shower-remodel-austin', image: '/IMG_1412 Ben.jpeg' },
              { title: 'Tub to Shower Conversion', href: '/services/tub-to-shower-conversion-austin', image: '/IMG_1551 Ben.jpeg' },
              { title: 'Walk-in Bath', href: '/services/walk-in-bath-austin', image: '/IMG_2324 Ben.jpeg' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.href} className="group block">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
