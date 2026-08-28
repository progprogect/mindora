import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { loadEnv } from './env.js'
import { authRoutes } from './routes/auth.js'
import { healthRoutes } from './routes/health.js'
import { meRoutes } from './routes/me.js'
import { progressRoutes } from './routes/progress.js'
import { purchaseRoutes } from './routes/purchases.js'
import { stripeWebhookHandler } from './routes/stripeWebhook.js'
import { subscriptionRoutes } from './routes/subscription.js'
import { upsellRoutes } from './routes/upsell.js'
import { wiseRoutes } from './routes/wise.js'

/** LMS `/api` routes only — no cors, logger, `/health`, or `/stripe/webhook`. */
export function createLmsRoutes(): Hono {
  const api = new Hono()
  api.route('/', authRoutes)
  api.route('/', meRoutes)
  api.route('/', subscriptionRoutes)
  api.route('/', progressRoutes)
  api.route('/', purchaseRoutes)
  api.route('/', wiseRoutes)
  api.route('/', upsellRoutes)
  return api
}

/** Standalone LMS Hono app: `/api/*` cookie session + `POST /stripe/webhook` (add-on `metadata.offerSlug`). */
export function createLmsApi(): Hono {
  const env = loadEnv()
  const app = new Hono()

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

  const api = createLmsRoutes()
  api.route('/', healthRoutes)
  app.route('/api', api)

  return app
}
