'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    { 
      src: '/IMG_0387 Ben.jpeg', 
      title: 'Modern Bathroom Remodel', 
      category: 'Complete Remodel',
      description: 'Complete bathroom remodeling in Austin featuring contemporary fixtures, custom tile work, and premium finishes for a spa-like experience.'
    },
    { 
      src: '/IMG_1412 Ben.jpeg', 
      title: 'Luxury Shower Installation', 
      category: 'Shower Remodel',
      description: 'Professional shower remodel in Austin with frameless glass enclosure, rainfall showerhead, and elegant tile patterns for modern living.'
    },
    { 
      src: '/IMG_1551 Ben.jpeg', 
      title: 'Contemporary Bathroom Design', 
      category: 'Complete Remodel',
      description: 'Full bathroom renovation showcasing sleek vanities, energy-efficient lighting, and beautiful countertops by Austin bathroom remodeling experts.'
    },
    { 
      src: '/IMG_2305 Ben.jpeg', 
      title: 'Custom Tile Work', 
      category: 'Tile Installation',
      description: 'Expert tile installation featuring precision craftsmanship in shower walls, flooring, and accent details for Austin bathroom projects.'
    },
    { 
      src: '/IMG_2324 Ben.jpeg', 
      title: 'Walk-in Bath Installation', 
      category: 'Walk-in Bath',
      description: 'Safe and accessible walk-in bath installation in Austin TX with low threshold entry and therapeutic features for enhanced mobility.'
    },
    { 
      src: '/IMG_2329 Ben.jpeg', 
      title: 'Elegant Vanity Installation', 
      category: 'Vanity & Fixtures',
      description: 'Premium bathroom vanity installation with double sinks, modern faucets, and ample storage for functional bathroom remodeling in Austin.'
    },
    { 
      src: '/IMG_2596 Ben.jpeg', 
      title: 'Designer Bathroom Upgrade', 
      category: 'Complete Remodel',
      description: 'Classic bathroom transformation combining traditional elegance with modern functionality through expert Austin bathroom renovation services.'
    },
    { 
      src: '/IMG_5970 Ben.jpeg', 
      title: 'Tub to Shower Conversion', 
      category: 'Shower Conversion',
      description: 'Professional tub to shower conversion in Austin featuring walk-in accessibility, custom tile, and modern fixtures for easier daily use.'
    },
    { 
      src: '/IMG_6283 Ben.jpeg', 
      title: 'Spa-Style Bathroom', 
      category: 'Luxury Remodel',
      description: 'Luxury bathroom remodeling in Austin with high-end materials, ambient lighting, and spa-inspired design for ultimate relaxation.'
    },
    { 
      src: '/IMG_7767 Ben.jpeg', 
      title: 'Premium Flooring Installation', 
      category: 'Flooring',
      description: 'Beautiful bathroom flooring installation featuring durable, waterproof materials with modern patterns for Austin bathroom projects.'
    },
    { 
      src: '/IMG_8122 Ben.jpeg', 
      title: 'Modern Fixtures & Lighting', 
      category: 'Bathroom Update',
      description: 'Contemporary bathroom update in Austin with LED lighting, chrome fixtures, and coordinated hardware for a fresh, modern look.'
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-6">
              <span className="text-sm font-bold uppercase tracking-wider">Our Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bathroom Remodeling <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our stunning collection of bathroom transformations across Austin. Each project showcases our commitment to quality craftsmanship and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="flex-1 py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <p className="font-bold text-lg">Click to View</p>
                    </div>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{image.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mt-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Austin, TX
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {selectedImage < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Next"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] mb-4">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
              <p className="text-blue-300 mb-2">{galleryImages[selectedImage].category}</p>
              <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Bathroom?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's bring your vision to life. Contact us today for a free consultation and estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:512-706-9577" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (512) 706-9577
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all text-lg shadow-lg"
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
