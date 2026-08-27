import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(16),
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
  cached = parsed.data
  return cached
}
