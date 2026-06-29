import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'
import { decodeToken } from '../utils/jwt'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = authService.getToken()
    if (saved) {
      const payload = decodeToken(saved)
      if (payload) {
        setUser({ id: payload.sub, name: payload.name, email: payload.email, role: payload.role, codigo: payload.codigo, carrera: payload.carrera, ciclo: payload.ciclo })
        setToken(saved)
      } else {
        authService.removeToken()
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { token: newToken, user: newUser } = await authService.login(email, password)
    authService.saveToken(newToken)
    setToken(newToken)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    authService.removeToken()
    setUser(null)
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
