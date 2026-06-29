/**
 * pages/CourseDetailPage.jsx
 * Detalle de un curso individual (ruta protegida con parámetro :id).
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import courseService from '../services/courseService'

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    courseService.getCourseById(id)
      .then((data) => { if (!data) setError('Curso no encontrado.'); else setCourse(data) })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="dashboard fade-in">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/cursos')} style={{ marginBottom: 24 }}>← Volver a cursos</button>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, margin: '0 auto 12px' }} />
          </div>
        )}
        {error && <div className="alert alert-error"><span className="alert-icon">⚠️</span>{error}</div>}
        {course && (
          <>
            <div className="dash-hero">
              <div className="dash-greeting">Detalle del curso</div>
              <div className="dash-name">{course.nombre}</div>
              <div className="dash-sub">{course.docente}</div>
            </div>
            <div className="info-grid" style={{ marginTop: 24 }}>
              <div className="info-card">
                <div className="info-card-title">📋 Información del curso</div>
                {[
                  ['ID',          course.id],
                  ['Nombre',      course.nombre],
                  ['Docente',     course.docente],
                  ['Créditos',    course.creditos],
                  ['Horario',     course.horario],
                  ['Cupos total', course.cupos],
                  ['Disponibles', course.disponibles],
                ].map(([k, v]) => (
                  <div key={k} className="info-row">
                    <span className="info-key">{k}</span>
                    <span className="info-val">{v}</span>
                  </div>
                ))}
              </div>
              <div className="info-card">
                <div className="info-card-title">📊 Estado de disponibilidad</div>
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: course.disponibles > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {course.disponibles}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>cupos disponibles de {course.cupos}</div>
                </div>
                <button
                  className="btn btn-primary btn-full"
                  disabled={course.disponibles === 0}
                  onClick={() => alert('Preinscripción enviada')}
                >
                  {course.disponibles === 0 ? 'Sin cupos disponibles' : '📝 Preinscribirse ahora'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
