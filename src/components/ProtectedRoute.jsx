import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-secondary-600">Loading...</p>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}
