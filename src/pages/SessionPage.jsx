/**
 * pages/SessionPage.jsx
 * Muestra el estado de sesión, el token JWT decodificado y el análisis de almacenamiento.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSession } from '../hooks/useSession'

export default function SessionPage() {
  const { logout } = useAuth()
  const { user, inspection, tokenAge, expiresIn } = useSession()
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')

  const handleLogout = () => { logout(); navigate('/login') }

  const storageOptions = [
    { name: 'sessionStorage ✅ (en uso)',    pros: 'Se borra al cerrar la pestaña, no persiste entre sesiones',  cons: 'Accesible desde JS — riesgo XSS',               when: 'SPA estándar' },
    { name: 'localStorage',                  pros: 'Persiste entre recargas y pestañas',                         cons: 'Mayor riesgo XSS, persiste demasiado',           when: 'Solo si es imprescindible' },
    { name: 'httpOnly Cookie ⭐ (producción)', pros: 'No accesible desde JS, protección XSS automática',          cons: 'Requiere configuración en servidor y CORS',      when: 'Producción — la más segura' },
  ]

  return (
    <div className="dashboard fade-in">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} style={{ marginBottom: 24 }}>← Volver</button>

        <div className="dash-hero" style={{ marginBottom: 24 }}>
          <div className="dash-greeting">Parte 1 — Manejo de sesión</div>
          <div className="dash-name">Estado de autenticación</div>
          <div className="dash-sub">Inspección del token JWT almacenado en sessionStorage</div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {[['info', '📊 Estado'], ['token', '🔑 Token JWT'], ['storage', '💾 Almacenamiento']].map(([id, label]) => (
            <button key={id} className={`tab-btn${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {/* Tab: Estado */}
        {tab === 'info' && (
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-title">🔐 Estado de sesión</div>
              <div className="session-state">
                <div className="ss-row"><span className="ss-key">Autenticado</span><span className="ss-dot-on" /><span style={{ fontSize: 12, color: 'var(--success)' }}>Sí</span></div>
                <div className="ss-row"><span className="ss-key">Token presente</span><span className="ss-dot-on" /><span style={{ fontSize: 12, color: 'var(--success)' }}>Sí</span></div>
                <div className="ss-row"><span className="ss-key">Token válido</span><span className="ss-dot-on" /><span style={{ fontSize: 12, color: 'var(--success)' }}>Sí</span></div>
                <div className="ss-row"><span className="ss-key">Tiempo de sesión</span><span className="info-val" style={{ fontSize: 13 }}>{tokenAge}</span></div>
                <div className="ss-row"><span className="ss-key">Expira en</span><span className="pill pill-amber">{expiresIn}</span></div>
              </div>
              <button className="btn btn-danger btn-full" style={{ marginTop: 16 }} onClick={handleLogout}>
                🚪 Cerrar sesión
              </button>
            </div>

            <div className="info-card">
              <div className="info-card-title">👤 Payload decodificado</div>
              {['sub', 'name', 'email', 'role', 'codigo', 'carrera', 'ciclo'].map((k) => (
                <div key={k} className="info-row">
                  <span className="info-key">{k}</span>
                  <span className="info-val" style={{ fontSize: 12, maxWidth: '60%', textAlign: 'right', wordBreak: 'break-all' }}>
                    {String(inspection?.payload?.[k] ?? '—')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Token */}
        {tab === 'token' && (
          <div className="info-card">
            <div className="info-card-title">🔑 Token JWT completo</div>
            <div className="alert alert-info" style={{ marginBottom: 14 }}>
              <span className="alert-icon">ℹ️</span>
              <span>Un JWT tiene 3 partes separadas por puntos: <strong>header · payload · firma</strong></span>
            </div>
            <div className="token-block">
              <div className="token-label" style={{ marginBottom: 8 }}>Token raw (sessionStorage)</div>
              <div className="token-parts">
                <span className="token-part tp-header">{inspection?.parts?.[0]}</span>
                <span style={{ color: 'var(--subtle)' }}>.</span>
                <span className="token-part tp-payload">{inspection?.parts?.[1]}</span>
                <span style={{ color: 'var(--subtle)' }}>.</span>
                <span className="token-part tp-sig">{inspection?.parts?.[2]}</span>
              </div>
            </div>
            {[
              { label: '🔴 Header', color: '#FCA5A5', data: inspection?.header },
              { label: '🟡 Payload', color: '#FCD34D', data: inspection?.payload },
            ].map(({ label, color, data }) => (
              <div key={label} className="token-block" style={{ marginTop: 12 }}>
                <div className="token-label" style={{ color }}>{label} (decodificado)</div>
                <pre style={{ color, marginTop: 8, fontSize: 11, fontFamily: 'monospace', lineHeight: 1.6, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ))}
            <div className="token-block" style={{ marginTop: 12 }}>
              <div className="token-label" style={{ color: '#86EFAC' }}>🟢 Signature</div>
              <div style={{ color: '#86EFAC', marginTop: 8, fontSize: 11, fontFamily: 'monospace' }}>HMAC-SHA256(header + "." + payload, SECRET_KEY)</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>En producción se verifica en el servidor. Aquí es simulada.</div>
            </div>
          </div>
        )}

        {/* Tab: Almacenamiento */}
        {tab === 'storage' && (
          <div className="info-card">
            <div className="info-card-title">💾 Comparativa de almacenamiento del token</div>
            <div className="alert alert-success" style={{ marginBottom: 16 }}>
              <span className="alert-icon">✅</span>
              <span>Esta app usa <strong>sessionStorage</strong> — el token desaparece al cerrar la pestaña.</span>
            </div>
            {storageOptions.map((opt, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>{opt.name}</div>
                <div className="info-row"><span className="info-key">Ventajas</span><span style={{ fontSize: 12, color: '#86EFAC' }}>{opt.pros}</span></div>
                <div className="info-row"><span className="info-key">Desventajas</span><span style={{ fontSize: 12, color: '#FCA5A5' }}>{opt.cons}</span></div>
                <div className="info-row"><span className="info-key">Cuándo usar</span><span style={{ fontSize: 12 }}>{opt.when}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
