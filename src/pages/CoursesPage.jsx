/**
 * pages/CoursesPage.jsx
 * Listado de cursos consumido desde la API con token JWT en el header.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import courseService from '../services/courseService'

export default function CoursesPage() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [enrolling, setEnrolling] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    courseService.getCourses()
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleEnroll = async (course) => {
    if (course.disponibles === 0) return
    setEnrolling(course.id)
    try {
      const res = await courseService.enroll(course.id)
      setSuccessMsg(res.message)
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnrolling(null)
    }
  }

  return (
    <div className="dashboard fade-in">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} style={{ marginBottom: 24 }}>← Volver</button>

        <div className="dash-hero" style={{ marginBottom: 24 }}>
          <div className="dash-greeting">Consumo de API con JWT</div>
          <div className="dash-name">Cursos disponibles</div>
          <div className="dash-sub">
            Datos obtenidos enviando{' '}
            <code style={{ fontSize: 12, background: 'rgba(255,255,255,.05)', padding: '1px 6px', borderRadius: 4 }}>
              Authorization: Bearer &lt;token&gt;
            </code>
          </div>
        </div>

        {successMsg && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <span>{successMsg}</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, margin: '0 auto 12px' }} />
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Cargando cursos...</p>
          </div>
        ) : (
          <div className="info-grid">
            {courses.map((c) => (
              <div key={c.id} className="info-card" style={{ position: 'relative', overflow: 'hidden' }}>
                {c.disponibles === 0 && (
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span className="pill pill-red">Lleno</span>
                  </div>
                )}
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>{c.nombre}</div>
                {[
                  ['Docente',  c.docente],
                  ['Créditos', c.creditos],
                  ['Horario',  c.horario],
                  ['Cupos',    `${c.disponibles}/${c.cupos} disponibles`],
                ].map(([k, v]) => (
                  <div key={k} className="info-row">
                    <span className="info-key">{k}</span>
                    <span className="info-val" style={{ fontSize: 13 }}>{v}</span>
                  </div>
                ))}
                <button
                  className="btn btn-primary btn-full btn-sm"
                  style={{ marginTop: 14 }}
                  disabled={c.disponibles === 0 || enrolling === c.id}
                  onClick={() => handleEnroll(c)}
                >
                  {enrolling === c.id
                    ? <><span className="spinner" /> Procesando...</>
                    : c.disponibles === 0 ? 'Sin cupos' : '📝 Preinscribirse'
                  }
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
