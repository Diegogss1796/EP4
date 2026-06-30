import './globals.css'

export const metadata = {
  title: 'Portal Publico ISIL',
  description: 'Modulo publico en Next.js para consultar cursos disponibles.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <nav className="nav-shell" aria-label="Navegacion principal">
            <a className="brand" href="/">
              Portal Publico ISIL
            </a>
            <div className="nav-links">
              <a href="/">Inicio</a>
              <a href="/catalogo">Catalogo</a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
