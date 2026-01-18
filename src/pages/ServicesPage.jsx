import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function ServicesPage() {
  const services = [
    {
      title: 'Google Business Profile Optimization',
      description: 'Complete optimization of your Google Business Profile to maximize visibility in local search and Google Maps.',
      features: [
        'Complete profile optimization',
        'Category selection and optimization',
        'Regular post creation',
        'Photo optimization',
        'Q&A management',
      ],
    },
    {
      title: 'Local Citations & NAP Cleanup',
      description: 'Build and maintain consistent business citations across the web to improve local search rankings.',
      features: [
        'Citation building on top directories',
        'NAP consistency audit',
        'Duplicate listing removal',
        'Ongoing citation monitoring',
        'Monthly reporting',
      ],
    },
    {
      title: 'Review & Reputation Management',
      description: 'Systematic approach to generating positive reviews and managing your online reputation.',
      features: [
        'Review generation campaigns',
        'Review monitoring and alerts',
        'Response management',
        'Reputation analysis',
        'Customer feedback integration',
      ],
    },
    {
      title: 'Technical SEO',
      description: 'Ensure your website meets all technical requirements for optimal search engine performance.',
      features: [
        'Site speed optimization',
        'Mobile responsiveness',
        'Schema markup implementation',
        'XML sitemap creation',
        'Technical audit and fixes',
      ],
    },
  ]

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-secondary-600">
              Comprehensive local SEO solutions designed to help your business dominate local search results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-600 font-bold mr-3">✓</span>
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Custom Packages Available
          </h2>
          <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
            Every business is unique. We'll create a custom package tailored to your specific needs and goals.
          </p>
          <Link to="/contact">
            <Button size="lg">Schedule Your Free Consultation</Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
