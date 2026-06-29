/**
 * components/ProtectedRoute.jsx
 * Guarda de ruta: redirige al login si no hay sesión activa.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return (
      <div className="page-center">
        <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Control de acceso por rol (RBAC)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/acceso-denegado" replace />
  }

  return children
}
