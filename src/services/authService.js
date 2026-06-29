/**
 * services/authService.js
 * Centraliza todas las llamadas al endpoint de autenticación.
 */

import axios from 'axios'
import { generateToken, decodeToken } from '../utils/jwt'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const DEMO_USERS = [
  { id: 1, email: 'estudiante@isil.pe', password: '123456',  name: 'Ana García',   role: 'Estudiante',    codigo: 'EST-2024-001', carrera: 'Ingeniería de Sistemas',    ciclo: '5° ciclo' },
  { id: 2, email: 'carlos@isil.pe',     password: 'pass123', name: 'Carlos Ruiz',  role: 'Estudiante',    codigo: 'EST-2024-042', carrera: 'Diseño Gráfico Digital',    ciclo: '3° ciclo' },
  { id: 3, email: 'admin@isil.pe',      password: 'admin123',name: 'María Torres', role: 'Administrador', codigo: 'ADM-001',      carrera: 'Administración del sistema', ciclo: '—' },
]

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const authService = {
  async login(email, password) {
    const USE_DEMO_MODE = true // Cambiar a false con tu API real

    if (USE_DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 900))
      const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
      if (!user) throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.')
      const token = generateToken(user)
      const { password: _, ...userSafe } = user
      return { token, user: userSafe }
    }

    const response = await apiClient.post('/auth/login', { email, password })
    return response.data
  },

  saveToken(token)   { sessionStorage.setItem('jwt_token', token) },
  getToken()         { return sessionStorage.getItem('jwt_token') },
  removeToken()      { sessionStorage.removeItem('jwt_token') },

  getValidatedPayload() {
    return decodeToken(this.getToken())
  },

  getDemoCredentials() {
    return DEMO_USERS.map(({ email, password, name, role }) => ({ email, password, name, role }))
  },
}

export default authService
