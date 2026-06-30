import Link from 'next/link'
import { cursos } from '../data/cursos'

export default function HomePage() {
  const totalCursos = cursos.length

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="eyebrow">Parte 3 - Modulo publico en Next.js</p>
        <h1>Explora cursos disponibles para potenciar tu perfil profesional.</h1>
        <p className="hero-copy">
          Consulta una oferta publica de cursos, revisa informacion clave y
          accede al detalle generado con rutas estaticas.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href="/catalogo">
            Ver catalogo
          </Link>
          <span className="hero-stat">{totalCursos} cursos publicados</span>
        </div>
      </div>
    </section>
  )
}
