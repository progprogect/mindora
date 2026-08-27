import { existsSync, statSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'
import { isLmsSpaPath, isSafePath, looksLikeFile, normalizePathname } from './spaPaths.js'

export type SpaRoots = {
  marketing: string
  lms?: string
}

export type SpaTarget =
  | { kind: 'file'; absPath: string; cache: 'html' | 'asset' }
  | { kind: 'not_found' }

function existingFile(root: string, urlPath: string): string | null {
  const rootAbs = resolve(root)
  const rel = urlPath === '/' ? '' : urlPath.replace(/^\//, '')
  const abs = resolve(rootAbs, rel)
  const relCheck = relative(rootAbs, abs)
  if (relCheck.startsWith('..') || relCheck.startsWith(`..${sep}`)) return null
  if (abs !== rootAbs && !abs.startsWith(rootAbs + sep)) return null
  if (!existsSync(abs)) return null
  try {
    if (!statSync(abs).isFile()) return null
  } catch {
    return null
  }
  return abs
}

function html(absPath: string): SpaTarget {
  return { kind: 'file', absPath, cache: 'html' }
}

function asset(absPath: string): SpaTarget {
  return { kind: 'file', absPath, cache: 'asset' }
}

export function resolveSpaTarget(pathname: string, roots: SpaRoots): SpaTarget {
  const path = normalizePathname(pathname)
  if (!isSafePath(path)) return { kind: 'not_found' }

  const lmsFile = roots.lms ? existingFile(roots.lms, path) : null
  const marketingFile = existingFile(roots.marketing, path)

  if (roots.lms && isLmsSpaPath(path)) {
    if (looksLikeFile(path)) {
      if (lmsFile) return asset(lmsFile)
      if (marketingFile) return asset(marketingFile)
      return { kind: 'not_found' }
    }
    const index = existingFile(roots.lms, '/index.html')
    return index ? html(index) : { kind: 'not_found' }
  }

  if (path === '/lms-assets' || path.startsWith('/lms-assets/')) {
    return lmsFile ? asset(lmsFile) : { kind: 'not_found' }
  }

  if (looksLikeFile(path)) {
    if (marketingFile) return asset(marketingFile)
    if (lmsFile) return asset(lmsFile)
    return { kind: 'not_found' }
  }

  const index = existingFile(roots.marketing, '/index.html')
  return index ? html(index) : { kind: 'not_found' }
}
