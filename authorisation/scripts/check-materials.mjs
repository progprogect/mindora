#!/usr/bin/env node
/**
 * Materials EN/RU parity gate for content/materials/<slug>/{en,ru}.md.
 * Strict by default (exit 1 on violations); `--report` prints everything but exits 0.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// slug -> { reason, singleLocale?: 'ru'|'en', skip?: [...] }
// singleLocale: guide legitimately exists in one language only.
// skip: checks waived for this guide, each with the reason in `reason`:
//   structure  - H2/H3/table/fence/emoji counts and size ratio (EN and RU are different editions of the source)
//   paragraph  - flat source text with paragraphs >3000 chars that cannot be split without losing structure
//   chrome     - catalog files that quote source-site strings
//   missing    - guide has no text in one locale (binary or catalog file)
const EDITIONS = 'EN and RU are different editions of the source guide (translating the longer one is out of scope for now)'
const ALLOW = {
  'claude-complete-guide': { reason: EDITIONS, skip: ['structure', 'paragraph'] },
  'grok-complete-guide': { reason: EDITIONS, skip: ['structure', 'paragraph'] },
  'midjourney-complete-guide': { reason: EDITIONS, skip: ['structure', 'paragraph'] },
  'perplexity-complete-guide': { reason: EDITIONS, skip: ['structure', 'paragraph'] },
  'prompt-engineering': { reason: EDITIONS, skip: ['structure', 'paragraph'] },
  openclaw: { reason: EDITIONS, skip: ['structure'] },
  'ai-tools-catalog': { reason: EDITIONS, skip: ['structure'] },
  'ai-agent-prompt-generator': { reason: EDITIONS, skip: ['structure'] },
  'gpt-system-prompt': { reason: EDITIONS, skip: ['structure'] },
  'business-creation-prompt': { reason: EDITIONS, skip: ['structure'] },
  'gemini-prompts': { reason: 'Notion table export: flat text, EN is longer than RU', skip: ['structure', 'paragraph'] },
  'ai-video-money': { reason: 'source has flat paragraphs >3000 chars', skip: ['paragraph'] },
  'gpt-human-writing': { reason: 'source has flat paragraphs >3000 chars', skip: ['paragraph'] },
  'prompts-library': { reason: 'JSON catalog stub, text is not the guide', skip: ['chrome', 'structure'] },
  'prompt-engineering-book': { reason: 'PDF book, no markdown text', skip: ['missing'] },
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'materials')
const report = process.argv.includes('--report')
const CHROME = ['Skip to content', 'Sign up or login', '| Notion', '| Mindora Academy']

function stripFences(md) {
  const out = []
  let inF = false
  let fences = 0
  for (const l of md.split('\n')) {
    if (/^\s*```/.test(l)) { if (!inF) fences++; inF = !inF; continue }
    if (!inF) out.push(l)
  }
  return { lines: out, fences }
}

function analyze(md) {
  const { lines, fences } = stripFences(md)
  let h2 = 0, h3 = 0, tables = 0, prev = false, longest = 0, para = ''
  const emoji = []
  const flush = () => { longest = Math.max(longest, para.length); para = '' }
  const re = /^\s*(?:[-*]\s+|#{1,6}\s+|>\s*)?(\p{Extended_Pictographic}️?)/u
  for (const l of lines) {
    if (/^## /.test(l)) h2++
    else if (/^### /.test(l)) h3++
    const isT = /^\s*\|.*\|\s*$/.test(l)
    if (isT && !prev) tables++
    prev = isT
    const m = re.exec(l)
    if (m && !/[©®™]/.test(m[1])) emoji.push(m[1].replace(/️/g, ''))
    if (l.trim() === '' || isT || /^#{1,6} /.test(l)) flush()
    else para += (para ? ' ' : '') + l
  }
  flush()
  return { h2, h3, tables, fences, longest, emoji: [...new Set(emoji)].sort(), bytes: Buffer.byteLength(md) }
}

const slugs = fs.existsSync(root) ? fs.readdirSync(root).filter((s) => fs.statSync(path.join(root, s)).isDirectory()).sort() : []
const data = {}
for (const s of slugs) {
  const rd = (l) => { const f = path.join(root, s, `${l}.md`); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null }
  data[s] = { en: rd('en'), ru: rd('ru') }
}

const violations = []
const v = (slug, msg) => violations.push(`${slug}: ${msg}`)

const enOwner = new Map()
for (const s of slugs) {
  const { en, ru } = data[s]
  const allow = ALLOW[s]
  for (const l of ['en', 'ru']) {
    const t = data[s][l]
    if (t == null) continue
    if (!allow?.skip?.includes('chrome')) for (const c of CHROME) if (t.includes(c)) v(s, `${l}.md contains chrome string "${c}"`)
    const a = analyze(t)
    if (a.longest > 3000 && !allow?.skip?.includes('paragraph')) v(s, `${l}.md has a paragraph of ${a.longest} chars (>3000)`)
  }
  if (en != null) {
    const prevSlug = enOwner.get(en)
    if (prevSlug) v(s, `en.md identical to en.md of "${prevSlug}"`)
    else enOwner.set(en, s)
  }
  if (allow?.singleLocale) {
    const other = allow.singleLocale === 'ru' ? 'en' : 'ru'
    if (data[s][other] != null) v(s, `ALLOW says ${allow.singleLocale}-only but ${other}.md exists`)
    if (data[s][allow.singleLocale] == null) v(s, `${allow.singleLocale}.md missing`)
    continue
  }
  if ((en == null || ru == null) && allow?.skip?.includes('missing')) continue
  if (en == null || ru == null) { v(s, `missing ${en == null ? 'en' : 'ru'}.md`); continue }
  if (en === ru) v(s, 'en.md is byte-identical to ru.md')
  if (allow?.skip?.includes('structure')) continue
  const a = analyze(en), b = analyze(ru)
  if (a.h2 !== b.h2) v(s, `H2 count en=${a.h2} ru=${b.h2}`)
  if (a.h3 !== b.h3) v(s, `H3 count en=${a.h3} ru=${b.h3}`)
  if (a.tables !== b.tables) v(s, `table count en=${a.tables} ru=${b.tables}`)
  if (a.fences !== b.fences) v(s, `fenced block count en=${a.fences} ru=${b.fences}`)
  if (a.emoji.join('') !== b.emoji.join('')) v(s, `leading emoji differ en=[${a.emoji.join(' ')}] ru=[${b.emoji.join(' ')}]`)
  const mn = Math.min(a.bytes, b.bytes), mx = Math.max(a.bytes, b.bytes)
  if (mx > 0 && mn / mx < 0.25) v(s, `size ratio <25% (en=${a.bytes}B ru=${b.bytes}B)`)
}

if (violations.length) {
  console.log(`check-materials: ${violations.length} violation(s) in ${new Set(violations.map((x) => x.split(':')[0])).size} guide(s)${report ? ' (report only)' : ''}`)
  for (const x of violations) console.log(`  - ${x}`)
  process.exit(report ? 0 : 1)
}
console.log(`check-materials: OK (${slugs.length} guides)`)
