#!/usr/bin/env node
/**
 * Convert raw guide HTML (<inDir>/<slug>/<locale>.html) to markdown (<outDir>/<slug>/<locale>.md).
 * Usage: node scripts/html-to-md.mjs <inDir> <outDir>
 */
import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import TurndownService from 'turndown'
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm'

const [inDir, outDir] = process.argv.slice(2)
if (!inDir || !outDir) {
  console.error('Usage: node scripts/html-to-md.mjs <inDir> <outDir>')
  process.exit(2)
}

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
})
td.use([tables, strikethrough])
try { td.use(gfm) } catch { /* already covered */ }

function convert(html) {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  doc.querySelectorAll('script, style, nav, header, footer, div.top, .toc').forEach((n) => n.remove())
  doc.querySelectorAll('.section-number').forEach((n) => n.remove())
  doc.querySelectorAll('svg').forEach((svg) => {
    const label = svg.querySelector('title')?.textContent?.trim() || svg.getAttribute('aria-label')?.trim()
    if (label) {
      const p = doc.createElement('p')
      p.textContent = label
      svg.replaceWith(p)
    } else svg.remove()
  })
  // Chip rows (<div><span/><span/>…</div>) would be glued into one run of text: join them with a separator.
  doc.querySelectorAll('div').forEach((d) => {
    const kids = [...d.children]
    if (kids.length >= 2 && kids.every((k) => k.tagName === 'SPAN') && !d.querySelector('p, ul, ol, table, pre')) {
      kids.forEach((k, i) => { if (i < kids.length - 1) k.after(doc.createTextNode(' · ')) })
    }
  })
  const root = doc.querySelector('main') || doc.body
  if (!root) throw new Error('no body')
  let md = td.turndown(root.innerHTML)
  md = stripChrome(md)
  md = md.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim()
  return md + '\n'
}

// Source-site header/footer lines and branding (same rules the seed script used to apply).
function stripChrome(md) {
  const out = []
  let skipped = 0
  for (const line of md.replace(/\r\n/g, '\n').split('\n')) {
    const s = line.trim()
    if (skipped < 8 && (
      /^(Источник|Source):/.test(s) ||
      /←\s*(платформа|platform|кабинет|dashboard)/i.test(s) ||
      /^(\*\*)?(NeuroFlow Academy|Neurona|Universidad Neurona)(\*\*)?\s*$/i.test(s) ||
      /^(\*\*)?NeuroFlow Academy(\*\*)?\s*·/i.test(s) ||
      /Back to (dashboard|cabinet)|В кабинет|переключатель темы|theme toggle/i.test(s)
    )) { skipped += 1; continue }
    if (/^©\s/.test(s) && /neuroflow|neurona|questions\?|вопросы\?/i.test(s)) continue
    if (/^(Skip to content|Sign up or login)\s*$/i.test(s)) continue
    if (/neuroflowacademy\.com/i.test(s) && s.length < 300) continue // promo/footer links to the source site
    out.push(line.replace(/NeuroFlow Academy/gi, 'Mindora Academy').replace(/\bNeuroFlow\b/gi, 'Mindora').replace(/\s*\|\s*(Notion|Mindora Academy)\s*$/i, ''))
  }
  return out.join('\n')
}

function stats(md) {
  const lines = md.split('\n')
  let fences = 0, inF = false, tbl = 0, head = 0, longest = 0, prevTbl = false
  let para = ''
  const flush = () => { longest = Math.max(longest, para.length); para = '' }
  for (const l of lines) {
    if (/^```/.test(l)) { if (!inF) fences++; inF = !inF; flush(); continue }
    if (inF) continue
    if (/^#{1,6} /.test(l)) head++
    const isT = /^\|.*\|\s*$/.test(l)
    if (isT && !prevTbl) tbl++
    prevTbl = isT
    if (l.trim() === '' || isT || /^#{1,6} /.test(l)) flush()
    else para += (para ? ' ' : '') + l
  }
  flush()
  return { head, tbl, fences, longest }
}

if (!fs.existsSync(inDir)) { console.error(`inDir not found: ${inDir}`); process.exit(2) }
const rows = []
let failed = 0
for (const slug of fs.readdirSync(inDir).sort()) {
  const sd = path.join(inDir, slug)
  if (!fs.statSync(sd).isDirectory()) continue
  for (const loc of ['en', 'ru']) {
    const f = path.join(sd, `${loc}.html`)
    if (!fs.existsSync(f)) continue
    try {
      const html = fs.readFileSync(f, 'utf8')
      const md = convert(html)
      fs.mkdirSync(path.join(outDir, slug), { recursive: true })
      fs.writeFileSync(path.join(outDir, slug, `${loc}.md`), md)
      rows.push({ slug, locale: loc, in: Buffer.byteLength(html), out: Buffer.byteLength(md), ...stats(md) })
    } catch (e) {
      failed++
      console.error(`PARSE FAIL ${slug}/${loc}: ${e.message}`)
    }
  }
}
const cols = ['slug', 'locale', 'in', 'out', 'head', 'tbl', 'fences', 'longest']
const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c]).length)))
const fmt = (r) => cols.map((c, i) => String(r[c]).padEnd(w[i])).join('  ')
console.log(fmt(Object.fromEntries(cols.map((c) => [c, c]))))
rows.forEach((r) => console.log(fmt(r)))
if (failed) process.exit(1)
