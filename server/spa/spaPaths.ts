export function normalizePathname(pathname: string): string {
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    decoded = pathname
  }
  if (!decoded.startsWith('/')) decoded = `/${decoded}`
  decoded = decoded.replace(/\/+/g, '/')
  if (decoded.length > 1 && decoded.endsWith('/')) decoded = decoded.slice(0, -1)
  return decoded
}

export function isSafePath(pathname: string): boolean {
  if (pathname.includes('\0')) return false
  return !pathname.split('/').some((segment) => segment === '..')
}

/** Last path segment looks like a static file (`favicon.svg`, `index-abc.js`). */
export function looksLikeFile(pathname: string): boolean {
  const last = pathname.split('/').pop() ?? ''
  return last.includes('.')
}

/** Apple Pay / ACME files live here; the association file has no `.` in the name. */
export function isWellKnownPath(pathname: string): boolean {
  return pathname === '/.well-known' || pathname.startsWith('/.well-known/')
}

export function isApiOrWebhookPath(pathname: string): boolean {
  const path = normalizePathname(pathname)
  return path === '/api' || path.startsWith('/api/') || path === '/stripe' || path.startsWith('/stripe/')
}
