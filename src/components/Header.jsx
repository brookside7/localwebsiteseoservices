import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAdmin, signOut } = useAuth()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-secondary-900">Local SEO Services</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-secondary-600 hover:text-primary-600'
                } pb-1 transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`${
                  isActive('/admin')
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-secondary-600 hover:text-primary-600'
                } pb-1 transition-colors duration-200`}
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={signOut}
                className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-secondary-600 hover:text-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 ${
                  isActive(item.path) ? 'text-primary-600' : 'text-secondary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`block py-2 ${
                  isActive('/admin') ? 'text-primary-600' : 'text-secondary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOut()
                  setIsMenuOpen(false)
                }}
                className="block py-2 text-secondary-600"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-secondary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
