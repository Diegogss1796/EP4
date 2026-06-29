/**
 * components/Navbar.jsx
 * Barra de navegación principal con info de sesión y botón de logout.
 */

import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (!isAuthenticated || location.pathname === '/login') return null

  const initials = user?.name?.split(' ').map((w) => w[0]).slice(0, 2).join('') || '?'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Navegación principal">
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => navigate('/dashboard')}>
          <span className={styles.brandIcon} aria-hidden="true">🎓</span>
          Portal ISIL
        </button>

        <div className={styles.right}>
          <div className={styles.userChip}>
            <div className={styles.avatar} aria-hidden="true">{initials}</div>
            <span>{user?.name?.split(' ')[0]}</span>
            <span className="role-badge">{user?.role}</span>
          </div>

          <button className="btn btn-sm btn-ghost" onClick={() => navigate('/sesion')}>
            🔐 Sesión
          </button>

          <button className="btn btn-sm btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
