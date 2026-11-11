import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context } from 'hono'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { loadEnv } from '../env.js'
import { getRequestLocale } from '../lib/localeContext.js'
import { findKnownName } from '../lib/funnelAccess.js'
import { getStripe } from '../lib/stripe.js'
import { fulfillKitCheckoutSession } from './stripeWebhook.js'
import { withLocalePrefix, type AppLocale } from '../lib/localePath.js'
import {
  advanceFunnelSession,
  createFunnelSession,
  FUNNEL_COOKIE,
  FUNNEL_TTL_MS,
  flowLandingPath,
  flowProgress,
  isFunnelFlow,
  isFunnelKit,
  type FunnelFlow,
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
  const flow = c.req.query('flow')
  if (flow && !u.searchParams.has('flow')) u.searchParams.set('flow', flow)
  return `${u.pathname}${u.search}`
}

function stripePublishableKey(): string {
  const env = loadEnv()
  return env.STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
}

/**
 * The URL the visitor is on wins: `session.lang` is only the starting language picked at checkout,
 * so a switch on an upsell page must not bounce the next step back to the old language.
 */
function funnelLocale(c: Context, _session?: FunnelSession): AppLocale {
  return getRequestLocale(c)
}

/** Keep the signed session's language in step with the page language (emails, Stripe, reminders follow it). */
function syncSessionLang(c: Context, session: FunnelSession): FunnelSession {
  const locale = getRequestLocale(c)
  return session.lang === locale ? session : { ...session, lang: locale }
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
    nextUrl: nextUrlAfter(session.step === 'done' ? 'onboard' : session.step, session.kit, locale, session.flow),
    day8: day8Iso(),
    dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
    email: session.email ?? '',
    name: session.name ?? '',
    stripePublishableKey: stripePublishableKey(),
    ...flowPayload(session.flow),
    ...extras,
  }
}

/** Header progress for the "account last" funnels: the pages show "Step N of total" from these. */
function flowPayload(flow: FunnelFlow | undefined): Record<string, unknown> {
  if (!flow) return {}
  return { flow, accountLast: true, stepTotal: flowProgress(flow).total }
}

/** Where the signed-in-to-nothing visitor goes when the funnel session is missing or expired. */
function landingFor(flow: FunnelFlow | undefined): string {
  return flow ? flowLandingPath(flow) : '/start'
}

function redirectToCurrent(c: Context, session: FunnelSession) {
  const locale = funnelLocale(c, session)
  if (session.step === 'done') return c.redirect(withLocalePrefix(locale, '/app/dashboard'), 302)
  return c.redirect(urlForFunnelStep(session.step, session.kit, locale), 302)
}

function requestedFlow(c: Context): FunnelFlow | undefined {
  const raw = c.req.query('flow')
  return isFunnelFlow(raw) ? raw : undefined
}

/** Requested page step vs session progress — skip already finished steps. */
function guardStep(c: Context, session: FunnelSession, requested: FunnelStep): Response | null {
  if (session.step === 'done') {
    return c.redirect(withLocalePrefix(funnelLocale(c, session), '/app/dashboard'), 302)
  }
  const have = stepIndex(session.step, session.flow)
  const want = stepIndex(requested, session.flow)
  // A page that is not part of this flow (e.g. /account/membership in Sub In) sends the visitor to their current step.
  if (want < 0 || want < have) return redirectToCurrent(c, session)
  return null
}

type PageFile = string | ((flow: FunnelFlow | undefined) => string)

function resolvePageFile(pageFile: PageFile, flow: FunnelFlow | undefined): string {
  return typeof pageFile === 'string' ? pageFile : pageFile(flow)
}

function serveAccountPage(
  c: Context,
  pageFile: PageFile,
  requested: FunnelStep,
  extras: (session: FunnelSession) => Record<string, unknown> = () => ({}),
) {
  if (previewAllowed(c)) {
    const flow = requestedFlow(c)
    const kit = (c.req.query('kit') as FunnelKit) || (flow ? 'starter' : 'guide')
    const locale = funnelLocale(c)
    const previewExtras = extras(createFunnelSession({ kit, step: requested, flow }))
    const nextFromExtras =
      typeof previewExtras.nextUrl === 'string'
        ? previewExtras.nextUrl
        : nextUrlAfter(requested, kit, locale, flow)
    const html = injectFunnel(loadPage(resolvePageFile(pageFile, flow)), {
      token: 'PREVIEW',
      kit,
      locale,
      preview: true,
      day8: day8Iso(),
      dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
      email: c.req.query('email') || 'preview@mindoraacademy.com',
      name: c.req.query('name') || '',
      stripePublishableKey: stripePublishableKey(),
      ...flowPayload(flow),
      ...previewExtras,
      nextUrl: withPreviewQuery(c, nextFromExtras),
    })
    return htmlResponse(c, html)
  }

  const found = readSession(c)
  if (!found) return c.redirect(withLocalePrefix(funnelLocale(c), landingFor(requestedFlow(c))), 302)

  const session = syncSessionLang(c, found.session)
  const blocked = guardStep(c, session, requested)
  if (blocked) return blocked

  // Refresh cookie when token arrived via query (Stripe success_url).
  const token = signFunnelToken(session)
  setFunnelCookie(c, token)

  const html = injectFunnel(
    loadPage(resolvePageFile(pageFile, session.flow)),
    funnelPayload(c, session, token, extras(session)),
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
    flow: requestedFlow(c),
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

funnelPageRoutes.get('/start-kit-sub-out', (c) => {
  const html = injectFunnel(loadPage('landing-sub-out.html'), {
    kit: 'starter',
    flow: 'sub_out',
    locale: getRequestLocale(c),
    preview: false,
  })
  return htmlResponse(c, html)
})

funnelPageRoutes.get('/start-kit-sub-in', (c) => {
  const html = injectFunnel(loadPage('landing-sub-in.html'), {
    kit: 'starter',
    flow: 'sub_in',
    locale: getRequestLocale(c),
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
    // Both funnels pay in `payment` mode; `subscription` is kept for Sub In Checkouts created before the switch.
    const paid = checkout.payment_status === 'paid' || checkout.payment_status === 'no_payment_required'
    if ((checkout.mode !== 'payment' && checkout.mode !== 'subscription') || !paid) return
    if (metadata.funnel_sid !== found.session.sid) return
    await fulfillKitCheckoutSession(checkout, metadata)
  } catch (error) {
    // The webhook may still fulfil it; never block the verify page on this.
    console.error('[funnel] checkout return fulfilment failed', sessionId, error)
  }
}

funnelPageRoutes.get('/account/verify', async (c) => {
  await fulfillCheckoutReturn(c)
  // The emailed activation link carries no name; take it from the account so the page does not ask for it again.
  const sessionForName = readSession(c)?.session
  let knownName = sessionForName?.name ?? ''
  if (!knownName && sessionForName?.flow && sessionForName.email) {
    knownName = await findKnownName(sessionForName.email).catch(() => '')
  }
  return serveAccountPage(c, 'verify.html', 'verify', (session) => ({
    // "Account last" flows verify at the very end, then onboard; the other funnels verify first, then membership.
    nextUrl: withLocalePrefix(funnelLocale(c, session), session.flow ? '/account/onboard' : '/account/membership'),
    email: session.email ?? c.req.query('email') ?? '',
    name: session.name || knownName,
  }))
})

funnelPageRoutes.get('/account/membership', async (c) => {
  // Sub Out lands here straight from Stripe: make sure the account and the saved card exist before the trial is started.
  await fulfillCheckoutReturn(c)
  return serveAccountPage(
    c,
    (flow) => (flow === 'sub_out' ? 'membership-sub-out.html' : 'membership.html'),
    'membership',
    (session) => ({
      nextUrl: withLocalePrefix(funnelLocale(c, session), '/account/upsell?step=prompts'),
      day8: day8Iso(),
    }),
  )
})

funnelPageRoutes.get('/account/upsell', async (c) => {
  // Sub In lands here straight from Stripe (step=prompts&session_id=...): fulfil if the webhook is late.
  await fulfillCheckoutReturn(c)
  const q = c.req.query('step') || 'prompts'
  const requested = stepFromUpsellQuery(q)
  if (!requested) {
    return c.redirect(withLocalePrefix(funnelLocale(c), '/account/upsell?step=prompts'), 302)
  }

  return serveAccountPage(c, 'upsell.html', requested, (session) => {
    const locale = funnelLocale(c, session)
    const next =
      requested === 'upsell_prompts'
        ? '/account/upsell?step=planners'
        : requested === 'upsell_planners'
          ? '/account/upsell?step=coach'
          : session.flow
            ? '/account/verify'
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
    const flow = requestedFlow(c)
    const kit = (c.req.query('kit') as FunnelKit) || (flow ? 'starter' : 'guide')
    const locale = funnelLocale(c)
    const html = injectFunnel(loadPage('onboard.html'), {
      token: 'PREVIEW',
      kit,
      locale,
      preview: true,
      ...flowPayload(flow),
      dashboardUrl: withLocalePrefix(locale, '/app/dashboard'),
    })
    return htmlResponse(c, html)
  }

  const found = readSession(c)
  if (!found) return next()

  const session = syncSessionLang(c, found.session)
  const blocked = guardStep(c, session, 'onboard')
  if (blocked) return blocked

  const token = signFunnelToken(session)
  setFunnelCookie(c, token)
  const locale = funnelLocale(c, session)
  const html = injectFunnel(
    loadPage('onboard.html'),
    funnelPayload(c, session, token, {
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
