'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300">Learn about Premier Bathroom Remodel Austin</p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Premier Bathroom Remodel Austin is a trusted design-build firm serving the greater Austin area. We are celebrated for our innovative approach and outstanding craftsmanship in bathroom remodeling and flooring services. We serve local Austin communities with a commitment to quality, sustainability, and a seamless customer experience.
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-12">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We're proud to transform Austin homes with beautiful bathrooms and premium flooring that inspire and endure. With over 15 years of experience, Premier Bathroom Remodel Austin is your trusted partner for bathroom renovation, walk-in baths, and luxury flooring services in Texas.
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-500 mb-3">Expertise</h3>
              <p className="text-gray-700">Over 15 years of experience in bathroom remodeling and premium flooring services across Austin.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-500 mb-3">Quality</h3>
              <p className="text-gray-700">We use premium materials and proven techniques for lasting, beautiful results.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-500 mb-3">Service</h3>
              <p className="text-gray-700">Dedicated to customer satisfaction with professional, friendly, and reliable service.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-500 mb-3">Innovation</h3>
              <p className="text-gray-700">Always exploring new techniques and products to serve you better with modern solutions.</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Our Team</h2>
            <p className="text-gray-700 mb-4">
              Ready to transform your bathroom or upgrade your flooring? Get in touch today for a free consultation and quote.
            </p>
            <a 
              href="tel:512-706-9577" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded inline-block transition"
            >
              Call 512-706-9577
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
