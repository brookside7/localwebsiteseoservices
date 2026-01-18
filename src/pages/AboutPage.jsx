import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function AboutPage() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6">
              About Local SEO Services
            </h1>
            <p className="text-xl text-secondary-600">
              We help local businesses dominate their market through proven SEO strategies and transparent results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 mb-4">
                At Local SEO Services, we believe that every local business deserves the opportunity to be found by customers actively searching for their services.
              </p>
              <p className="text-lg text-secondary-600 mb-4">
                Our mission is to level the playing field by providing enterprise-level SEO strategies to businesses of all sizes.
              </p>
              <p className="text-lg text-secondary-600">
                We focus on delivering measurable results through transparent reporting and proven methodologies that help our clients achieve sustainable growth.
              </p>
            </div>
            <div className="bg-primary-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Why We're Different</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">✓</span>
                  <span className="text-secondary-700">Data-driven strategies backed by real results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">✓</span>
                  <span className="text-secondary-700">Transparent monthly reporting on all activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">✓</span>
                  <span className="text-secondary-700">Focus on long-term sustainable growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">✓</span>
                  <span className="text-secondary-700">Dedicated account managers for personalized service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you dominate local search results and attract more customers.
          </p>
          <Link to="/contact">
            <Button size="lg">Get Your Free Consultation</Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
