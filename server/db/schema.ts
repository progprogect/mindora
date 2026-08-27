import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    name: text('name'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('users_email_idx').on(table.email)],
)

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tokenHash: text('token_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('sessions_token_hash_idx').on(table.tokenHash),
    index('sessions_user_id_idx').on(table.userId),
  ],
)

export const otpCodes = pgTable(
  'otp_codes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    codeHash: text('code_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('otp_codes_email_idx').on(table.email)],
)

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull().default(''),
    email: text('email'),
    onboardingComplete: boolean('onboarding_complete').notNull().default(false),
    pacePreference: text('pace_preference'),
    focusCategory: text('focus_category'),
    funnelSource: text('funnel_source'),
    joinDate: timestamp('join_date', { withTimezone: true }).notNull().defaultNow(),
    planTier: text('plan_tier'),
    quizAnswers: jsonb('quiz_answers'),
    quizRole: text('quiz_role'),
    stripeCustomerId: text('stripe_customer_id'),
  },
  (table) => [uniqueIndex('profiles_user_id_idx').on(table.userId)],
)

export const loginRateLimits = pgTable(
  'login_rate_limits',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    failedCount: integer('failed_count').notNull().default(0),
    windowStartedAt: timestamp('window_started_at', { withTimezone: true }).notNull(),
    lockedUntil: timestamp('locked_until', { withTimezone: true }),
    lastFailedAt: timestamp('last_failed_at', { withTimezone: true }).notNull(),
  },
  (table) => [uniqueIndex('login_rate_limits_email_idx').on(table.email)],
)

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    funnel: text('funnel').notNull(),
    consent: boolean('consent').notNull(),
    name: text('name'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('leads_email_idx').on(table.email)],
)

export const leadSurveyData = pgTable(
  'lead_survey_data',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    funnel: text('funnel').notNull(),
    answers: text('answers').notNull(),
    role: text('role').notNull(),
    profileScore: integer('profile_score').notNull(),
    scoreLabel: text('score_label').notNull(),
    archetype: text('archetype').notNull(),
    checkoutInitiated: boolean('checkout_initiated'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('lead_survey_data_email_idx').on(table.email)],
)

export const products = pgTable(
  'products',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    stripePriceId: text('stripe_price_id').notNull(),
    price: integer('price').notNull(),
    intervalMonths: integer('interval_months').notNull(),
    badge: text('badge'),
    active: boolean('active').notNull().default(true),
  },
  (table) => [index('products_active_idx').on(table.active)],
)

export const checkoutOffers = pgTable(
  'checkout_offers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionKey: text('session_key').notNull(),
    percentOff: integer('percent_off').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (table) => [uniqueIndex('checkout_offers_session_key_idx').on(table.sessionKey)],
)

export const processedStripePayments = pgTable(
  'processed_stripe_payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    paymentIntentId: text('payment_intent_id').notNull(),
    customerId: text('customer_id').notNull(),
    subscriptionId: text('subscription_id'),
    email: text('email'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('processed_stripe_payments_pi_idx').on(table.paymentIntentId)],
)

export const upsellEvents = pgTable(
  'upsell_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    offerSlug: text('offer_slug').notNull(),
    action: text('action').notNull(),
    reason: text('reason'),
    source: text('source'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('upsell_events_user_offer_idx').on(table.userId, table.offerSlug),
    index('upsell_events_user_idx').on(table.userId),
  ],
)

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),
  plan: text('plan'),
  renewsAt: timestamp('renews_at', { withTimezone: true }),
  stripeSubscriptionId: text('stripe_subscription_id'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const lessonProgress = pgTable(
  'lesson_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseSlug: text('course_slug').notNull(),
    lessonSlug: text('lesson_slug').notNull(),
    status: text('status').notNull(),
    xp: integer('xp').notNull().default(0),
    completedAt: timestamp('completed_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('lesson_progress_user_course_lesson_idx').on(
      table.userId,
      table.courseSlug,
      table.lessonSlug,
    ),
    index('lesson_progress_user_idx').on(table.userId),
  ],
)

export const dailyStats = pgTable(
  'daily_stats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    streak: integer('streak').notNull().default(0),
    lastLessonDate: text('last_lesson_date'),
    xpTotal: integer('xp_total').notNull().default(0),
  },
  (table) => [uniqueIndex('daily_stats_user_id_idx').on(table.userId)],
)

export const badges = pgTable(
  'badges',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    badgeId: text('badge_id').notNull(),
    earnedAt: timestamp('earned_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('badges_user_badge_idx').on(table.userId, table.badgeId),
    index('badges_user_idx').on(table.userId),
  ],
)

export const purchases = pgTable(
  'purchases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    sku: text('sku').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('purchases_user_sku_idx').on(table.userId, table.sku),
    index('purchases_user_idx').on(table.userId),
  ],
)

export const wiseUsage = pgTable(
  'wise_usage',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    day: text('day').notNull(),
    count: integer('count').notNull().default(0),
  },
  (table) => [uniqueIndex('wise_usage_user_day_idx').on(table.userId, table.day)],
)

export const wiseThreads = pgTable(
  'wise_threads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull().default('Chat'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('wise_threads_user_idx').on(table.userId)],
)

export const wiseMessages = pgTable(
  'wise_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    threadId: uuid('thread_id')
      .notNull()
      .references(() => wiseThreads.id, { onDelete: 'cascade' }),
    role: text('role').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('wise_messages_thread_idx').on(table.threadId)],
)
