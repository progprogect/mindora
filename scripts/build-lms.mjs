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

if (!existsSync(path.join(src, 'package.json'))) {
  if (existsSync(destIndex)) {
    console.log('[lms] authorisation package not found; using existing lms-dist')
    process.exit(0)
  }
  console.error('[lms] missing ../authorisation and lms-dist/index.html')
  process.exit(1)
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
