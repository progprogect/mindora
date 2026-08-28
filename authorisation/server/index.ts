import './loadDotenv.js'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { serve } from '@hono/node-server'
import { runMigrations } from './db/migrate.js'
import { loadEnv } from './env.js'
import { createLmsApi } from './lmsApi.js'
import { createLmsStatic } from './spa/lmsStatic.js'

const env = loadEnv()

export { createLmsApi }
export const app = createLmsApi()

function lmsDistPath(): string {
  if (env.LMS_DIST) return env.LMS_DIST
  const fallback = path.resolve(process.cwd(), 'dist')
  return existsSync(path.join(fallback, 'index.html')) ? fallback : ''
}

const lms = lmsDistPath()
if (lms) {
  app.all('*', createLmsStatic(lms))
  console.log(`[spa] lms=${lms}`)
} else if (env.NODE_ENV === 'production') {
  console.warn('[spa] LMS dist not found; static hosting disabled')
}

async function main() {
  await runMigrations()
  serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    console.log(`[api] LMS listening on :${info.port}`)
  })
}

main().catch((error: unknown) => {
  console.error('[api] failed to start', error)
  process.exit(1)
})
