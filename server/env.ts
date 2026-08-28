import { randomBytes } from 'node:crypto'
import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.preprocess((value) => {
    if (value === 'production' || value === 'test' || value === 'development') return value
    if (value === 'prod') return 'production'
    if (value === undefined || value === '') return 'development'
    return 'production'
  }, z.enum(['development', 'production', 'test'])),
  PORT: z.preprocess(
    (value) => (value === undefined || value === '' ? 3000 : value),
    z.coerce.number().int().positive(),
  ),
  DATABASE_URL: z.string().optional().default(''),
  SESSION_SECRET: z.string().optional().default(''),
  STRIPE_SECRET_KEY: z.string().optional().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(''),
  STRIPE_MONTHLY_PRICE_ID: z.string().optional().default(''),
  STRIPE_SIX_MONTH_PRICE_ID: z.string().optional().default(''),
  STRIPE_TWELVE_MONTH_PRICE_ID: z.string().optional().default(''),
  AUTH_RESEND_KEY: z.string().optional().default(''),
  AUTH_EMAIL: z.string().optional().default('SuccessWise.ai <onboarding@resend.dev>'),
  META_PIXEL_ID: z.string().optional().default(''),
  META_ACCESS_TOKEN: z.string().optional().default(''),
  MARKETING_DIST: z.string().optional().default(''),
  PUBLIC_ORIGIN: z.string().optional().default(''),
  OPENAI_API_KEY: z.string().optional().default(''),
  ANTHROPIC_API_KEY: z.string().optional().default(''),
  WISE_MODEL: z.string().optional().default(''),
})

export type Env = z.infer<typeof EnvSchema>

let cached: Env | undefined

export function loadEnv(): Env {
  if (cached) return cached
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
    throw new Error(`Invalid environment: ${issues}`)
  }
  const data = parsed.data
  if (data.SESSION_SECRET.length < 16) {
    console.warn(
      '[env] SESSION_SECRET missing or shorter than 16 chars; using an ephemeral secret. Set SESSION_SECRET in Railway Variables so sessions survive restarts.',
    )
    data.SESSION_SECRET = randomBytes(32).toString('hex')
  }
  if (!data.DATABASE_URL) {
    console.warn(
      '[env] DATABASE_URL is not set. Add Postgres and set DATABASE_URL=${{Postgres.DATABASE_URL}} (private) on the service.',
    )
  }
  cached = data
  return cached
}
