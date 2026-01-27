'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tub to Shower Conversion Austin TX | One Day Install | Premier Bathroom',
  description: 'Convert your bathtub to a walk-in shower in Austin, TX. Quick 1-day installation, increased space, modern design. Licensed professionals. Call 512-706-9577 for free quote.',
  keywords: 'tub to shower conversion Austin, bathtub removal Austin TX, shower conversion Austin, replace tub with shower Austin, walk-in shower conversion',
}

export default function TubToShowerConversionAustin() {
  const benefits = [
    {
      icon: '⚡',
      title: 'One-Day Installation',
      description: 'Most conversions completed in just 24 hours with minimal disruption'
    },
    {
      icon: '📏',
      title: 'Increased Space',
      description: 'Remove bulky tub to create a more spacious, open bathroom'
    },
    {
      icon: '🛡️',
      title: 'Enhanced Safety',
      description: 'Low or no threshold entry reduces fall risk for all ages'
    },
    {
      icon: '🌟',
      title: 'Low Maintenance',
      description: 'Modern materials resist mold, mildew, and staining'
    },
    {
      icon: '🎨',
      title: 'Custom Designs',
      description: 'Choose from hundreds of tile, fixture, and layout options'
    },
    {
      icon: '💰',
      title: 'Increased Value',
      description: 'Modern showers are highly desirable to homebuyers'
    },
    {
      icon: '💧',
      title: 'Water Efficiency',
      description: 'Low-flow fixtures save water and reduce utility bills'
    },
    {
      icon: '✅',
      title: 'Warranty Included',
      description: 'Full warranty on materials and workmanship'
    }
  ]

  const conversionOptions = [
    {
      name: 'Standard Conversion',
      price: 'Starting at $6,999',
      features: [
        'Complete tub removal',
        'Shower pan installation',
        'Tile surround (3 walls)',
        'Standard fixtures',
        'Basic glass door',
        'Professional installation'
      ]
    },
    {
      name: 'Deluxe Conversion',
      price: 'Starting at $9,999',
      features: [
        'Everything in Standard',
        'Premium tile selection',
        'Rainfall shower head',
        'Frameless glass enclosure',
        'Built-in storage niche',
        'Designer fixtures'
      ],
      popular: true
    },
    {
      name: 'Luxury Conversion',
      price: 'Starting at $14,999',
      features: [
        'Everything in Deluxe',
        'Large format tile',
        'Multiple shower heads',
        'Body jets',
        'Custom bench seating',
        'Heated flooring'
      ]
    }
  ]

  const faqs = [
    {
      question: "How long does a tub to shower conversion take in Austin?",
      answer: "Most standard conversions are completed in 1-2 days. We remove your old tub, prep the space, install the new shower pan, tile the walls, and install fixtures. More complex custom conversions may take 3-5 days."
    },
    {
      question: "Will converting my tub to a shower hurt resale value?",
      answer: "Not usually! Walk-in showers are highly sought after by modern homebuyers, especially in Austin's active market. If you have multiple bathrooms, keeping one tub is ideal. For single bathroom homes, we can discuss options."
    },
    {
      question: "What happens to the plumbing during conversion?",
      answer: "We work with your existing plumbing in most cases, simply relocating fixtures as needed. Our licensed plumbers ensure all work meets Austin building codes and passes inspection."
    },
    {
      question: "Can I choose my own tile and fixtures?",
      answer: "Absolutely! We offer an extensive selection of tiles, glass doors, fixtures, and finishes. You can also bring your own materials if you've already selected something specific."
    },
    {
      question: "Do you offer financing for tub to shower conversions?",
      answer: "Yes, we offer flexible financing options to make your bathroom renovation affordable. Contact us to discuss payment plans that fit your budget."
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Free Consultation',
      description: 'We visit your Austin home, take measurements, discuss your vision, and provide a detailed quote.',
      duration: '1 hour'
    },
    {
      step: '02',
      title: 'Design Selection',
      description: 'Choose your tiles, fixtures, glass enclosure, and custom features from our showroom.',
      duration: '1-2 hours'
    },
    {
      step: '03',
      title: 'Tub Removal',
      description: 'We carefully remove your old bathtub and prep the space for your new shower.',
      duration: '2-4 hours'
    },
    {
      step: '04',
      title: 'Shower Installation',
      description: 'Install shower pan, tile walls, add fixtures, and install glass enclosure.',
      duration: '1-2 days'
    },
    {
      step: '05',
      title: 'Final Inspection',
      description: 'Thorough quality check, cleanup, and walkthrough of your new shower features.',
      duration: '1 hour'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-white shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-xs font-medium text-cyan-600 uppercase tracking-widest">Quick Conversion</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
                Tub to Shower
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-700 bg-clip-text text-transparent">Conversion Austin</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your outdated bathtub into a sleek, modern walk-in shower. Perfect for improving accessibility, increasing space, and updating your Austin bathroom with contemporary style.
              </p>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-4xl">⚡</div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-600">1-Day Install</div>
                    <div className="text-sm text-gray-600">Most conversions completed in 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call 512-706-9577
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-cyan-600 rounded-lg font-medium text-cyan-600 hover:bg-cyan-50 transition-all text-lg"
                >
                  Get Free Quote
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Financing Available</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Warranty Included</span>
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
                  src="/IMG_2329 Ben.jpeg" 
                  alt="Tub to shower conversion in Austin, TX" 
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-4xl font-bold text-cyan-600">300+</div>
                <div className="text-sm text-gray-600">Conversions Done</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Why Convert Your <span className="text-cyan-600">Tub to a Shower?</span>
            </h2>
            <p className="text-xl text-gray-600">Modern benefits for Austin homeowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Options/Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Conversion <span className="text-cyan-600">Packages</span>
            </h2>
            <p className="text-xl text-gray-600">Choose the perfect option for your Austin bathroom</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conversionOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  option.popular 
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-2xl scale-105' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <h3 className={`text-2xl font-semibold mb-2 ${option.popular ? 'text-white' : 'text-gray-900'}`}>
                  {option.name}
                </h3>
                <div className={`text-4xl font-bold mb-6 ${option.popular ? 'text-white' : 'text-cyan-600'}`}>
                  {option.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${option.popular ? 'text-cyan-200' : 'text-cyan-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={option.popular ? 'text-cyan-50' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-lg font-medium transition-all ${
                    option.popular
                      ? 'bg-white text-cyan-600 hover:bg-cyan-50'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  Get This Package
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            All packages include professional installation, cleanup, and warranty. Custom options available.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Our <span className="text-cyan-600">Conversion Process</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, efficient, and stress-free</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-cyan-50 to-white rounded-2xl p-6 shadow-md border border-cyan-100 h-full">
                  <div className="text-5xl font-bold text-cyan-200 mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="text-xs text-cyan-600 font-medium">⏱️ {item.duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Austin <span className="text-cyan-600">Transformations</span>
            </h2>
            <p className="text-xl text-gray-600">See the amazing results from our conversion projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/IMG_2329 Ben.jpeg', alt: 'Tub to shower conversion Austin' },
              { src: '/IMG_7767 Ben.jpeg', alt: 'Walk-in shower conversion' },
              { src: '/IMG_2324 Ben.jpeg', alt: 'Modern shower after tub removal' },
              { src: '/IMG_0387 Ben.jpeg', alt: 'Custom shower conversion' },
              { src: '/IMG_1551 Ben.jpeg', alt: 'Bathroom conversion project' },
              { src: '/IMG_6283 Ben.jpeg', alt: 'Completed shower remodel' }
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
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Frequently Asked <span className="text-cyan-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Common questions about tub to shower conversions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-light text-white">
              Ready to Convert Your Tub?
            </h2>
            <p className="text-xl text-cyan-50">
              Get your free quote and transform your Austin bathroom in just 1-2 days!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-lg font-medium text-cyan-600 hover:bg-cyan-50 transition-all text-lg shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 512-706-9577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-medium text-white hover:bg-white/10 transition-all text-lg"
              >
                Schedule Free Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="pt-8 flex justify-center gap-8 text-white/90 flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>1-Day Install</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Financing Available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Warranty Included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
