import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'authorisation')

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  return result.status ?? 1
}

if (!existsSync(path.join(src, 'package.json'))) {
  console.error(
    '[lms] missing ./authorisation. From the monorepo run: node scripts/sync-authorisation.mjs',
  )
  process.exit(1)
}

if (!existsSync(path.join(src, 'node_modules'))) {
  const install = existsSync(path.join(src, 'package-lock.json'))
    ? run('npm', ['ci'], src)
    : run('npm', ['install'], src)
  if (install !== 0) process.exit(install)
}

const api = existsSync(path.join(src, 'package.json'))
  ? run('npm', ['run', 'build:api'], src)
  : 1
if (api !== 0) process.exit(api)
console.log('[lms] built authorisation API (server-dist)')
