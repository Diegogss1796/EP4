export default function CourseCard({ course, onEnroll, enrolling }) {
  const isFull = course.availableSeats === 0
  const isEnrollingThis = enrolling === course.id

  return (
    <div className="info-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {isFull && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="pill pill-red">Lleno</span>
        </div>
      )}

      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>{course.title}</div>

      {[
        ['Docente', course.instructor],
        ['Créditos', course.credits ?? '—'],
        ['Horario', course.schedule],
        ['Cupos', `${course.availableSeats}/${course.totalSeats} disponibles`],
      ].map(([k, v]) => (
        <div key={k} className="info-row">
          <span className="info-key">{k}</span>
          <span className="info-val" style={{ fontSize: 13 }}>{v}</span>
        </div>
      ))}

      <button
        className="btn btn-primary btn-full btn-sm"
        style={{ marginTop: 14 }}
        disabled={isFull || isEnrollingThis}
        onClick={() => onEnroll(course.id)}
      >
        {isEnrollingThis
          ? <><span className="spinner" /> Procesando...</>
          : isFull ? 'Sin cupos' : ' Preinscribirse'}
      </button>
    </div>
  )
}
