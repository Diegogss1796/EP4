/**
 * pages/DashboardPage.jsx
 * Vista principal del estudiante autenticado (ruta protegida).
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const stats = [
    { icon: '📚', value: '8',    label: 'Cursos matriculados', color: 'var(--accent)'  },
    { icon: '✅', value: '5',    label: 'Cursos aprobados',    color: 'var(--success)' },
    { icon: '⏳', value: '3',    label: 'En progreso',         color: 'var(--warning)' },
    { icon: '🏅', value: '14.8', label: 'Promedio ponderado',  color: 'var(--accent2)' },
  ]

  return (
    <div className="dashboard fade-in">
      <div className="container">

        {/* Hero */}
        <div className="dash-hero">
          <div className="dash-greeting">¡Bienvenido de vuelta!</div>
          <div className="dash-name">{user?.name}</div>
          <div className="dash-sub">{user?.carrera}</div>
          <div className="dash-meta">
            <div className="meta-item"><div className="meta-dot" />Sesión activa</div>
            <div className="meta-item">🎓 {user?.ciclo}</div>
            <div className="meta-item">🆔 {user?.codigo}</div>
            <div className="meta-item">📧 {user?.email}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="section-title">Resumen académico</div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-title">👤 Datos del estudiante</div>
            {[
              ['Nombre completo', user?.name],
              ['Código', user?.codigo],
              ['Carrera', user?.carrera],
              ['Ciclo actual', user?.ciclo],
              ['Rol', <span className="pill pill-blue">{user?.role}</span>],
              ['Estado', <span className="pill pill-green">● Activo</span>],
            ].map(([k, v], i) => (
              <div key={i} className="info-row">
                <span className="info-key">{k}</span>
                <span className="info-val">{v}</span>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">📋 Acciones rápidas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📚', label: 'Ver cursos disponibles', path: '/cursos' },
                { icon: '🔐', label: 'Inspeccionar sesión y JWT', path: '/sesion' },
                { icon: '🛡️', label: 'Zona exclusiva del estudiante', path: '/zona-estudiante' },
              ].map((a) => (
                <button
                  key={a.path}
                  className="btn btn-ghost btn-full"
                  style={{ justifyContent: 'flex-start', gap: 12 }}
                  onClick={() => navigate(a.path)}
                >
                  <span>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>
            <div className="alert alert-info" style={{ marginTop: 18, marginBottom: 0 }}>
              <span className="alert-icon">ℹ️</span>
              <span>Vista <strong>protegida</strong>. Solo accesible con JWT válido.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
