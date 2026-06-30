import Link from 'next/link'
import { cursos, getCursoById } from '../../../data/cursos'

export function generateStaticParams() {
  return cursos.map((curso) => ({
    id: curso.id
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const curso = getCursoById(id)

  return {
    title: curso
      ? `${curso.nombre} | Portal Publico ISIL`
      : 'Curso no encontrado | Portal Publico ISIL'
  }
}

export default async function CursoDetallePage({ params }) {
  const { id } = await params
  const curso = getCursoById(id)

  if (!curso) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <p className="eyebrow">Curso no encontrado</p>
          <h1>No encontramos un curso con el codigo solicitado.</h1>
          <p>
            Puede que el enlace este incompleto o que el curso ya no este
            publicado en el catalogo.
          </p>
          <Link className="primary-button" href="/catalogo">
            Volver al catalogo
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section detail-layout">
      <div className="detail-main">
        <Link className="back-link" href="/catalogo">
          Volver al catalogo
        </Link>
        <span className="tag">{curso.categoria}</span>
        <h1>{curso.nombre}</h1>
        <p className="lead">{curso.descripcion}</p>

        <h2>Lo que aprenderas</h2>
        <ul className="learning-list">
          {curso.aprendizajes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <aside className="detail-panel" aria-label="Informacion del curso">
        <dl className="detail-meta">
          <div>
            <dt>Duracion</dt>
            <dd>{curso.duracion}</dd>
          </div>
          <div>
            <dt>Modalidad</dt>
            <dd>{curso.modalidad}</dd>
          </div>
          <div>
            <dt>Nivel</dt>
            <dd>{curso.nivel}</dd>
          </div>
        </dl>
      </aside>
    </section>
  )
}
