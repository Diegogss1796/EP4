import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="page-center">
      <div className="locked-view fade-in">
        <div className="locked-icon">404</div>
        <div className="locked-title">Página no encontrada</div>
        <div className="locked-sub">La ruta que buscas no existe.</div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Ir al inicio</button>
      </div>
    </div>
  )
}
