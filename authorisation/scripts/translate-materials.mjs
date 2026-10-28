#!/usr/bin/env node
// Translate content/materials/<slug>/<from>.md into <to>.md via the Anthropic Messages API.
// Usage: node scripts/translate-materials.mjs --slug <slug> --from en --to ru [--out <dir>] [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MAX_CHUNK = 6000;
const MAX_VALIDATION_RETRIES = 2;
const MAX_HTTP_RETRIES = 5;
const LANG_NAMES = { en: 'English', ru: 'Russian' };

function parseArgs(argv) {
  const a = { from: 'en', to: 'ru', out: null, slug: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--slug') a.slug = argv[++i];
    else if (k === '--from') a.from = argv[++i];
    else if (k === '--to') a.to = argv[++i];
    else if (k === '--out') a.out = argv[++i];
    else if (k === '--dry-run') a.dryRun = true;
    else { console.error(`Unknown argument: ${k}`); process.exit(2); }
  }
  if (!a.slug) {
    console.error('Usage: node scripts/translate-materials.mjs --slug <slug> --from en --to ru [--out <dir>] [--dry-run]');
    process.exit(2);
  }
  return a;
}

// ---- code protection -------------------------------------------------------
function protectCode(text) {
  const codes = [];
  const put = (s) => { codes.push(s); return `<<CODE_${codes.length - 1}>>`; };
  // fenced blocks (``` or ~~~), line-based so unclosed fences run to EOF
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})/);
    if (m) {
      const fence = m[2];
      const ch = fence[0];
      let j = i + 1;
      while (j < lines.length) {
        const c = lines[j].match(/^\s*(`{3,}|~{3,})\s*$/);
        if (c && c[1][0] === ch && c[1].length >= fence.length) break;
        j++;
      }
      const end = Math.min(j, lines.length - 1);
      out.push(m[1] + put(lines.slice(i, end + 1).join('\n')));
      i = end + 1;
    } else { out.push(lines[i]); i++; }
  }
  // inline code
  const joined = out.join('\n').replace(/(`+)(?!`)([^\n]*?[^`\n])\1(?!`)/g, (s) => put(s));
  return { text: joined, codes };
}
function restoreCode(text, codes) {
  return text.replace(/<<CODE_(\d+)>>/g, (s, n) => (codes[+n] !== undefined ? codes[+n] : s));
}

// ---- chunking --------------------------------------------------------------
const isHeading2or3 = (l) => /^#{2,3}\s/.test(l);
const isTableLine = (l) => /^\s*\|/.test(l);

// Split a section into atomic blocks: paragraphs (blank-line separated) with tables kept whole.
function toBlocks(section) {
  const lines = section.split('\n');
  const blocks = [];
  let cur = [];
  const flush = () => { if (cur.length) { blocks.push(cur.join('\n')); cur = []; } };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const lastLine = i === lines.length - 1;
    cur.push(l + (lastLine ? '' : '\n'));
    if (l.trim() === '') {
      // blank line ends a block unless next line continues a table
      if (!(cur.length > 1 && isTableLine(cur[cur.length - 2]) && lines[i + 1] && isTableLine(lines[i + 1]))) flush();
    }
  }
  flush();
  return blocks.map((b) => b); // already contain their newlines
}

function chunkText(text) {
  const lines = text.split('\n');
  const sections = [];
  let cur = [];
  lines.forEach((l, idx) => {
    if (isHeading2or3(l) && cur.length) { sections.push(cur.join('')); cur = []; }
    cur.push(l + (idx === lines.length - 1 ? '' : '\n'));
  });
  if (cur.length) sections.push(cur.join(''));

  const chunks = [];
  let acc = '';
  const push = () => { if (acc) { chunks.push(acc); acc = ''; } };
  for (const sec of sections) {
    if (sec.length > MAX_CHUNK) {
      push();
      for (const b of toBlocks(sec)) {
        if (acc && acc.length + b.length > MAX_CHUNK) push();
        acc += b;
      }
      push();
    } else {
      if (acc && acc.length + sec.length > MAX_CHUNK) push();
      acc += sec;
    }
  }
  push();
  return chunks;
}

// ---- validation ------------------------------------------------------------
function stats(t) {
  const L = t.split('\n');
  const headings = L.filter((l) => /^#{1,6}\s/.test(l)).map((l) => l.match(/^#+/)[0].length).join(',');
  const items = L.filter((l) => /^\s*([-*+]|\d+[.)])\s/.test(l)).length;
  const rows = L.filter(isTableLine).length;
  const ph = (t.match(/<<CODE_\d+>>/g) || []).sort().join('');
  const emoji = (t.match(/\p{Extended_Pictographic}/gu) || []).length;
  return { headings, items, rows, ph, emoji };
}
function validate(src, dst) {
  const a = stats(src), b = stats(dst), bad = [];
  for (const k of Object.keys(a)) if (a[k] !== b[k]) bad.push(k);
  return bad;
}

// ---- API -------------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function systemPrompt(from, to, glossary) {
  const pair = glossary[`${from}-${to}`] || {};
  const gl = Object.entries(pair).map(([k, v]) => `- ${k} => ${v}`).join('\n');
  const dnt = (glossary.doNotTranslate || []).join(', ');
  return `You translate markdown from ${LANG_NAMES[from] || from} into ${LANG_NAMES[to] || to}.
Rules:
- Translate faithfully into natural, fluent ${LANG_NAMES[to] || to} prose; do not summarize, add or omit anything.
- Keep the markdown structure identical in shape: same heading levels, same list items and nesting, same table rows and columns, same blank lines and paragraph breaks. Do not add or drop blocks.
- Keep all emoji exactly as they are, in the same positions.
- Placeholders like <<CODE_3>> stand for code and must be copied verbatim, exactly once each, in the same order. Never translate, move, or alter them.
- Do not translate product names (${dnt}) or URLs.
- Use this glossary for preferred terminology:
${gl}
- Output only the translation, with no preface, notes, or surrounding code fences.`;
}

async function callApi(system, text) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is not set');
  const model = process.env.TRANSLATE_MODEL || 'claude-sonnet-5-5';
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: 16000, system, messages: [{ role: 'user', content: text }] }),
      });
    } catch (e) {
      if (attempt >= MAX_HTTP_RETRIES) throw e;
      await sleep(1000 * 2 ** attempt);
      continue;
    }
    if (res.ok) {
      const j = await res.json();
      return (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    }
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_HTTP_RETRIES) {
      const ra = Number(res.headers.get('retry-after'));
      await sleep(ra > 0 ? ra * 1000 : 1000 * 2 ** attempt + Math.random() * 500);
      continue;
    }
    throw new Error(`API error ${res.status}: ${(await res.text()).slice(0, 500)}`);
  }
}

async function translateChunk(chunk, n, system) {
  const lead = chunk.match(/^\s*/)[0], trail = chunk.match(/\s*$/)[0];
  const body = chunk.trim();
  if (!body) return chunk;
  let last = body;
  for (let t = 0; t <= MAX_VALIDATION_RETRIES; t++) {
    const out = (await callApi(system, body)).trim();
    last = out;
    const bad = validate(body, out);
    if (!bad.length) return lead + out + trail;
    console.warn(`  chunk ${n}: validation mismatch (${bad.join(', ')}), attempt ${t + 1}/${MAX_VALIDATION_RETRIES + 1}`);
  }
  console.warn(`WARNING: chunk ${n} failed validation; written with TRANSLATION-CHECK marker`);
  return `${lead}<!-- TRANSLATION-CHECK: chunk ${n} -->\n${last}${trail}`;
}

// ---- main ------------------------------------------------------------------
const args = parseArgs(process.argv.slice(2));
const srcPath = path.join(ROOT, 'content', 'materials', args.slug, `${args.from}.md`);
if (!fs.existsSync(srcPath)) { console.error(`Not found: ${srcPath}`); process.exit(1); }
const source = fs.readFileSync(srcPath, 'utf8');
const { text: protectedText, codes } = protectCode(source);
const chunks = chunkText(protectedText);

if (args.dryRun) {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  console.log(`${args.slug}: ${chunks.length} chunks, ${total} chars (protected), ${source.length} chars (source), ${codes.length} code spans`);
  process.exit(0);
}

const glossary = JSON.parse(fs.readFileSync(path.join(__dirname, 'translation-glossary.json'), 'utf8'));
const system = systemPrompt(args.from, args.to, glossary);
const outDir = path.resolve(args.out || path.join(ROOT, 'translations-out'));
const outPath = path.join(outDir, `${args.to}.md`);
const outFile = args.out ? outPath : path.join(outDir, args.slug, `${args.to}.md`);

const results = [];
for (let i = 0; i < chunks.length; i++) {
  console.log(`[${args.slug}] chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
  results.push(await translateChunk(chunks[i], i + 1, system));
}
const finalText = restoreCode(results.join(''), codes);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, finalText);
console.log(`Wrote ${outFile}`);
