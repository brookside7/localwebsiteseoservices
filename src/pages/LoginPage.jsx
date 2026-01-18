import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: signInError } = await signIn(email, password)
      if (signInError) throw signInError
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2 text-center">
              Admin Login
            </h1>
            <p className="text-secondary-600 mb-8 text-center">
              Sign in to access the admin dashboard
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-secondary-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
