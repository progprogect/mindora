import { createReadStream, statSync } from 'node:fs'
import { versions } from 'node:process'
import { Readable } from 'node:stream'
import type { MiddlewareHandler } from 'hono'
import { getMimeType } from 'hono/utils/mime'
import { isApiOrWebhookPath } from './spaPaths.js'
import { resolveSpaTarget, type SpaRoots } from './spaResolve.js'

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

export function createSpaGateway(roots: SpaRoots): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.method !== 'GET' && c.req.method !== 'HEAD') return next()
    const pathname = new URL(c.req.url).pathname
    if (isApiOrWebhookPath(pathname)) return next()
    const target = resolveSpaTarget(pathname, roots)
    if (target.kind === 'not_found') return next()
    let stats
    try {
      stats = statSync(target.absPath)
    } catch {
      return next()
    }
    const mime = getMimeType(target.absPath) || 'application/octet-stream'
    c.header('Content-Type', mime)
    c.header('Cache-Control', target.cache === 'html' ? 'no-cache' : 'public, max-age=31536000, immutable')
    c.header('Content-Length', String(stats.size))
    if (c.req.method === 'HEAD') {
      return c.body(null)
    }
    return c.body(nodeReadableToWeb(createReadStream(target.absPath)), 200)
  }
}
