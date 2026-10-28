import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { profiles } from '../db/schema.js'
import {
  getPublishedMaterial,
  listPublishedMaterials,
  openMaterialFileStream,
  resolveMaterialFile,
  type MaterialLocale,
} from '../lib/materials.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

async function userLocale(userId: string, requested?: string): Promise<MaterialLocale> {
  if (requested === 'en' || requested === 'ru') return requested
  const [profile] = await db
    .select({ locale: profiles.locale })
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1)
  return profile?.locale === 'ru' ? 'ru' : 'en'
}

export const materialRoutes = new Hono<SessionEnv>()

materialRoutes.get('/materials', requireAuth, async (c) => {
  const locale = await userLocale(c.get('userId'), c.req.query('locale'))
  const items = await listPublishedMaterials(locale)
  return c.json({ materials: items, total: items.length, locale })
})

materialRoutes.get('/materials/:slug', requireAuth, async (c) => {
  const slug = c.req.param('slug')
  const locale = await userLocale(c.get('userId'), c.req.query('locale'))
  const material = await getPublishedMaterial(slug, locale)
  if (!material) return c.json({ error: 'Not found', code: 'not_found' }, 404)
  return c.json({ material, locale })
})

materialRoutes.get('/materials/:slug/file', requireAuth, async (c) => {
  const slug = c.req.param('slug')
  const locale = await userLocale(c.get('userId'), c.req.query('locale'))
  const resolved = await resolveMaterialFile(slug, locale)
  if (!resolved) return c.json({ error: 'Not found', code: 'not_found' }, 404)
  const { stream, size } = openMaterialFileStream(resolved.absPath)
  c.header('Content-Type', resolved.contentType)
  c.header('Content-Disposition', `attachment; filename="${resolved.filename}"`)
  c.header('Content-Length', String(size))
  c.header('Cache-Control', 'private, no-store')
  return c.body(stream, 200)
})
