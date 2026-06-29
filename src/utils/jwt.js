/**
 * utils/jwt.js
 * Utilidades para codificar y decodificar JWT simulados.
 * En producción: la firma se verifica en el servidor con una clave secreta.
 */

const encodeB64 = (obj) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

export const decodeB64 = (str) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, '+').replace(/_/g, '/')))))
  } catch {
    return null
  }
}

/**
 * Genera un token JWT simulado con header.payload.signature
 */
export const generateToken = (userData) => {
  const now = Math.floor(Date.now() / 1000)
  const header    = encodeB64({ alg: 'HS256', typ: 'JWT' })
  const payload   = encodeB64({
    sub:     userData.id,
    email:   userData.email,
    name:    userData.name,
    role:    userData.role,
    codigo:  userData.codigo,
    carrera: userData.carrera,
    ciclo:   userData.ciclo,
    iat:     now,
    exp:     now + 3600,
  })
  const signature = encodeB64({ sig: 'simulated-hmac-sha256' })
  return `${header}.${payload}.${signature}`
}

/**
 * Decodifica y valida el token. Retorna el payload o null si inválido/expirado.
 */
export const decodeToken = (token) => {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const payload = decodeB64(parts[1])
  if (!payload) return null
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp && payload.exp < now) return null
  return payload
}

/**
 * Retorna las 3 partes del token decodificadas (para la vista de inspección).
 */
export const inspectToken = (token) => {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  return {
    raw:       token,
    parts,
    header:    decodeB64(parts[0]),
    payload:   decodeB64(parts[1]),
    signature: parts[2],
  }
}
