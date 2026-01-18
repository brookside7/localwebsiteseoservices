import { useState } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { supabase } from '../lib/supabaseClient'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: submitError } = await supabase.from('leads').insert([
        {
          ...formData,
          source: 'contact_page',
        },
      ])

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        message: '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-secondary-600">
              Ready to grow your business? Contact us for a free consultation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">
                  Error: {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service_interest" className="block text-sm font-semibold text-secondary-700 mb-2">
                  Service Interest
                </label>
                <select
                  id="service_interest"
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="Google Business Profile">Google Business Profile Optimization</option>
                  <option value="Local Citations">Local Citations & NAP Cleanup</option>
                  <option value="Review Management">Review & Reputation Management</option>
                  <option value="Technical SEO">Technical SEO</option>
                  <option value="Full Service">Full Service Package</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
