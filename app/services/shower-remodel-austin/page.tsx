'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ServiceLeadForm from '../../components/ServiceLeadForm'

export default function ShowerRemodelAustin() {
  const showerFeatures = [
    {
      title: 'Walk-in Showers',
      description: 'Barrier-free, spacious designs for easy access and modern aesthetics',
      icon: '🚿'
    },
    {
      title: 'Rainfall Shower Heads',
      description: 'Luxurious overhead rainfall experience for spa-like relaxation',
      icon: '💧'
    },
    {
      title: 'Custom Glass Enclosures',
      description: 'Frameless or semi-frameless designs tailored to your space',
      icon: '��'
    },
    {
      title: 'Frameless Shower Doors',
      description: 'Sleek, modern glass doors that enhance visual space',
      icon: '🚪'
    },
    {
      title: 'Tile & Stone Work',
      description: 'Premium porcelain, ceramic, natural stone, and mosaic options',
      icon: '🎨'
    },
    {
      title: 'Built-in Benches',
      description: 'Comfortable seating integrated seamlessly into design',
      icon: '🪑'
    },
    {
      title: 'Modern Fixtures',
      description: 'Contemporary faucets, valves, and hardware finishes',
      icon: '✨'
    },
    {
      title: 'Spa-Inspired Designs',
      description: 'Steam showers, body jets, and therapeutic features',
      icon: '🧖'
    }
  ]

  const popularStyles = [
    {
      name: 'Modern Minimalist',
      description: 'Clean lines, neutral colors, frameless glass, and floating fixtures'
    },
    {
      name: 'Spa Retreat',
      description: 'Natural stone, rainfall heads, built-in benches, and ambient lighting'
    },
    {
      name: 'Industrial Chic',
      description: 'Exposed pipes, matte black fixtures, concrete tiles, and metal accents'
    },
    {
      name: 'Traditional Elegance',
      description: 'Classic subway tiles, chrome fixtures, and timeless design elements'
    }
  ]

  const faqs = [
    {
      question: "How much does a shower remodel cost in Austin?",
      answer: "Shower remodels in Austin typically range from $6,000 to $20,000 depending on size, materials, and features. Custom walk-in showers with premium finishes may cost more. We provide free detailed estimates."
    },
    {
      question: "How long does a shower renovation take?",
      answer: "Most shower remodels in Austin take 1-2 weeks from start to finish. This includes demolition, plumbing, tile work, and glass installation. We'll provide a detailed timeline during your consultation."
    },
    {
      question: "Can you convert my tub to a walk-in shower?",
      answer: "Absolutely! Tub-to-shower conversions are one of our most popular services in Austin. This creates more space, improves accessibility, and modernizes your bathroom."
    },
    {
      question: "What shower tile options do you offer?",
      answer: "We offer extensive tile selections including porcelain, ceramic, natural stone (marble, travertine, granite), glass mosaic, and large-format tiles in various colors, patterns, and finishes."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
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
                <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Modern Designs</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
                Shower Remodel
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent">Austin, TX</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your daily routine with a stunning custom shower remodel. From modern walk-in showers to luxurious spa-inspired designs, we create beautiful, functional spaces tailored to your lifestyle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call 512-706-9577
                </a>
                <Link
                  href="/get-started?service=shower-remodel"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all text-lg"
                >
                  Free Design Quote
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Custom Designs</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Premium Materials</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Expert Installation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <ServiceLeadForm
                service="shower-remodel"
                serviceLabel="Shower Remodel"
                accentColor="blue"
                pageLocation="Hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Custom Shower <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600">Create your perfect shower experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Austin Shower <span className="text-blue-600">Transformations</span>
            </h2>
            <p className="text-xl text-gray-600">Real projects from Austin homeowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/IMG_7767 Ben.jpeg', alt: 'Walk-in shower remodel Austin' },
              { src: '/IMG_2324 Ben.jpeg', alt: 'Custom tile shower Austin TX' },
              { src: '/IMG_0387 Ben.jpeg', alt: 'Frameless shower door installation' },
              { src: '/IMG_1551 Ben.jpeg', alt: 'Modern shower design Austin' },
              { src: '/IMG_2596 Ben.jpeg', alt: 'Luxury shower renovation' },
              { src: '/IMG_8122 Ben.jpeg', alt: 'Contemporary shower remodel' }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image 
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Styles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Popular <span className="text-blue-600">Shower Styles</span>
            </h2>
            <p className="text-xl text-gray-600">Find the perfect design for your Austin home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {popularStyles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{style.name}</h3>
                <p className="text-gray-600 leading-relaxed">{style.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Ben Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/IMG_2305 Ben.jpeg"
                  alt="Ben — Owner of Premier Bathroom Remodel Austin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
                  <p className="font-bold text-gray-900 text-lg">Ben — Owner & Lead Installer</p>
                  <p className="text-gray-600 text-sm">Austin, TX · Licensed & Insured · 15+ Years Experience</p>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">5-Star Rated</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Who You're Hiring</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Meet <span className="text-blue-600">Ben</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm Ben, owner and lead installer at Premier Bathroom Remodel Austin. When you hire us for your shower remodel, I show up — personally. You get my cell number, my expertise, and my commitment to getting it right.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From frameless glass and custom tile to walk-in conversions and spa showers — I've built them all across Austin. I don't use subs. I do the work myself.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: '15+', sub: 'Years Experience' },
                  { label: '200+', sub: 'Showers Built' },
                  { label: '5★', sub: 'Average Rating' },
                  { label: '100%', sub: 'Licensed & Insured' },
                ].map((stat, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.sub}</div>
                  </div>
                ))}
              </div>
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium text-white hover:shadow-lg transition-all text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Ben — (512) 706-9577
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Common questions about shower remodeling</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-light text-white">
              Ready for Your Dream Shower?
            </h2>
            <p className="text-xl text-blue-50">
              Let's design and build the perfect custom shower for your Austin home
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all text-lg shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 512-706-9577
              </a>
              <Link
                href="/get-started?service=shower-remodel"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-medium text-white hover:bg-white/10 transition-all text-lg"
              >
                Get Free Design Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p className="text-sm text-blue-100 pt-4">
              Proudly serving Austin, Rollingwood, Manchaca, Pflugerville & surrounding areas
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

