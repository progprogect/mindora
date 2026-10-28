import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { eq } from 'drizzle-orm'
import '../loadDotenv.js'
import { db, pool } from '../db/index.js'
import { materials } from '../db/schema.js'
import { MATERIALS_CATALOG } from './materials-catalog.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const authRoot = path.resolve(here, '../..')
const sourceRoot = path.resolve(authRoot, '../docs/neuroflowacademy/materials')
const contentRoot = path.resolve(authRoot, 'content/materials')
// content/materials/*.md is the maintained source (see scripts/html-to-md.mjs); the legacy docs/ text is only
// copied for guides that have no file yet, or when --refresh-text is passed.
const refreshText = process.argv.includes('--refresh-text')

function stripForeignChrome(raw: string): string {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let skippedMeta = 0
  for (const line of lines) {
    const trimmed = line.trim()
    if (skippedMeta < 8) {
      if (
        /^Источник:/.test(trimmed) ||
        /^Source:/.test(trimmed) ||
        /←\s*(платформа|platform)/i.test(trimmed) ||
        /^NeuroFlow Academy\s*$/i.test(trimmed) ||
        /^NeuroFlow Academy\s*·/i.test(trimmed) ||
        /В кабинет/i.test(trimmed) ||
        /Back to (dashboard|cabinet)/i.test(trimmed) ||
        /переключатель темы|theme toggle/i.test(trimmed)
      ) {
        skippedMeta += 1
        continue
      }
    }
    if (/^NeuroFlow Academy\s*·\s*Universidad/i.test(trimmed)) continue
    out.push(line.replace(/NeuroFlow Academy/gi, 'Mindora Academy').replace(/\bNeuroFlow\b/gi, 'Mindora'))
  }
  return out.join('\n').replace(/\n{4,}/g, '\n\n\n').trim() + '\n'
}

function copyTextSource(rel: string, destRel: string): string | null {
  const abs = path.resolve(sourceRoot, rel)
  if (!existsSync(abs)) {
    console.warn(`[seed-materials] missing source: ${rel}`)
    return null
  }
  const destAbs = path.resolve(contentRoot, destRel)
  if (!refreshText && existsSync(destAbs)) return destRel
  mkdirSync(path.dirname(destAbs), { recursive: true })
  const raw = readFileSync(abs, 'utf8')
  writeFileSync(destAbs, stripForeignChrome(raw), 'utf8')
  return destRel
}

function copyBinarySource(rel: string, destRel: string): string | null {
  const abs = path.resolve(sourceRoot, rel)
  if (!existsSync(abs)) {
    console.warn(`[seed-materials] missing source: ${rel}`)
    return null
  }
  const destAbs = path.resolve(contentRoot, destRel)
  mkdirSync(path.dirname(destAbs), { recursive: true })
  cpSync(abs, destAbs)
  return destRel
}

async function seed() {
  if (!existsSync(sourceRoot)) {
    console.error(`[seed-materials] source not found: ${sourceRoot}`)
    process.exit(1)
  }
  mkdirSync(contentRoot, { recursive: true })

  let upserted = 0
  for (const item of MATERIALS_CATALOG) {
    let bodyRu: string | null = null
    let bodyEn: string | null = null
    let fileRu: string | null = null
    let fileEn: string | null = null

    if (item.type === 'pdf') {
      if (item.fileRu) fileRu = copyBinarySource(item.fileRu, `${item.slug}/ru.pdf`)
      if (item.fileEn) fileEn = copyBinarySource(item.fileEn, `${item.slug}/en.pdf`)
      if (!fileEn && fileRu) fileEn = fileRu
      if (!fileRu && fileEn) fileRu = fileEn
    } else if (item.type === 'json') {
      if (item.sourceRu) bodyRu = copyTextSource(item.sourceRu, `${item.slug}/ru.md`)
      if (item.sourceEn) bodyEn = copyTextSource(item.sourceEn, `${item.slug}/en.md`)
      if (item.fileRu) fileRu = copyBinarySource(item.fileRu, `${item.slug}/ru.json`)
      if (item.fileEn) fileEn = copyBinarySource(item.fileEn, `${item.slug}/en.json`)
    } else {
      if (item.sourceRu) bodyRu = copyTextSource(item.sourceRu, `${item.slug}/ru.md`)
      if (item.sourceEn) bodyEn = copyTextSource(item.sourceEn, `${item.slug}/en.md`)
    }

    // Text guides maintained directly in content/materials/ (no docs/ source) still count as available.
    if (item.type !== 'pdf' && item.type !== 'json') {
      if (!bodyRu && existsSync(path.resolve(contentRoot, item.slug, 'ru.md'))) bodyRu = `${item.slug}/ru.md`
      if (!bodyEn && existsSync(path.resolve(contentRoot, item.slug, 'en.md'))) bodyEn = `${item.slug}/en.md`
    }

    // Keep missing locale columns null so the API can set localeFallback.
    // File downloads may share one binary when only one language file exists.
    if (item.type === 'pdf' || item.type === 'json') {
      if (!fileEn && fileRu) fileEn = fileRu
      if (!fileRu && fileEn) fileRu = fileEn
    }

    if (item.type !== 'pdf' && !bodyRu && !bodyEn && !fileRu && !fileEn) {
      console.warn(`[seed-materials] skip empty: ${item.slug}`)
      continue
    }
    if (item.type === 'pdf' && !fileRu && !fileEn) {
      console.warn(`[seed-materials] skip empty pdf: ${item.slug}`)
      continue
    }

    const row = {
      slug: item.slug,
      titleEn: item.titleEn,
      titleRu: item.titleRu,
      descriptionEn: item.descriptionEn ?? null,
      descriptionRu: item.descriptionRu ?? null,
      type: item.type,
      bodyEn,
      bodyRu,
      fileEn,
      fileRu,
      sort: item.sort,
      isPublished: true,
      publishedAt: item.publishedAt ? new Date(`${item.publishedAt}T12:00:00.000Z`) : null,
    }

    const [existing] = await db.select({ id: materials.id }).from(materials).where(eq(materials.slug, item.slug)).limit(1)
    if (existing) {
      await db.update(materials).set(row).where(eq(materials.id, existing.id))
    } else {
      await db.insert(materials).values(row)
    }
    upserted += 1
  }

  console.log(`[seed-materials] upserted ${upserted} materials → ${contentRoot}`)
  await pool.end()
}

seed().catch(async (error) => {
  console.error(error)
  await pool.end().catch(() => undefined)
  process.exit(1)
})
