import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const githubRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.resolve(githubRoot, '../authorisation')
const dest = path.join(githubRoot, 'authorisation')

const SKIP = new Set(['node_modules', 'dist', 'server-dist', '.env', '.env.local'])

if (!existsSync(path.join(src, 'package.json'))) {
  console.error(`[sync] canonical authorisation not found at ${src}`)
  process.exit(1)
}

if (existsSync(dest)) {
  for (const name of readdirSync(dest)) {
    if (SKIP.has(name)) continue
    rmSync(path.join(dest, name), { recursive: true, force: true })
  }
} else {
  mkdirSync(dest, { recursive: true })
}

function copyTree(from, to) {
  mkdirSync(to, { recursive: true })
  for (const name of readdirSync(from)) {
    if (SKIP.has(name)) continue
    const fromPath = path.join(from, name)
    const toPath = path.join(to, name)
    cpSync(fromPath, toPath, {
      recursive: true,
      filter: (entry) => !SKIP.has(path.basename(entry)),
    })
  }
}

copyTree(src, dest)
console.log(`[sync] copied ${src} → ${dest}`)
