export type CurrentUser = {
  name: string
  email: string
  onboardingComplete: boolean
  pacePreference?: string
  focusCategory?: string
  funnelSource?: string
  joinDate?: number
  planTier?: string
  streakCount: number
  xp: number
  lastActivityDate?: string | null
}

export type ChargeResult = {
  success: boolean
  alreadyPurchased?: boolean
  reason?: string
  error?: string
  checkoutUrl?: string
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  const data: unknown = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && typeof (data as { error: unknown }).error === 'string'
        ? (data as { error: string }).error
        : `Request failed (${response.status})`
    const code =
      data && typeof data === 'object' && 'code' in data && typeof (data as { code: unknown }).code === 'string'
        ? (data as { code: string }).code
        : undefined
    throw new ApiError(message, response.status, code)
  }
  return data as T
}

export function apiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.message) return error.message
  return fallback
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const response = await fetch('/api/me', { credentials: 'include' })
  if (response.status === 401) return null
  const data: unknown = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new ApiError('Failed to load session', response.status)
  }
  return data as CurrentUser
}

export async function sendOtp(email: string) {
  await apiJson<{ ok: true }>('/api/auth/otp/send', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function verifyOtp(email: string, code: string) {
  await apiJson<{ ok: true }>('/api/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  })
}

export async function signOut() {
  await apiJson<{ ok: true }>('/api/auth/signout', { method: 'POST', body: '{}' })
}

export async function completeProfile(args: {
  name: string
  planTier: string
  quizAnswers?: unknown
  quizRole?: string
  funnelSource?: string
}) {
  return apiJson<{ id?: string }>('/api/me', {
    method: 'PATCH',
    body: JSON.stringify(args),
  })
}

export async function completeOnboarding(args: { pacePreference: string; focusCategory: string }) {
  return apiJson<{ id?: string }>('/api/me/onboard', {
    method: 'POST',
    body: JSON.stringify(args),
  })
}

export async function updateFunnelSource(args: { funnelSource: string; focusCategory?: string }) {
  return apiJson<{ id?: string | null }>('/api/me/funnel-source', {
    method: 'PATCH',
    body: JSON.stringify(args),
  })
}

export async function syncEmailAfterSetup(args: { oldEmail: string; newEmail: string; funnel?: string }) {
  return apiJson<{ ok: true }>('/api/me/sync-email', {
    method: 'POST',
    body: JSON.stringify(args),
  })
}

export async function fetchUpsellStatus(offerSlug: string) {
  return apiJson<{ status: string }>(`/api/upsell/${encodeURIComponent(offerSlug)}`)
}

export async function fetchHasSavedCard() {
  return apiJson<boolean>('/api/upsell/has-card')
}

export async function recordUpsellEvent(args: {
  offerSlug: string
  action: string
  reason?: string
  source?: string
}) {
  return apiJson<{ id?: string }>('/api/upsell/event', {
    method: 'POST',
    body: JSON.stringify(args),
  })
}

export async function recordUpsellFailure(args: { offerSlug: string; reason: string; source?: string }) {
  return recordUpsellEvent({
    offerSlug: args.offerSlug,
    action: 'failed',
    reason: args.reason,
    source: args.source,
  })
}

export async function chargeUpsell(args: { offerSlug: string; attribution?: unknown; returnPath?: string }) {
  return apiJson<ChargeResult>('/api/upsell/charge', {
    method: 'POST',
    body: JSON.stringify({
      offerSlug: args.offerSlug,
      attribution: args.attribution,
      returnPath: args.returnPath ?? checkoutReturnPath(),
    }),
  })
}

export function checkoutReturnPath() {
  const url = new URL(window.location.href)
  url.searchParams.delete('session_id')
  url.searchParams.delete('upsell')
  return `${url.pathname}${url.search}`
}

export async function completeUpsellCheckout(sessionId: string) {
  return apiJson<{ success: boolean; offerSlug?: string; reason?: string; error?: string }>(
    `/api/upsell/complete?session_id=${encodeURIComponent(sessionId)}`,
  )
}

/** Charge saved card, or redirect to Stripe Checkout when `checkoutUrl` is returned. */
export async function buyOffer(args: { offerSlug: string; attribution?: unknown }): Promise<ChargeResult> {
  const result = await chargeUpsell(args)
  if (result.checkoutUrl) {
    window.onbeforeunload = null
    window.location.assign(result.checkoutUrl)
  }
  return result
}

export function upsellPaymentNote(hasSavedCard: boolean | undefined) {
  if (hasSavedCard === true) return 'Charges your saved card. Instant access after purchase.'
  return 'Secure payment via Stripe'
}

export async function fetchPromptVaultKey() {
  return apiJson<{ key: 'prompt-vault' | null }>('/api/upsell/prompt-vault-key')
}

export type ProgressPayload = {
  lessons: Array<{
    courseId: string
    lessonSlug: string
    status: string
    xpEarned: number
    completedAt: number | null
  }>
  badges: Array<{ badgeId: string; earnedAt: number }>
  user: { xp: number; streakCount: number; lastActivityDate: string | null }
}

export async function fetchProgress() {
  return apiJson<ProgressPayload>('/api/progress')
}

export async function completeLesson(args: {
  courseSlug: string
  lessonSlug: string
  xpValue: number
  correct?: number
  total?: number
  localDate?: string
  moduleLessonSlugs?: string[]
  totalLessons?: number
}) {
  return apiJson<{
    alreadyCompleted: boolean
    xpEarned: number
    newBadges: string[]
    newStreak: number
    dailyBonusApplied: boolean
    stats: { xp: number; streakCount: number; lastActivityDate: string | null }
  }>('/api/progress/complete', { method: 'POST', body: JSON.stringify(args) })
}

export type SubscriptionDto = {
  status: string
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
} | null

export async function fetchSubscription() {
  return apiJson<SubscriptionDto>('/api/me/subscription')
}

export async function openBillingPortal() {
  return apiJson<{ url: string }>('/api/me/subscription/portal', {
    method: 'POST',
    body: JSON.stringify({ returnUrl: `${window.location.origin}/app/profile` }),
  })
}

export async function cancelSubscription() {
  return apiJson<{ immediate: boolean }>('/api/me/subscription/cancel', {
    method: 'POST',
    body: '{}',
  })
}

export async function updateName(name: string) {
  return apiJson<{ ok: true; name: string }>('/api/me/name', {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  })
}

export async function updatePreferences(args: { pacePreference?: string; focusCategory?: string }) {
  return apiJson<{ id?: string | null }>('/api/me/preferences', {
    method: 'PATCH',
    body: JSON.stringify(args),
  })
}

export async function fetchPurchases() {
  return apiJson<{ purchases: Array<{ sku: string; createdAt: number; amountCents: number | null }> }>(
    '/api/purchases',
  )
}

export async function fetchWiseUsage() {
  return apiJson<{ used: number; limit: number; unlocked: boolean }>('/api/wise/usage')
}

export async function fetchWiseThreads() {
  return apiJson<{
    threads: Array<{
      id: string
      title: string
      updatedAt: number
      lastMessageAt: number
      preview: string
      messageCount: number
      createdAt: number
    }>
  }>('/api/wise/threads')
}

export async function fetchWiseThread(id: string) {
  return apiJson<{
    id: string
    title: string
    messages: Array<{ id: string; role: string; content: string; createdAt: number }>
  }>(`/api/wise/threads/${id}`)
}

export async function sendWiseMessage(args: { text: string; threadId?: string; localDate?: string }) {
  const response = await fetch('/api/wise/messages', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  const data = (await response.json().catch(() => ({}))) as {
    locked?: boolean
    quota?: { used: number; limit: number; unlocked: boolean }
    threadId?: string
    reply?: string
    error?: string
  }
  if (response.status === 402) return { locked: true as const, quota: data.quota }
  if (!response.ok) throw new ApiError(data.error || 'Wise failed', response.status)
  return data
}
