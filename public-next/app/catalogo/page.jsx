import Link from 'next/link'
import { cursos } from '../../data/cursos'

export const metadata = {
  title: 'Catalogo de cursos | Portal Publico ISIL'
}

export default function CatalogoPage() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Catalogo publico</p>
        <h1>Cursos disponibles</h1>
        <p>
          Revisa la informacion principal de cada curso antes de abrir el
          detalle.
        </p>
      </div>

      <div className="course-grid">
        {cursos.map((curso) => (
          <article className="course-card" key={curso.id}>
            <div>
              <span className="tag">{curso.categoria}</span>
              <h2>{curso.nombre}</h2>
              <p>{curso.resumen}</p>
            </div>
            <dl className="course-meta">
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
            <Link className="text-link" href={`/catalogo/${curso.id}`}>
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
