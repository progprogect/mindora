#!/usr/bin/env node
/**
 * i18n build gate — parity for UI chunks, courses, prompt vault, and mail templates.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const authRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

function fail(msg) {
  errors.push(msg)
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

// --- optional cleanup: intermediate sales build chunks must not be public ---
const salesPartsDir = path.join(authRoot, 'public/data/prompt-vault/_sales_parts')
const salesRu = path.join(authRoot, 'public/data/prompt-vault/sales-negotiation.ru.json')
let salesPartsRemoved = false
if (fs.existsSync(salesPartsDir) && fs.existsSync(salesRu)) {
  fs.rmSync(salesPartsDir, { recursive: true, force: true })
  salesPartsRemoved = true
}

// --- 1. i18n chunks ---
const chunksDir = path.join(authRoot, 'src/i18n/chunks')

function extractBraceBlock(source, openBraceIndex) {
  let depth = 0
  let i = openBraceIndex
  for (; i < source.length; i++) {
    const ch = source[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return source.slice(openBraceIndex + 1, i)
    } else if (ch === "'" || ch === '"' || ch === '`') {
      i = skipString(source, i, ch)
    } else if (ch === '/' && source[i + 1] === '/') {
      i = source.indexOf('\n', i)
      if (i === -1) break
    }
  }
  return null
}

function skipString(source, start, quote) {
  let i = start + 1
  while (i < source.length) {
    const ch = source[i]
    if (ch === '\\') {
      i += 2
      continue
    }
    if (ch === quote) return i
    i++
  }
  return source.length - 1
}

function parseFlatStringMap(body) {
  const keys = new Set()
  const values = new Map()
  let i = 0
  const len = body.length

  const skipWs = () => {
    while (i < len) {
      if (body[i] === '/' && body[i + 1] === '/') {
        i = body.indexOf('\n', i)
        if (i === -1) return
        i++
        continue
      }
      if (!/\s|,/.test(body[i])) break
      i++
    }
  }

  const readQuoted = (q) => {
    let out = ''
    i++
    while (i < len) {
      const ch = body[i]
      if (ch === '\\' && i + 1 < len) {
        out += body[i + 1]
        i += 2
        continue
      }
      if (ch === q) {
        i++
        return out
      }
      out += ch
      i++
    }
    return out
  }

  while (i < len) {
    skipWs()
    if (i >= len) break
    if (body[i] === '}') break

    const q = body[i]
    if (q !== "'" && q !== '"') {
      i++
      continue
    }
    const key = readQuoted(q)
    skipWs()
    if (body[i] !== ':') {
      i++
      continue
    }
    i++
    skipWs()
    const vq = body[i]
    if (vq !== "'" && vq !== '"') {
      continue
    }
    const value = readQuoted(vq)
    keys.add(key)
    values.set(key, value)
    skipWs()
  }

  return { keys, values }
}

function findExportObject(source, name) {
  const marker = `export const ${name} = {`
  const idx = source.indexOf(marker)
  if (idx === -1) return null
  const brace = idx + marker.length - 1
  const body = extractBraceBlock(source, brace)
  if (body == null) return null
  return parseFlatStringMap(body)
}

function checkChunks() {
  const files = fs.readdirSync(chunksDir).filter((f) => f.endsWith('.ts'))
  let pairCount = 0
  for (const file of files) {
    const text = readText(path.join(chunksDir, file))
    const enNames = [...text.matchAll(/export const (\w+)En = \{/g)].map((m) => m[1])
    const ruNames = [...text.matchAll(/export const (\w+)Ru = \{/g)].map((m) => m[1])
    const enSet = new Set(enNames)
    const ruSet = new Set(ruNames)

    for (const base of enSet) {
      if (!ruSet.has(base)) {
        fail(`chunks/${file}: missing ${base}Ru for ${base}En`)
      }
    }
    for (const base of ruSet) {
      if (!enSet.has(base)) {
        fail(`chunks/${file}: missing ${base}En for ${base}Ru`)
      }
    }

    for (const base of enSet) {
      if (!ruSet.has(base)) continue
      pairCount++
      const enMap = findExportObject(text, `${base}En`)
      const ruMap = findExportObject(text, `${base}Ru`)
      if (!enMap || !ruMap) {
        fail(`chunks/${file}: could not parse ${base}En/${base}Ru`)
        continue
      }
      const enOnly = [...enMap.keys].filter((k) => !ruMap.keys.has(k))
      const ruOnly = [...ruMap.keys].filter((k) => !enMap.keys.has(k))
      if (enOnly.length) {
        fail(`chunks/${file} ${base}: keys only in En: ${enOnly.slice(0, 5).join(', ')}${enOnly.length > 5 ? '…' : ''}`)
      }
      if (ruOnly.length) {
        fail(`chunks/${file} ${base}: keys only in Ru: ${ruOnly.slice(0, 5).join(', ')}${ruOnly.length > 5 ? '…' : ''}`)
      }
      for (const key of enMap.keys) {
        const ruVal = ruMap.values.get(key)
        if (ruVal === undefined) continue
        if (ruVal.length === 0) {
          fail(`chunks/${file} ${base}: empty ru string for '${key}'`)
        }
      }
    }
  }
  return { files: files.length, pairs: pairCount }
}

// --- 2. courses ---
const coursesDir = path.join(authRoot, 'src/content/courses')
const coursesRuDir = path.join(coursesDir, 'ru')

function collectLessonLikeIds(node, ids) {
  if (Array.isArray(node)) {
    const withId = node.filter(
      (item) => item && typeof item === 'object' && typeof item.id === 'string',
    )
    if (withId.length > 0 && withId.length === node.length) {
      for (const item of withId) ids.add(item.id)
    }
    for (const item of node) {
      if (item && typeof item === 'object') collectLessonLikeIds(item, ids)
    }
    return
  }
  if (node && typeof node === 'object') {
    for (const value of Object.values(node)) {
      collectLessonLikeIds(value, ids)
    }
  }
}

function compareCourseFields(a, b, relPath) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.min(a.length, b.length)
    for (let i = 0; i < n; i++) compareCourseFields(a[i], b[i], `${relPath}[${i}]`)
    return
  }
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return
  if ('correctIndex' in a && 'correctIndex' in b && a.correctIndex !== b.correctIndex) {
    fail(`courses ${relPath}: correctIndex ${a.correctIndex} vs ${b.correctIndex}`)
  }
  if ('xp' in a && 'xp' in b && typeof a.xp === 'number' && typeof b.xp === 'number' && a.xp !== b.xp) {
    fail(`courses ${relPath}: xp ${a.xp} vs ${b.xp}`)
  }
  if (
    'dayNumber' in a &&
    'dayNumber' in b &&
    typeof a.dayNumber === 'number' &&
    typeof b.dayNumber === 'number' &&
    a.dayNumber !== b.dayNumber
  ) {
    fail(`courses ${relPath}: dayNumber ${a.dayNumber} vs ${b.dayNumber}`)
  }
  for (const key of Object.keys(a)) {
    if (key in b) compareCourseFields(a[key], b[key], `${relPath}.${key}`)
  }
}

function checkCourses() {
  const enFiles = fs
    .readdirSync(coursesDir)
    .filter((f) => f.endsWith('.json'))
    .sort()
  let checked = 0
  for (const file of enFiles) {
    const ruPath = path.join(coursesRuDir, file)
    if (!fs.existsSync(ruPath)) {
      fail(`courses: missing ru/${file}`)
      continue
    }
    const en = JSON.parse(readText(path.join(coursesDir, file)))
    const ru = JSON.parse(readText(ruPath))
    const enIds = new Set()
    const ruIds = new Set()
    collectLessonLikeIds(en, enIds)
    collectLessonLikeIds(ru, ruIds)
    const missingRu = [...enIds].filter((id) => !ruIds.has(id))
    const extraRu = [...ruIds].filter((id) => !enIds.has(id))
    if (missingRu.length || extraRu.length) {
      fail(
        `courses/${file}: id mismatch (en ${enIds.size}, ru ${ruIds.size}; missing in ru: ${missingRu.slice(0, 3).join(', ')}${missingRu.length > 3 ? '…' : ''})`,
      )
    }
    compareCourseFields(en, ru, file)
    checked++
  }
  return { enFiles: enFiles.length, checked }
}

// --- 3. prompt vault ---
const promptDir = path.join(authRoot, 'public/data/prompt-vault')

function promptCardsFromParsed(data) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') {
    for (const value of Object.values(data)) {
      if (Array.isArray(value) && value.length > 0 && value[0] && typeof value[0].id !== 'undefined') {
        return value
      }
    }
  }
  return null
}

function checkPromptPair(enPath, ruPath, label) {
  const enRaw = JSON.parse(readText(enPath))
  const enCards = promptCardsFromParsed(enRaw)
  const enIds = new Set()
  if (!enCards) {
    fail(`prompts ${label}: unrecognized en shape`)
    return { count: 0 }
  }
  for (const card of enCards) {
    if (card && card.id != null) enIds.add(String(card.id))
  }

  const ruRaw = JSON.parse(readText(ruPath))
  const ruCards = promptCardsFromParsed(ruRaw)
  if (!ruCards) {
    fail(`prompts ${label}: unrecognized ru shape`)
    return { count: enIds.size }
  }
  const ruIds = new Set()
  let emptyFields = 0
  for (const card of ruCards) {
    if (!card || card.id == null) continue
    ruIds.add(String(card.id))
    const t = card.t
    const c = card.c
    if (typeof t !== 'string' || t.length === 0 || typeof c !== 'string' || c.length === 0) {
      emptyFields++
      if (emptyFields <= 3) {
        fail(`prompts ${label}: empty t/c on ru card id ${card.id}`)
      }
    }
  }
  if (emptyFields > 3) {
    fail(`prompts ${label}: ${emptyFields} ru cards with empty t or c`)
  }

  const missingRu = [...enIds].filter((id) => !ruIds.has(id))
  const extraRu = [...ruIds].filter((id) => !enIds.has(id))
  if (missingRu.length || extraRu.length) {
    fail(
      `prompts ${label}: id mismatch (en ${enIds.size}, ru ${ruIds.size})`,
    )
  }
  return { count: enIds.size }
}

function checkPrompts() {
  const slugs = fs
    .readdirSync(promptDir)
    .filter(
      (f) =>
        f.endsWith('.json') &&
        !f.endsWith('.ru.json') &&
        f !== 'index.json' &&
        !f.startsWith('_'),
    )
    .map((f) => f.replace(/\.json$/, ''))
    .sort()

  let totalCards = 0
  for (const slug of slugs) {
    const enPath = path.join(promptDir, `${slug}.json`)
    const ruPath = path.join(promptDir, `${slug}.ru.json`)
    if (!fs.existsSync(ruPath)) {
      fail(`prompts: missing ${slug}.ru.json`)
      continue
    }
    const { count } = checkPromptPair(enPath, ruPath, slug)
    totalCards += count
  }

  const indexPath = path.join(promptDir, 'index.json')
  const indexRuPath = path.join(promptDir, 'index.ru.json')
  if (fs.existsSync(indexPath) && fs.existsSync(indexRuPath)) {
    const indexEn = JSON.parse(readText(indexPath))
    const indexRu = JSON.parse(readText(indexRuPath))
    const slugEn = new Set(indexEn.map((e) => e.slug))
    const slugRu = new Set(indexRu.map((e) => e.slug))
    const missing = [...slugEn].filter((s) => !slugRu.has(s))
    const extra = [...slugRu].filter((s) => !slugEn.has(s))
    if (missing.length || extra.length) {
      fail(`prompts index: slug mismatch (missing in ru: ${missing.join(', ') || '—'}; extra: ${extra.join(', ') || '—'})`)
    }
  }

  return { slugs: slugs.length, totalCards }
}

// --- 4. mail placeholders ---
function checkMail() {
  const mailPath = path.join(authRoot, 'server/lib/mail.ts')
  const text = readText(mailPath)

  if (!text.includes("locale === 'ru'")) {
    fail('mail.ts: missing locale === \'ru\' branch')
  }

  const requiredFns = ['sendOtpEmail', 'sendCancellationEmail', 'sendTrialWelcomeEmail']
  for (const fn of requiredFns) {
    if (!new RegExp(`(?:export\\s+)?async\\s+function\\s+${fn}\\b`).test(text)) {
      fail(`mail.ts: missing ${fn}`)
    }
  }

  const hasEnOtp = text.includes('Sign in to MindoraAcademy.com')
  const hasRuOtp = text.includes('Вход в MindoraAcademy.com')
  if (hasEnOtp !== hasRuOtp) {
    fail('mail.ts: OTP subject strings missing for one language')
  }
}

// --- run ---
const chunkStats = checkChunks()
const courseStats = checkCourses()
const promptStats = checkPrompts()
checkMail()

if (errors.length > 0) {
  console.error(`check-i18n: ${errors[0]}`)
  if (errors.length > 1) {
    console.error(`  (+${errors.length - 1} more)`)
  }
  process.exit(1)
}

const partsNote = salesPartsRemoved ? '; removed _sales_parts' : ''
console.log(
  `check-i18n: ok — ${chunkStats.pairs} chunk pair(s) in ${chunkStats.files} file(s), ${courseStats.checked} course pair(s), ${promptStats.slugs} prompt slug(s) (~${promptStats.totalCards} cards)${partsNote}`,
)
process.exit(0)
