import './loadDotenv.js'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createLmsRoutes } from 'successwise-app/lms-api'
import { runMigrations } from './db/migrate.js'
import { loadEnv } from './env.js'
import { checkoutRoutes } from './routes/checkout.js'
import { healthRoutes } from './routes/health.js'
import { leadRoutes } from './routes/leads.js'
import { metaRoutes } from './routes/meta.js'
import { productRoutes } from './routes/products.js'
import { stripeWebhookHandler } from './routes/stripeWebhook.js'
import { createSpaGateway } from './spa/gateway.js'

const env = loadEnv()

export const app = new Hono()

app.use('*', logger())
if (env.NODE_ENV !== 'production') {
  app.use(
    '*',
    cors({
      origin: (origin) => origin,
      credentials: true,
    }),
  )
}

app.post('/stripe/webhook', stripeWebhookHandler)

const api = new Hono()
api.route('/', healthRoutes)
api.route('/', createLmsRoutes())
api.route('/', leadRoutes)
api.route('/', productRoutes)
api.route('/', checkoutRoutes)
api.route('/', metaRoutes)
app.route('/api', api)

function marketingDistPath(): string {
  if (env.MARKETING_DIST) return env.MARKETING_DIST
  const fallback = path.resolve(process.cwd(), 'dist')
  return existsSync(path.join(fallback, 'index.html')) ? fallback : ''
}

const marketing = marketingDistPath()
if (marketing) {
  app.all('*', createSpaGateway({ marketing }))
  console.log(`[spa] marketing=${marketing}`)
} else if (env.NODE_ENV === 'production') {
  console.warn('[spa] marketing dist not found; static gateway disabled')
}

async function main() {
  // Bind first so Railway healthchecks do not kill the process during migrations.
  serve({ fetch: app.fetch, port: env.PORT, hostname: '0.0.0.0' }, (info) => {
    console.log(`[api] listening on ${info.address}:${info.port}`)
  })
  if (!env.DATABASE_URL) return
  try {
    await runMigrations()
    console.log('[api] migrations applied')
  } catch (error: unknown) {
    console.error('[api] migrations failed; SPA is up, API needs a reachable Postgres', error)
  }
}

main().catch((error: unknown) => {
  console.error('[api] failed to start', error)
  process.exit(1)
})
