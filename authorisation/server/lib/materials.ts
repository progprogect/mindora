import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import path, { relative, sep } from 'node:path'
import { versions } from 'node:process'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { materials } from '../db/schema.js'

const CONTENT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../content/materials')

export type MaterialLocale = 'en' | 'ru'

export type MaterialListItem = {
  slug: string
  title: string
  description: string | null
  type: string
  publishedAt: number | null
  hasFile: boolean
  localeFallback: boolean
}

export type MaterialDetail = MaterialListItem & {
  body: string | null
  fileUrl: string | null
}

function safeResolve(rel: string | null | undefined): string | null {
  if (!rel) return null
  const abs = path.resolve(CONTENT_ROOT, rel)
  const relSafe = relative(CONTENT_ROOT, abs)
  if (relSafe.startsWith('..') || relSafe.startsWith(`..${sep}`) || path.isAbsolute(relSafe)) return null
  if (!existsSync(abs)) return null
  try {
    if (!statSync(abs).isFile()) return null
  } catch {
    return null
  }
  return abs
}

function pickLocalized(
  locale: MaterialLocale,
  en: string | null | undefined,
  ru: string | null | undefined,
): { value: string | null; fallback: boolean } {
  if (locale === 'ru') {
    if (ru) return { value: ru, fallback: false }
    if (en) return { value: en, fallback: true }
    return { value: null, fallback: false }
  }
  if (en) return { value: en, fallback: false }
  if (ru) return { value: ru, fallback: true }
  return { value: null, fallback: false }
}

function readBody(rel: string | null): string | null {
  const abs = safeResolve(rel)
  if (!abs) return null
  try {
    return readFileSync(abs, 'utf8')
  } catch {
    return null
  }
}

export async function listPublishedMaterials(locale: MaterialLocale): Promise<MaterialListItem[]> {
  const rows = await db
    .select()
    .from(materials)
    .where(eq(materials.isPublished, true))
    .orderBy(asc(materials.sort), asc(materials.titleEn))

  return rows.map((row) => {
    const title = pickLocalized(locale, row.titleEn, row.titleRu)
    const description = pickLocalized(locale, row.descriptionEn, row.descriptionRu)
    const bodyPath = pickLocalized(locale, row.bodyEn, row.bodyRu)
    const filePath = pickLocalized(locale, row.fileEn, row.fileRu)
    return {
      slug: row.slug,
      title: title.value || row.titleEn,
      description: description.value,
      type: row.type,
      publishedAt: row.publishedAt ? row.publishedAt.getTime() : null,
      hasFile: Boolean(safeResolve(filePath.value)),
      localeFallback: title.fallback || Boolean(bodyPath.fallback && bodyPath.value),
    }
  })
}

export async function getPublishedMaterial(
  slug: string,
  locale: MaterialLocale,
): Promise<MaterialDetail | null> {
  const [row] = await db
    .select()
    .from(materials)
    .where(and(eq(materials.slug, slug), eq(materials.isPublished, true)))
    .limit(1)
  if (!row) return null

  const title = pickLocalized(locale, row.titleEn, row.titleRu)
  const description = pickLocalized(locale, row.descriptionEn, row.descriptionRu)
  const bodyPath = pickLocalized(locale, row.bodyEn, row.bodyRu)
  const filePath = pickLocalized(locale, row.fileEn, row.fileRu)
  const hasFile = Boolean(safeResolve(filePath.value))

  return {
    slug: row.slug,
    title: title.value || row.titleEn,
    description: description.value,
    type: row.type,
    publishedAt: row.publishedAt ? row.publishedAt.getTime() : null,
    hasFile,
    localeFallback: title.fallback || Boolean(bodyPath.fallback && bodyPath.value),
    body: readBody(bodyPath.value),
    fileUrl: hasFile ? `/api/materials/${encodeURIComponent(row.slug)}/file` : null,
  }
}

export async function resolveMaterialFile(
  slug: string,
  locale: MaterialLocale,
): Promise<{ absPath: string; filename: string; contentType: string } | null> {
  const [row] = await db
    .select()
    .from(materials)
    .where(and(eq(materials.slug, slug), eq(materials.isPublished, true)))
    .limit(1)
  if (!row) return null

  const filePath = pickLocalized(locale, row.fileEn, row.fileRu)
  const absPath = safeResolve(filePath.value)
  if (!absPath) return null

  const ext = path.extname(absPath).toLowerCase()
  const contentType =
    ext === '.pdf'
      ? 'application/pdf'
      : ext === '.json'
        ? 'application/json'
        : 'application/octet-stream'
  const filename = `${row.slug}${ext || ''}`
  return { absPath, filename, contentType }
}

export function nodeReadableToWeb(stream: Readable): ReadableStream {
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

export function openMaterialFileStream(absPath: string) {
  return {
    stream: nodeReadableToWeb(createReadStream(absPath)),
    size: statSync(absPath).size,
  }
}
