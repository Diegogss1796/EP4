/**
 * pages/StudentZonePage.jsx
 * Ruta protegida por rol: solo accesible para usuarios con role === 'Estudiante'.
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function StudentZonePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user?.role !== 'Estudiante') {
    return (
      <div className="dashboard fade-in">
        <div className="container">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} style={{ marginBottom: 24 }}>← Volver</button>
          <div className="locked-view">
            <div className="locked-icon">🚫</div>
            <div className="locked-title">Acceso denegado</div>
            <div className="locked-sub">Esta vista es exclusiva para estudiantes. Tu rol actual es <strong>{user?.role}</strong>.</div>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Ir al inicio</button>
          </div>
        </div>
      </div>
    )
  }

  const inscripciones = [
    { curso: 'Programación Web II',    horario: 'Mar/Jue 18:00–20:00', estado: 'Confirmada', pill: 'pill-green' },
    { curso: 'Base de Datos Avanzado', horario: 'Lun/Mie 15:00–17:00', estado: 'Pendiente',  pill: 'pill-amber' },
    { curso: 'Diseño UX/UI',           horario: 'Vie 09:00–13:00',     estado: 'Confirmada', pill: 'pill-green' },
  ]

  return (
    <div className="dashboard fade-in">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} style={{ marginBottom: 24 }}>← Volver</button>

        <div className="dash-hero">
          <div className="dash-greeting">🛡️ Zona protegida por rol</div>
          <div className="dash-name">Área exclusiva del estudiante</div>
          <div className="dash-sub">Solo usuarios autenticados con rol "Estudiante" pueden acceder aquí</div>
        </div>

        <div className="info-grid" style={{ marginTop: 24 }}>
          <div className="info-card">
            <div className="info-card-title">📋 Tus preinscripciones</div>
            {inscripciones.map((item, i) => (
              <div key={i} className="info-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 500 }}>{item.curso}</span>
                  <span className={`pill ${item.pill}`}>{item.estado}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.horario}</span>
              </div>
            ))}
          </div>

          <div className="info-card">
            <div className="info-card-title">🔒 Control de acceso por rol (RBAC)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              <p>Las rutas protegidas verifican la existencia y validez del JWT antes de renderizar el contenido.</p>
              <p>Si no hay token o ha expirado, el sistema redirige automáticamente al login.</p>
              <p>Esta vista además verifica el <strong style={{ color: 'var(--text)' }}>rol</strong> del usuario dentro del token para aplicar RBAC.</p>
              <div className="alert alert-info" style={{ marginBottom: 0 }}>
                <span className="alert-icon">💡</span>
                <span>Prueba ingresando con el usuario <strong>Administrador</strong>: verás el mensaje de acceso denegado.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
