/**
 * hooks/useSession.js
 * Hook que expone información detallada del estado de sesión actual.
 */

import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { inspectToken } from '../utils/jwt'
import authService from '../services/authService'

export function useSession() {
  const { user, token, isAuthenticated } = useAuth()

  const inspection = useMemo(() => {
    const raw = authService.getToken()
    return inspectToken(raw)
  }, [token])

  const tokenAge = useMemo(() => {
    if (!inspection?.payload?.iat) return '—'
    const secs = Math.floor(Date.now() / 1000) - inspection.payload.iat
    return secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`
  }, [inspection])

  const expiresIn = useMemo(() => {
    if (!inspection?.payload?.exp) return '—'
    const secs = inspection.payload.exp - Math.floor(Date.now() / 1000)
    if (secs < 0) return 'Expirado'
    return secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`
  }, [inspection])

  return { user, token, isAuthenticated, inspection, tokenAge, expiresIn }
}
