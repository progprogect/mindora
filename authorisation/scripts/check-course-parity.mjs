// Compares EN and RU course lessons card by card and prints suspicious pairs.
// Heuristics only (shape, leading emoji, quote marks, digits, quiz answers): a hit means "look at this
// lesson", not "this is wrong". Usage: node scripts/check-course-parity.mjs [--course=<slug>] [--json]
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/content/courses')
const only = process.argv.find((a) => a.startsWith('--course='))?.slice(9)
const asJson = process.argv.includes('--json')

const EMOJI = /^\s*((?:\p{Extended_Pictographic}️?)|[✅❌])/u
const lead = (s) => EMOJI.exec(s ?? '')?.[1]?.replace(/️/g, '') ?? ''
const hasQuote = (s) => /["“”«»]/.test(s ?? '')
const digits = (s) =>
  ((s ?? '').replace(/(\d)[\s,. ](?=\d{3}\b)/g, '$1').match(/\d+/g) ?? []).sort().join(',')

function lessonsOf(data) {
  const out = new Map()
  const walk = (x) => {
    if (Array.isArray(x)) return x.forEach(walk)
    if (x && typeof x === 'object') {
      if (typeof x.id === 'string' && Array.isArray(x.cards)) out.set(x.id, x)
      Object.values(x).forEach(walk)
    }
  }
  walk(data)
  return out
}

function compareText(where, en, ru, issues, { quotes = true } = {}) {
  if (lead(en) !== lead(ru)) issues.push(`${where}: icon EN "${lead(en)}" vs RU "${lead(ru)}"`)
  if (quotes && hasQuote(en) !== hasQuote(ru)) issues.push(`${where}: quotes EN ${hasQuote(en)} vs RU ${hasQuote(ru)}`)
  if (digits(en) !== digits(ru)) issues.push(`${where}: numbers EN [${digits(en)}] vs RU [${digits(ru)}]`)
}

function compareLesson(id, en, ru) {
  const issues = []
  if (en.cards.length !== ru.cards.length) {
    issues.push(`cards: EN ${en.cards.length} vs RU ${ru.cards.length}`)
    return issues
  }
  en.cards.forEach((card, i) => {
    const rc = ru.cards[i]
    const at = `card ${i + 1} (${card.type})`
    if (card.type !== rc.type) issues.push(`${at}: type RU ${rc.type}`)
    compareText(`${at} headline`, card.headline, rc.headline, issues, { quotes: false })
    const eb = card.bullets ?? []
    const rb = rc.bullets ?? []
    if (eb.length !== rb.length) issues.push(`${at}: bullets EN ${eb.length} vs RU ${rb.length}`)
    eb.forEach((b, j) => rb[j] !== undefined && compareText(`${at} bullet ${j + 1}`, b, rb[j], issues))
  })
  const eq = Array.isArray(en.quiz) ? en.quiz : (en.quiz?.questions ?? [])
  const rq = Array.isArray(ru.quiz) ? ru.quiz : (ru.quiz?.questions ?? [])
  if (eq.length !== rq.length) issues.push(`quiz: EN ${eq.length} vs RU ${rq.length} questions`)
  eq.forEach((q, i) => {
    const r = rq[i]
    if (!r) return
    const at = `quiz ${i + 1}`
    if (q.correctIndex !== r.correctIndex) issues.push(`${at}: correctIndex EN ${q.correctIndex} vs RU ${r.correctIndex}`)
    if ((q.options ?? []).length !== (r.options ?? []).length) issues.push(`${at}: options count differs`)
    if (q.type !== r.type) issues.push(`${at}: type RU ${r.type}`)
    compareText(`${at} question`, q.question, r.question, issues)
  })
  return issues
}

const report = []
const files = readdirSync(path.join(root, 'ru')).filter((f) => f.endsWith('.json'))
for (const file of files) {
  if (only && file !== `${only}.json`) continue
  const enPath = path.join(root, file)
  if (!existsSync(enPath)) continue
  const en = lessonsOf(JSON.parse(readFileSync(enPath, 'utf8')))
  const ru = lessonsOf(JSON.parse(readFileSync(path.join(root, 'ru', file), 'utf8')))
  for (const [id, lesson] of en) {
    const ruLesson = ru.get(id)
    const issues = ruLesson ? compareLesson(id, lesson, ruLesson) : ['missing in RU']
    if (issues.length) report.push({ course: file.replace(/\.json$/, ''), lesson: id, issues })
  }
}

if (asJson) console.log(JSON.stringify(report, null, 2))
else {
  for (const r of report) console.log(`${r.course}/${r.lesson}\n  - ${r.issues.join('\n  - ')}`)
  console.log(`\ncheck-course-parity: ${report.length} lesson(s) to review`)
}
