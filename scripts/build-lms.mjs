import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.resolve(root, '../authorisation')
const dest = path.join(root, 'lms-dist')
const destIndex = path.join(dest, 'index.html')

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  return result.status ?? 1
}

if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID || process.env.RAILWAY_SERVICE_ID) {
  console.warn('[lms] skipped on Railway (no sibling authorisation in this clone)')
  process.exit(0)
}

if (!existsSync(path.join(src, 'package.json'))) {
  if (existsSync(destIndex)) {
    console.log('[lms] authorisation package not found; using existing lms-dist')
    process.exit(0)
  }
  // GitHub `mindora` / Railway clone is this folder only — sibling authorisation is not present.
  console.warn(
    '[lms] skipped: no ../authorisation in this clone. Funnel + API still build. LMS UI (/login, /app) is omitted until authorisation is present or lms-dist is checked in.',
  )
  process.exit(0)
}

if (!existsSync(path.join(src, 'node_modules'))) {
  const install = existsSync(path.join(src, 'package-lock.json'))
    ? run('npm', ['ci'], src)
    : run('npm', ['install'], src)
  if (install !== 0) process.exit(install)
}

const build = run('npm', ['run', 'build'], src)
if (build !== 0) process.exit(build)

const dist = path.join(src, 'dist')
if (!existsSync(path.join(dist, 'index.html'))) {
  console.error('[lms] authorisation build did not produce dist/index.html')
  process.exit(1)
}

rmSync(dest, { recursive: true, force: true })
cpSync(dist, dest, { recursive: true })
console.log(`[lms] copied ${dist} → ${dest}`)
