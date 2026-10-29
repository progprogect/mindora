import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context } from 'hono'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { loadEnv } from '../env.js'
import { getRequestLocale } from '../lib/localeContext.js'
import { getStripe } from '../lib/stripe.js'
import { fulfillKitCheckoutSession } from './stripeWebhook.js'
import { withLocalePrefix, type AppLocale } from '../lib/localePath.js'
import {
  advanceFunnelSession,
  createFunnelSession,
  FUNNEL_COOKIE,
  FUNNEL_TTL_MS,
  isFunnelKit,
  type FunnelKit,
  type FunnelSession,
  type FunnelStep,
  nextUrlAfter,
  signFunnelToken,
  stepFromUpsellQuery,
  stepIndex,
  urlForFunnelStep,
  verifyFunnelToken,
} from '../lib/funnelToken.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function funnelPagesRoot(): string {
  const candidates = [
    path.resolve(process.cwd(), 'funnel-pages'),
    path.resolve(__dirname, '../../funnel-pages'),
  ]
  for (const dir of candidates) {
    if (existsSync(path.join(dir, 'verify.html'))) return dir
  }
  return candidates[0]!
}

function cookieOpts() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'Lax' as const,
    secure: loadEnv().NODE_ENV === 'production',
    maxAge: Math.floor(FUNNEL_TTL_MS / 1000),
  }
}

export function setFunnelCookie(c: Context, token: string) {
  setCookie(c, FUNNEL_COOKIE, token, cookieOpts())
}

export function clearFunnelCookie(c: Context) {
  deleteCookie(c, FUNNEL_COOKIE, cookieOpts())
}

function readSession(c: Context): { session: FunnelSession; token: string } | null {
  const fromQuery = c.req.query('token')
  const fromCookie = getCookie(c, FUNNEL_COOKIE)
  const raw = fromQuery || fromCookie
  const session = verifyFunnelToken(raw)
  if (!session || !raw) return null
  return { session, token: fromQuery ? signFunnelToken(session) : raw }
}

function injectFunnel(html: string, funnel: Record<string, unknown>): string {
  const json = JSON.stringify(funnel).replace(/</g, '\\u003c')
  const tag = `<script>window.FUNNEL=${json};</script>`
  if (html.includes('<head>')) return html.replace('<head>', `<head>\n${tag}`)
  return `${tag}\n${html}`
}

function day8Iso(): string {
  return new Date(Date.now() + 3 * 864e5).toISOString()
}

function loadPage(name: string): string {
  const file = path.join(funnelPagesRoot(), name)
  return readFileSync(file, 'utf8')
}

function htmlResponse(c: Context, body: string) {
  c.header('Content-Type', 'text/html; charset=utf-8')
  c.header('Cache-Control', 'no-store')
  return c.body(body, 200)
}

function previewAllowed(c: Context): boolean {
  if (c.req.query('preview') !== '1') return false
  return loadEnv().NODE_ENV !== 'production'
}

/** Keep preview/kit/lang on funnel links so local ?preview=1 chains stay open. */
function withPreviewQuery(c: Context, path: string): string {
  if (!previewAllowed(c)) return path
  const u = new URL(path, 'http://local.invalid')
  u.searchParams.set('preview', '1')
  const kit = c.req.query('kit')
  if (kit && !u.searchParams.has('kit')) u.searchParams.set('kit', kit)
  const lang = c.req.query('lang')
  if (lang && !u.searchParams.has('lang')) u.searchParams.set('lang', lang)
  return `${u.pathname}${u.search}`
}

function stripePublishableKey(): string {
  const env = loadEnv()
  return env.STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
}

function funnelLocale(c: Context, session?: FunnelSession): AppLocale {
  if (session?.lang === 'en' || session?.lang === 'ru') return session.lang
  return getRequestLocale(c)
}

function funnelPayload(
  c: Context,
  session: FunnelSession,
  token: string,
  extras: Record<string, unknown> = {},
): Record<string, unknown> {
  const locale = funnelLocale(c, session)
  return {
    token,
    kit: session.kit,
    locale,
    preview: false,
    nextUrl: nextUrlAfter(session.step === 'done' ? 'onboard' : session.step, session.kit, locale),
    day8: day8Iso(),
    dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
    email: session.email ?? '',
    name: session.name ?? '',
    stripePublishableKey: stripePublishableKey(),
    ...extras,
  }
}

function redirectToCurrent(c: Context, session: FunnelSession) {
  const locale = funnelLocale(c, session)
  if (session.step === 'done') return c.redirect(withLocalePrefix(locale, '/app/dashboard'), 302)
  return c.redirect(urlForFunnelStep(session.step, session.kit, locale), 302)
}

/** Requested page step vs session progress — skip already finished steps. */
function guardStep(c: Context, session: FunnelSession, requested: FunnelStep): Response | null {
  if (session.step === 'done') {
    return c.redirect(withLocalePrefix(funnelLocale(c, session), '/app/dashboard'), 302)
  }
  const have = stepIndex(session.step)
  const want = stepIndex(requested)
  if (want < have) return redirectToCurrent(c, session)
  return null
}

function serveAccountPage(
  c: Context,
  pageFile: string,
  requested: FunnelStep,
  extras: (session: FunnelSession) => Record<string, unknown> = () => ({}),
) {
  if (previewAllowed(c)) {
    const kit = (c.req.query('kit') as FunnelKit) || 'guide'
    const locale = funnelLocale(c)
    const previewExtras = extras(createFunnelSession({ kit, step: requested }))
    const nextFromExtras =
      typeof previewExtras.nextUrl === 'string'
        ? previewExtras.nextUrl
        : nextUrlAfter(requested, kit, locale)
    const html = injectFunnel(loadPage(pageFile), {
      token: 'PREVIEW',
      kit,
      locale,
      preview: true,
      day8: day8Iso(),
      dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
      email: c.req.query('email') || 'preview@mindoraacademy.com',
      name: c.req.query('name') || '',
      stripePublishableKey: stripePublishableKey(),
      ...previewExtras,
      nextUrl: withPreviewQuery(c, nextFromExtras),
    })
    return htmlResponse(c, html)
  }

  const found = readSession(c)
  if (!found) return c.redirect(withLocalePrefix(funnelLocale(c), '/start'), 302)

  const blocked = guardStep(c, found.session, requested)
  if (blocked) return blocked

  // Refresh cookie when token arrived via query (Stripe success_url).
  const token = signFunnelToken(found.session)
  setFunnelCookie(c, token)

  const html = injectFunnel(
    loadPage(pageFile),
    funnelPayload(c, found.session, token, extras(found.session)),
  )
  return htmlResponse(c, html)
}

export const funnelPageRoutes = new Hono()

/** Dev-only: mint a funnel session and redirect into the path (smoke / local QA). */
funnelPageRoutes.get('/dev/funnel-enter', (c) => {
  if (loadEnv().NODE_ENV === 'production') return c.text('Not found', 404)
  const kitRaw = c.req.query('kit') || 'guide'
  const kit = isFunnelKit(kitRaw) ? kitRaw : 'guide'
  const stepRaw = c.req.query('step') || 'verify'
  const step = (
    [
      'verify',
      'membership',
      'upsell_coach',
      'upsell_prompts',
      'upsell_planners',
      'onboard',
      'done',
    ] as const
  ).includes(stepRaw as FunnelStep)
    ? (stepRaw as FunnelStep)
    : 'verify'
  const { token } = mintFunnelToken(kit, {
    step,
    email: c.req.query('email') || 'dev@mindoraacademy.com',
    name: c.req.query('name') || 'Dev User',
  })
  setFunnelCookie(c, token)
  const locale = funnelLocale(c)
  const dest = urlForFunnelStep(step, kit, locale)
  const sep = dest.includes('?') ? '&' : '?'
  return c.redirect(`${dest}${sep}token=${encodeURIComponent(token)}`, 302)
})

funnelPageRoutes.get('/start', (c) => {
  const locale = getRequestLocale(c)
  const html = injectFunnel(loadPage('landing-guides.html'), {
    kit: 'guide',
    locale,
    preview: false,
  })
  return htmlResponse(c, html)
})

funnelPageRoutes.get('/start-kit', (c) => {
  const locale = getRequestLocale(c)
  const html = injectFunnel(loadPage('landing.html'), {
    kit: 'starter',
    locale,
    preview: false,
  })
  return htmlResponse(c, html)
})

/**
 * Safety net for a late or missing `checkout.session.completed` webhook: on return from Stripe Checkout,
 * fulfil the kit purchase here so `/account/membership` finds the Stripe customer and saved card.
 * Idempotent — `fulfillKitCheckoutSession` skips payments that were already processed.
 */
async function fulfillCheckoutReturn(c: Context): Promise<void> {
  const sessionId = c.req.query('session_id')
  if (!sessionId || previewAllowed(c)) return
  const found = readSession(c)
  if (!found) return
  try {
    const checkout = await getStripe().checkout.sessions.retrieve(sessionId)
    const metadata = (checkout.metadata as Record<string, string> | null) ?? {}
    if (checkout.mode !== 'payment' || checkout.payment_status !== 'paid') return
    if (metadata.funnel_sid !== found.session.sid) return
    await fulfillKitCheckoutSession(checkout, metadata)
  } catch (error) {
    // The webhook may still fulfil it; never block the verify page on this.
    console.error('[funnel] checkout return fulfilment failed', sessionId, error)
  }
}

funnelPageRoutes.get('/account/verify', async (c) => {
  await fulfillCheckoutReturn(c)
  return serveAccountPage(c, 'verify.html', 'verify', (session) => ({
    nextUrl: withLocalePrefix(funnelLocale(c, session), '/account/membership'),
    email: session.email ?? c.req.query('email') ?? '',
    name: session.name ?? '',
  }))
})

funnelPageRoutes.get('/account/membership', (c) =>
  serveAccountPage(c, 'membership.html', 'membership', (session) => ({
    nextUrl: withLocalePrefix(funnelLocale(c, session), '/account/upsell?step=coach'),
    day8: day8Iso(),
  })),
)

funnelPageRoutes.get('/account/upsell', (c) => {
  const q = c.req.query('step') || 'coach'
  const requested = stepFromUpsellQuery(q)
  if (!requested) {
    return c.redirect(withLocalePrefix(funnelLocale(c), '/account/upsell?step=coach'), 302)
  }

  return serveAccountPage(c, 'upsell.html', requested, (session) => {
    const locale = funnelLocale(c, session)
    const next =
      requested === 'upsell_coach'
        ? '/account/upsell?step=prompts'
        : requested === 'upsell_prompts'
          ? '/account/upsell?step=planners'
          : '/account/onboard'
    return { nextUrl: withLocalePrefix(locale, next), kit: session.kit }
  })
})

/**
 * Funnel HTML onboard when a funnel session exists.
 * Otherwise fall through to the React LMS onboard in the SPA.
 */
export async function maybeServeFunnelOnboard(c: Context, next: () => Promise<void | Response>) {
  if (c.req.method !== 'GET' && c.req.method !== 'HEAD') return next()

  if (previewAllowed(c)) {
    const kit = (c.req.query('kit') as FunnelKit) || 'guide'
    const locale = funnelLocale(c)
    const html = injectFunnel(loadPage('onboard.html'), {
      token: 'PREVIEW',
      kit,
      locale,
      preview: true,
      dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
    })
    return htmlResponse(c, html)
  }

  const found = readSession(c)
  if (!found) return next()

  const blocked = guardStep(c, found.session, 'onboard')
  if (blocked) return blocked

  const token = signFunnelToken(found.session)
  setFunnelCookie(c, token)
  const locale = funnelLocale(c, found.session)
  const html = injectFunnel(
    loadPage('onboard.html'),
    funnelPayload(c, found.session, token, {
      nextUrl: withLocalePrefix(locale, '/app/dashboard'),
      dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
    }),
  )
  return htmlResponse(c, html)
}

/** Dev/helper: mint a funnel token (used later by checkout webhook; useful for smoke tests). */
export function mintFunnelToken(kit: FunnelKit, extras: Partial<FunnelSession> = {}) {
  const session = createFunnelSession({ kit, ...extras })
  return { session, token: signFunnelToken(session) }
}

export function bumpFunnelCookie(c: Context, session: FunnelSession, next: FunnelStep) {
  const updated = advanceFunnelSession(session, next)
  const token = signFunnelToken(updated)
  setFunnelCookie(c, token)
  return { session: updated, token }
}
