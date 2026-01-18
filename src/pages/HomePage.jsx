import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Button from '../components/Button'

export default function HomePage() {
  const services = [
    {
      title: 'Google Business Profile Optimization',
      description: 'Maximize your visibility in local search results with a fully optimized Google Business Profile.',
      icon: '🗺️',
    },
    {
      title: 'Local Citations & NAP Cleanup',
      description: 'Build consistent citations across the web and clean up any inconsistent business information.',
      icon: '📋',
    },
    {
      title: 'Review & Reputation Management',
      description: 'Build trust and credibility with a systematic approach to generating and managing online reviews.',
      icon: '⭐',
    },
    {
      title: 'Technical SEO',
      description: 'Ensure your website meets all technical requirements for optimal search engine performance.',
      icon: '⚙️',
    },
  ]

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-secondary-900 mb-6">
              Dominate Local Search Results
            </h1>
            <p className="text-xl text-secondary-600 mb-8">
              Professional Local SEO services that help your business rank higher in Google Maps and local search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Get Started Today</Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Comprehensive local SEO solutions designed to put your business on the map
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      Proven Results
                    </h3>
                    <p className="text-secondary-600">
                      Track record of helping businesses achieve first-page rankings in local search
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      Transparent Reporting
                    </h3>
                    <p className="text-secondary-600">
                      Monthly reports showing your progress and the work we've completed
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      Local Expertise
                    </h3>
                    <p className="text-secondary-600">
                      Deep understanding of local search algorithms and ranking factors
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-secondary-600 mb-6">
                Schedule a free consultation to discuss how we can help your business grow.
              </p>
              <Link to="/contact">
                <Button className="w-full">Contact Us Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
