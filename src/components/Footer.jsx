import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Local SEO Services</h3>
            <p className="text-secondary-300">
              Helping local businesses dominate their market with proven SEO strategies.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/google-business-profile" className="text-secondary-300 hover:text-white transition-colors">
                  Google Business Profile
                </Link>
              </li>
              <li>
                <Link to="/services/local-citations" className="text-secondary-300 hover:text-white transition-colors">
                  Local Citations
                </Link>
              </li>
              <li>
                <Link to="/services/review-management" className="text-secondary-300 hover:text-white transition-colors">
                  Review Management
                </Link>
              </li>
              <li>
                <Link to="/services/technical-seo" className="text-secondary-300 hover:text-white transition-colors">
                  Technical SEO
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-300">
              <li>Email: info@localseo.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; {currentYear} Local SEO Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
