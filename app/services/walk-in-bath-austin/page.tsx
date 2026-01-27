'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function WalkInBathAustin() {
  const features = [
    {
      icon: '🚪',
      title: 'Low Threshold Entry',
      description: 'Easy step-in design with minimal barrier for safe access'
    },
    {
      icon: '🛡️',
      title: 'Anti-Slip Flooring',
      description: 'Textured surfaces prevent slips and falls'
    },
    {
      icon: '🪑',
      title: 'Built-in Seating',
      description: 'Comfortable molded seat for relaxed bathing'
    },
    {
      icon: '🔒',
      title: 'Grab Bars & Handrails',
      description: 'Strategically placed for maximum stability'
    },
    {
      icon: '⚡',
      title: 'Quick-Drain Technology',
      description: 'Fast drainage system minimizes wait time'
    },
    {
      icon: '💆',
      title: 'Therapeutic Jets',
      description: 'Optional hydrotherapy for pain relief'
    },
    {
      icon: '♿',
      title: 'ADA Compliant Design',
      description: 'Meets all accessibility standards'
    },
    {
      icon: '✅',
      title: 'Lifetime Warranty',
      description: 'Quality guaranteed for peace of mind'
    }
  ]

  const benefits = [
    'Enhanced safety and independence',
    'Reduced risk of bathroom falls',
    'Maintain dignity and privacy',
    'Age in place comfortably',
    'Increase home value',
    'Therapeutic health benefits',
    'Easy maintenance and cleaning',
    'Professional installation'
  ]

  const faqs = [
    {
      question: "How much does a walk-in bath cost in Austin?",
      answer: "Walk-in bath installation in Austin typically ranges from $5,000 to $15,000 depending on features, size, and customization. We offer free in-home consultations and financing options."
    },
    {
      question: "How long does walk-in bath installation take?",
      answer: "Most walk-in bath installations in Austin are completed in 1-2 days. Our professional team works efficiently to minimize disruption to your daily routine."
    },
    {
      question: "Are walk-in baths covered by insurance or Medicare?",
      answer: "Some insurance plans and Medicare Advantage plans may cover walk-in baths if deemed medically necessary. We can help you explore coverage options and provide documentation."
    },
    {
      question: "Can I get help paying for a walk-in bath in Austin?",
      answer: "Yes! We offer financing options, and you may qualify for VA benefits, Medicaid waivers, or Texas Department of Aging grants. Contact us to discuss available assistance programs."
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
                <span className="text-xs font-medium text-cyan-600 uppercase tracking-widest">Safety & Accessibility</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight">
                Walk-in Bath
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-700 bg-clip-text text-transparent">Austin, TX</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Experience enhanced safety, accessibility, and independence with premium walk-in bath installations. Perfect for seniors and individuals with mobility concerns throughout Austin and surrounding areas.
              </p>

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
                  Free Consultation
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">ADA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">1-2 Day Install</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Financing Available</span>
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
                  src="/IMG_2324 Ben.jpeg" 
                  alt="Walk-in bath installation in Austin, TX" 
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-4xl font-bold text-cyan-600">Safe</div>
                <div className="text-sm text-gray-600">& Accessible</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Walk-in Bath <span className="text-cyan-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600">Combining safety, comfort, and therapeutic benefits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/IMG_1412 Ben.jpeg" 
                alt="Safe walk-in bathtub for seniors in Austin" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Why Choose a <span className="text-cyan-600">Walk-in Bath?</span>
              </h2>
              <p className="text-lg text-gray-600">
                Walk-in baths provide the perfect solution for maintaining independence while ensuring safety. Our Austin customers love the peace of mind that comes with accessible bathing.
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
                >
                  Get Your Free Quote
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Simple <span className="text-cyan-600">Installation Process</span>
            </h2>
            <p className="text-xl text-gray-600">From consultation to completion in just a few days</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Free Assessment',
                description: 'We visit your Austin home to assess your bathroom and discuss your needs.'
              },
              {
                step: '02',
                title: 'Custom Selection',
                description: 'Choose from various models, features, and finishes to match your style.'
              },
              {
                step: '03',
                title: 'Professional Install',
                description: 'Our certified technicians complete installation in 1-2 days.'
              },
              {
                step: '04',
                title: 'Safety Training',
                description: 'We provide full training on all features and safety functions.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-cyan-50 to-white rounded-2xl p-6 shadow-md border border-cyan-100 h-full">
                  <div className="text-5xl font-bold text-cyan-200 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Frequently Asked <span className="text-cyan-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about walk-in baths</p>
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
              Ready for Safer Bathing?
            </h2>
            <p className="text-xl text-cyan-50">
              Schedule your free in-home consultation today. Serving Austin and all surrounding areas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-706-9577"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-lg font-medium text-cyan-600 hover:bg-cyan-50 transition-all text-lg shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 512-706-9577 Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-medium text-white hover:bg-white/10 transition-all text-lg"
              >
                Request Free Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <p className="text-sm text-cyan-100 pt-4">
              Serving Austin, Rollingwood, Manchaca, Pflugerville, Round Rock, Cedar Park & Beyond
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
