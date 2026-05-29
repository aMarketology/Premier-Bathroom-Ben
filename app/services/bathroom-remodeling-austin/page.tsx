'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ServiceLeadForm from '../../components/ServiceLeadForm'

export default function BathroomRemodelingAustin() {
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

  const faqs = [
    {
      question: "How long does a bathroom remodel take in Austin?",
      answer: "Most bathroom remodels in Austin take 2-4 weeks depending on the scope of work. Simple updates can be completed in 1-2 weeks, while full renovations may take 4-6 weeks."
    },
    {
      question: "How much does bathroom remodeling cost in Austin, TX?",
      answer: "Bathroom remodeling costs in Austin typically range from $10,000 to $35,000 depending on size, materials, and scope. We offer free consultations and detailed quotes."
    },
    {
      question: "Do I need permits for bathroom remodeling in Austin?",
      answer: "Yes, most bathroom remodels in Austin require permits, especially if you're moving plumbing or electrical. We handle all permit applications for you."
    },
    {
      question: "What areas of Austin do you serve?",
      answer: "We serve all of Austin and surrounding areas including Rollingwood, Manchaca, Pflugerville, Round Rock, Cedar Park, and more."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Schema Markup */}
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
              className="space-y-5 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Austin's Trusted Experts</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
                Bathroom Remodeling
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">Austin, TX</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your bathroom into a stunning, functional space with Premier Bathroom Remodel Austin. Expert craftsmanship, quality materials, and personalized designs for homeowners across Austin and surrounding areas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:512-706-9577"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call 512-706-9577
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all text-lg"
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
                  <span className="font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Free Consultations</span>
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
                service="full-bathroom-remodel"
                serviceLabel="Full Bathroom Remodel"
                accentColor="blue"
                pageLocation="Hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Strip — social proof right after hero */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Real Austin Projects — Completed by Ben</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { src: '/bathroom remodel/DSCF8715.JPG', alt: 'Bathroom remodel Austin TX' },
              { src: '/bathroom remodel/DSCF8719.JPG', alt: 'Full bathroom renovation Austin' },
              { src: '/bathroom remodel/DSCF8729.JPG', alt: 'Custom bathroom design Austin' },
              { src: '/bathroom remodel/DSCF8746.JPG', alt: 'Master bath remodel Austin TX' },
              { src: '/bathroom remodel/DSCF8758.JPG', alt: 'Luxury bathroom renovation Austin' },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Our Comprehensive <span className="text-blue-600">Remodeling Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to completion, we handle every aspect of your bathroom renovation in Austin, TX
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Our <span className="text-blue-600">Remodeling Process</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, transparent, and stress-free</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Free Consultation',
                description: 'We visit your Austin home, discuss your vision, take measurements, and provide a detailed quote.'
              },
              {
                step: '02',
                title: 'Custom Design',
                description: 'Our team creates a personalized design plan with material selections and 3D renderings.'
              },
              {
                step: '03',
                title: 'Expert Installation',
                description: 'Our licensed professionals transform your bathroom with quality craftsmanship and attention to detail.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="text-6xl font-bold text-blue-100 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-3">
                Austin Bathroom <span className="text-blue-600">Transformations</span>
              </h2>
              <p className="text-xl text-gray-600">Real projects completed by Ben across Austin</p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors shrink-0"
            >
              See Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Featured large + grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/bathroom remodel/DSCF8715.JPG"
                alt="Full bathroom remodel Austin TX — completed by Premier Bathroom Remodel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3 py-1.5 bg-white/90 rounded-full text-xs font-semibold text-blue-700">Austin, TX</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: '/bathroom remodel/DSCF8719.JPG', alt: 'Full bathroom renovation Austin' },
                { src: '/bathroom remodel/DSCF8729.JPG', alt: 'Custom bathroom design Austin TX' },
                { src: '/bathroom remodel/DSCF8746.JPG', alt: 'Master bathroom remodel Austin' },
                { src: '/bathroom remodel/DSCF8758.JPG', alt: 'Luxury bathroom renovation Austin TX' },
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row — room to add more photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/IMG_0387 Ben.jpeg', alt: 'Bathroom remodel Austin homeowner' },
              { src: '/IMG_2305 Ben.jpeg', alt: 'Custom vanity installation Austin' },
              { src: '/IMG_5970 Ben.jpeg', alt: 'Tile work bathroom Austin TX' },
              { src: '/IMG_7767 Ben.jpeg', alt: 'Complete bathroom renovation Austin' },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-all"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Ben Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/IMG_1412 Ben.jpeg"
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
                I'm Ben, the owner and lead installer at Premier Bathroom Remodel Austin. I personally oversee every project — you'll never deal with a sales rep or a subcontractor who doesn't know your job.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I've been remodeling Austin bathrooms for over 15 years. My focus is simple: deliver a bathroom you love, on time, with no surprises. Every tile set, every fixture installed, every detail checked — by me.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: '15+', sub: 'Years Experience' },
                  { label: '200+', sub: 'Austin Bathrooms' },
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

      {/* FAQ Section for SEO */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about bathroom remodeling in Austin</p>
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

      {/* Local SEO Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Serving <span className="text-blue-600">Austin & Beyond</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Premier Bathroom Remodel Austin proudly serves homeowners throughout the Austin metropolitan area and surrounding communities. Our team of expert bathroom remodelers brings quality craftsmanship and personalized service to every project.
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Austin</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Rollingwood</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Manchaca</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Pflugerville</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Round Rock</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Cedar Park</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/IMG_2324 Ben.jpeg" 
                alt="Bathroom remodeling contractor in Austin TX" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-light text-white">
              Ready to Transform Your Bathroom?
            </h2>
            <p className="text-xl text-blue-50">
              Get your free consultation and quote today. Call us or schedule online!
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
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-medium text-white hover:bg-white/10 transition-all text-lg"
              >
                Schedule Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="pt-8 flex justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

