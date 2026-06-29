/**
 * pages/LoginPage.jsx
 * Vista de inicio de sesión con validación, manejo de errores y estados de carga.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [fieldErr, setFieldErr] = useState({})

  const demoUsers = authService.getDemoCredentials()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Formato de correo inválido'
    if (!password) errs.password = 'La contraseña es obligatoria'
    else if (password.length < 4) errs.password = 'Mínimo 4 caracteres'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const errs = validate()
    setFieldErr(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (u) => {
    setEmail(u.email)
    setPassword(u.password)
    setError('')
    setFieldErr({})
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: 420 }} className="fade-in">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>🎓</div>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Portal del Estudiante</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>Instituto San Ignacio de Loyola</p>
        </div>

        <div className="card">
          {error && (
            <div className="alert alert-error" role="alert">
              <span className="alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo institucional</label>
              <input
                id="email"
                type="email"
                className={`form-control${fieldErr.email ? ' error' : ''}`}
                placeholder="usuario@isil.pe"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErr((p) => ({ ...p, email: '' })) }}
                autoComplete="email"
                disabled={loading}
              />
              {fieldErr.email && <span className="form-error">{fieldErr.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                type="password"
                className={`form-control${fieldErr.password ? ' error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErr((p) => ({ ...p, password: '' })) }}
                autoComplete="current-password"
                disabled={loading}
              />
              {fieldErr.password && <span className="form-error">{fieldErr.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? <><span className="spinner" /> Verificando...</> : 'Iniciar sesión'}
            </button>
          </form>

          {/* Usuarios de demo */}
          <div style={{ marginTop: 20, padding: 14, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 10 }}>Usuarios de prueba</div>
            {demoUsers.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', fontSize: 13, borderBottom: i < demoUsers.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{u.name} <span className="role-badge" style={{ marginLeft: 4 }}>{u.role}</span></div>
                  <div style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12 }}>{u.email} / {u.password}</div>
                </div>
                <button
                  type="button"
                  onClick={() => fillDemo(u)}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--accent)', fontSize: 11, padding: '2px 8px', cursor: 'pointer' }}
                >
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--subtle)', marginTop: 16 }}>
          PA4 · Programación Web II · Parte 1 — Autenticación
        </p>
      </div>
    </div>
  )
}
