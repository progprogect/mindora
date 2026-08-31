import { randomBytes } from 'node:crypto'
import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.preprocess((value) => {
    if (value === 'production' || value === 'test' || value === 'development') return value
    if (value === 'prod') return 'production'
    if (value === undefined || value === '') return 'development'
    return 'production'
  }, z.enum(['development', 'production', 'test'])),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().optional().default(''),
  SESSION_SECRET: z.string().optional().default(''),
  STRIPE_SECRET_KEY: z.string().optional().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(''),
  SMTP_HOST: z.string().optional().default('mail.privateemail.com'),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_SECURE: z.preprocess((value) => {
    if (value === undefined || value === '') return true
    if (value === true || value === 'true' || value === '1') return true
    if (value === false || value === 'false' || value === '0') return false
    return value
  }, z.boolean()),
  SMTP_USER: z.string().optional().default('support@mindoraacademy.com'),
  SMTP_PASS: z.string().optional().default(''),
  AUTH_EMAIL: z.string().optional().default('SuccessWise.ai <support@mindoraacademy.com>'),
  LMS_DIST: z.string().optional().default(''),
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
      '[env] SESSION_SECRET missing or shorter than 16 chars; using an ephemeral secret. Set SESSION_SECRET so sessions survive restarts.',
    )
    data.SESSION_SECRET = randomBytes(32).toString('hex')
    process.env.SESSION_SECRET = data.SESSION_SECRET
  }
  cached = data
  return cached
}
