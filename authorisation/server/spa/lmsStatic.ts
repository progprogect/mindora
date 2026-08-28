import { createReadStream, existsSync, statSync } from 'node:fs'
import path, { relative, resolve, sep } from 'node:path'
import { versions } from 'node:process'
import { Readable } from 'node:stream'
import type { MiddlewareHandler } from 'hono'
import { getMimeType } from 'hono/utils/mime'

function nodeReadableToWeb(stream: Readable): ReadableStream {
  const [major, minor] = versions.node.split('.').map((part) => Number.parseInt(part, 10))
  const useNative = major >= 23 || (major === 22 && minor >= 7) || (major === 20 && minor >= 18)
  if (useNative) return Readable.toWeb(stream) as ReadableStream
  return new ReadableStream({
    start(controller) {
      stream.on('data', (chunk) => {
        controller.enqueue(chunk)
      })
      stream.on('error', (err) => {
        controller.error(err)
      })
      stream.on('end', () => {
        controller.close()
      })
    },
    cancel() {
      stream.destroy()
    },
  })
}

function isApiOrWebhook(pathname: string) {
  return pathname === '/api' || pathname.startsWith('/api/') || pathname === '/stripe' || pathname.startsWith('/stripe/')
}

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

function looksLikeFile(pathname: string) {
  const last = pathname.split('/').pop() ?? ''
  return last.includes('.')
}

/** Serve the Vite LMS `dist/` (or `LMS_DIST`) for `npm start`. */
export function createLmsStatic(root: string): MiddlewareHandler {
  const indexHtml = path.join(root, 'index.html')
  return async (c, next) => {
    if (c.req.method !== 'GET' && c.req.method !== 'HEAD') return next()
    const pathname = new URL(c.req.url).pathname
    if (isApiOrWebhook(pathname)) return next()

    const file = existingFile(root, pathname)
    const absPath = file ?? (looksLikeFile(pathname) ? null : (existsSync(indexHtml) ? indexHtml : null))
    if (!absPath) return next()

    let stats
    try {
      stats = statSync(absPath)
    } catch {
      return next()
    }
    const mime = getMimeType(absPath) || 'application/octet-stream'
    const isHtml = absPath.endsWith('.html')
    c.header('Content-Type', mime)
    c.header('Cache-Control', isHtml ? 'no-cache' : 'public, max-age=31536000, immutable')
    c.header('Content-Length', String(stats.size))
    if (c.req.method === 'HEAD') return c.body(null)
    return c.body(nodeReadableToWeb(createReadStream(absPath)), 200)
  }
}
