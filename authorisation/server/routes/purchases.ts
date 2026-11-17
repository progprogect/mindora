import { createReadStream, existsSync, statSync } from 'node:fs'
import path, { relative, sep } from 'node:path'
import { versions } from 'node:process'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import { Hono } from 'hono'
import { hasSku, isPlannerId, listPurchases, offerAmountCents } from '../lib/purchases.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

const PDF_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../content/planners/pdfs')

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

function resolvePdf(dir: string, file: string): string | null {
  const abs = path.resolve(dir, file)
  const rel = relative(dir, abs)
  if (rel.startsWith('..') || rel.startsWith(`..${sep}`) || path.isAbsolute(rel)) return null
  if (!existsSync(abs)) return null
  try {
    if (!statSync(abs).isFile()) return null
  } catch {
    return null
  }
  return abs
}

/** Russian files live in `pdfs/ru/<id>.pdf`; planners not translated yet fall back to the English PDF. */
function plannerPdfPath(plannerId: string, locale: string): { abs: string; ru: boolean } | null {
  if (locale === 'ru') {
    const ru = resolvePdf(path.join(PDF_DIR, 'ru'), `${plannerId}.pdf`)
    if (ru) return { abs: ru, ru: true }
  }
  const abs = resolvePdf(PDF_DIR, `${plannerId}.pdf`)
  return abs ? { abs, ru: false } : null
}

export const purchaseRoutes = new Hono<SessionEnv>()

purchaseRoutes.get('/purchases', requireAuth, async (c) => {
  const rows = await listPurchases(c.get('userId'))
  return c.json({
    purchases: rows.map((row) => ({
      sku: row.sku,
      createdAt: row.createdAt.getTime(),
      amountCents: offerAmountCents(row.sku),
    })),
  })
})

purchaseRoutes.get('/certificates', requireAuth, async (c) => {
  return c.json({ certificates: [] })
})

purchaseRoutes.get('/planners/download', requireAuth, async (c) => {
  const planner = c.req.query('planner') ?? ''
  if (!isPlannerId(planner)) return c.json({ error: 'Not found', code: 'not_found' }, 404)
  if (!(await hasSku(c.get('userId'), `planner-${planner}`))) {
    return c.json({ error: 'Forbidden', code: 'forbidden' }, 403)
  }
  const file = plannerPdfPath(planner, c.req.query('locale') ?? 'en')
  if (!file) return c.json({ error: 'Not found', code: 'not_found' }, 404)
  const absPath = file.abs
  const stats = statSync(absPath)
  c.header('Content-Type', 'application/pdf')
  c.header('Content-Disposition', `attachment; filename="${planner}${file.ru ? '.ru' : ''}.pdf"`)
  c.header('Content-Length', String(stats.size))
  c.header('Cache-Control', 'private, no-store')
  return c.body(nodeReadableToWeb(createReadStream(absPath)), 200)
})
