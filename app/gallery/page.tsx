'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Gallery() {
  const galleryImages = [
    { src: '/IMG_0387 Ben.jpeg', title: 'Modern Bathroom Remodel', category: 'Complete Remodel' },
    { src: '/IMG_1412 Ben.jpeg', title: 'Luxury Shower Installation', category: 'Shower Remodel' },
    { src: '/IMG_1551 Ben.jpeg', title: 'Contemporary Bathroom Design', category: 'Complete Remodel' },
    { src: '/IMG_2305 Ben.jpeg', title: 'Custom Tile Work', category: 'Tile Installation' },
    { src: '/IMG_2324 Ben.jpeg', title: 'Premium Bathroom Renovation', category: 'Complete Remodel' },
    { src: '/IMG_2329 Ben.jpeg', title: 'Elegant Vanity Installation', category: 'Vanity & Fixtures' },
    { src: '/IMG_2596 Ben.jpeg', title: 'Designer Bathroom Upgrade', category: 'Complete Remodel' },
    { src: '/IMG_5970 Ben.jpeg', title: 'Walk-in Shower Conversion', category: 'Shower Remodel' },
    { src: '/IMG_6283 Ben.jpeg', title: 'Spa-Style Bathroom', category: 'Luxury Remodel' },
    { src: '/IMG_7767 Ben.jpeg', title: 'Master Bath Transformation', category: 'Complete Remodel' },
    { src: '/IMG_8122 Ben.jpeg', title: 'Modern Fixtures & Lighting', category: 'Bathroom Update' },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-stone-700 via-neutral-700 to-stone-800 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest mb-4 block text-stone-200">Our Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Bathroom Remodeling Gallery</h1>
            <p className="text-xl text-stone-100 max-w-3xl mx-auto font-body">
              Explore our stunning collection of bathroom transformations across Austin. Each project showcases our commitment to quality craftsmanship and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="flex-1 py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="font-bold text-xl mb-2">{image.title}</p>
                      <p className="text-sm text-stone-200 mb-3">{image.category}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Austin, TX
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-stone-700 to-neutral-800 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Transform Your Bathroom?
            </h2>
            <p className="text-xl text-stone-100 mb-8 font-body">
              Let's bring your vision to life. Contact us today for a free consultation and estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:512-706-9577" 
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-700 font-bold py-4 px-8 rounded-lg hover:bg-stone-50 transition-all shadow-lg text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 706-9577
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-stone-700 transition-all text-lg"
              >
                Get Free Estimate
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
