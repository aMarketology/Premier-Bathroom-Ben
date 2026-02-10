'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const serviceAreas = [
  {
    name: 'Austin',
    slug: 'austin',
    description: 'Capital city bathroom remodeling excellence',
    image: '/IMG_0387 Ben.jpeg'
  },
  {
    name: 'Round Rock',
    slug: 'round-rock',
    description: 'Trusted bathroom renovation experts',
    image: '/IMG_1412 Ben.jpeg'
  },
  {
    name: 'Cedar Park',
    slug: 'cedar-park',
    description: 'Quality bathroom transformations',
    image: '/IMG_1551 Ben.jpeg'
  },
  {
    name: 'Pflugerville',
    slug: 'pflugerville',
    description: 'Premier bathroom remodeling services',
    image: '/IMG_2305 Ben.jpeg'
  },
  {
    name: 'West Lake Hills',
    slug: 'west-lake-hills',
    description: 'Luxury bathroom renovations',
    image: '/IMG_2324 Ben.jpeg'
  },
  {
    name: 'Bee Cave',
    slug: 'bee-cave',
    description: 'Sophisticated bathroom excellence',
    image: '/IMG_2596 Ben.jpeg'
  },
  {
    name: 'Rollingwood',
    slug: 'rollingwood',
    description: 'Expert renovation specialists',
    image: '/IMG_5970 Ben.jpeg'
  },
  {
    name: 'Manchaca',
    slug: 'manchaca',
    description: 'Professional bathroom transformations',
    image: '/IMG_6283 Ben.jpeg'
  },
  {
    name: 'Georgetown',
    slug: 'georgetown',
    description: 'Trusted remodeling experts',
    image: '/IMG_7767 Ben.jpeg'
  },
  {
    name: 'Lakeway',
    slug: 'lakeway',
    description: 'Luxury bathroom specialists',
    image: '/IMG_8122 Ben.jpeg'
  },
  {
    name: 'Dripping Springs',
    slug: 'dripping-springs',
    description: 'Hill Country bathroom excellence',
    image: '/IMG_2849 Ben v.jpeg'
  },
  {
    name: 'Leander',
    slug: 'leander',
    description: 'Expert bathroom remodeling',
    image: '/IMG_0387 Ben.jpeg'
  },
  {
    name: 'Kyle',
    slug: 'kyle',
    description: 'Quality renovation specialists',
    image: '/IMG_1412 Ben.jpeg'
  }
]

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Serving the Greater Austin Area</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
              Service Areas
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">Across Texas</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Premier Bathroom Remodel Austin proudly serves homeowners throughout the Greater Austin area with expert bathroom remodeling services. Find your city below to learn more about our services in your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </motion.div>
        </div>
      </section>

      {/* Service Areas Grid */}
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
              Cities We <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-xl text-gray-600">
              Click on your city to learn more about our bathroom remodeling services in your area
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link href={`/service-area/${area.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={area.image}
                        alt={`Bathroom Remodeling in ${area.name}, TX`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-blue-100 text-sm mb-4">{area.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Proudly Serving the <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Greater Austin Area</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              With over 15 years of experience, we've completed hundreds of bathroom remodels throughout Central Texas. No matter where you're located in the Austin metro area, we're here to help transform your bathroom.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">13</div>
                  <div className="text-sm text-gray-600">Cities Served</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
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
              Don't See Your City Listed?
            </h2>
            <p className="text-xl text-blue-100">
              We serve many communities throughout the Greater Austin area. Give us a call to see if we can help with your bathroom remodeling project.
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

      <Footer />
    </div>
  )
}
