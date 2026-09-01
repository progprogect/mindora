# MindoraAcademy

Railway app: one Node process serves a **single SPA** (marketing + LMS routes) and `/api`. Postgres via `DATABASE_URL`. Convex is not used.

This folder is a **full project**: funnel + LMS UI in one Vite `dist` + LMS API (`createLmsRoutes` from the nested `authorisation/` package). Railway / GitHub clones of this folder do not need a sibling `../authorisation`.

## Quick start

```bash
cp .env.example .env
# fill DATABASE_URL, SESSION_SECRET (16+ chars), Stripe keys
npm install
npm run dev
```

- Vite (one SPA): `http://localhost:5173` — marketing `/`, LMS `/login` `/app/*`, funnels; proxies `/api` and `/stripe` to `:3000`
- API: `http://localhost:3000` — funnel **and** LMS (`/api/auth`, `/api/me`, session cookie `sw_session`)
- Isolated LMS canon (optional): `npm run dev:lms` → Vite `:5175` (not required to view the github origin)
- Production-like: `npm run build && npm start` — one `dist/index.html` for every HTML path

One `DATABASE_URL` for leads, trial, and LMS (OTP, progress, purchases).

Seed catalog prices after the first start:

```bash
npm run db:seed
```

Canonical LMS **source** still lives in the monorepo `../authorisation/` (local `:5175` + `:3001`, its own `.env`). After changing that package, refresh the nested copy:

```bash
npm run sync:authorisation
```

Do **not** apply `authorisation/drizzle/0000_lms.sql` on this database. Railway migrations are `drizzle/0000_init.sql` + `drizzle/0001_lms.sql`.

## Environment variables

Copy `.env.example` → `.env` (or `.env.local`).

| Variable | When | Purpose |
|----------|------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | build | Stripe.js |
| `VITE_META_PIXEL_ID` | build | Meta Pixel |
| `VITE_META_CAPI_ENABLED` | build | Relay browser events to `/api/meta/event` |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | build | PostHog |
| `DATABASE_URL` | runtime | Postgres (funnel + LMS) |
| `SESSION_SECRET` | runtime | Cookie HMAC (≥ 16 chars) |
| `STRIPE_SECRET_KEY` | runtime | PaymentIntents + webhook |
| `STRIPE_WEBHOOK_SECRET` | runtime | `POST /stripe/webhook` |
| `STRIPE_*_PRICE_ID` | runtime | Recurring prices after the $1 trial |
| `AUTH_RESEND_KEY` | runtime | Resend API key for OTP (required in production) |
| `AUTH_EMAIL` | runtime | OTP From header (default `MindoraAcademy.com <support@mindoraacademy.com>`) |
| `META_ACCESS_TOKEN` | runtime | Conversions API |
| `PUBLIC_ORIGIN` | runtime | Stripe Customer Portal return origin |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | runtime | Wise LLM (canned replies if unset) |

`VITE_*` are inlined at **build**. Secrets stay runtime-only.

## Build / Railway

```bash
npm run build
npm start
```

`build` compiles the nested LMS **API** (`authorisation/server-dist`), then this server and the one SPA (`vite build` → `dist/`). The process listens on `$PORT`. Healthcheck: `GET /api/health`.

Required Railway variables (service → Variables):

- `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (private URL of a Postgres plugin in the **same** project)
- `SESSION_SECRET` — 16+ random characters
- `AUTH_RESEND_KEY` — Resend API key for OTP (`re_…`; domain `mindoraacademy.com` must be Verified)
- `RAILPACK_NO_SPA=1` if the builder tries to serve `dist/` as a static site

Without Postgres the HTTP server still listens and serves the SPA; `/api/health` returns `{ ok: true, db: false }`. Node 22 is required (Vite 8).

Stripe webhook URL: `https://<railway>/stripe/webhook`. Trial payments create a subscription; add-on payments with `metadata.offerSlug` write `purchases`.

## Routes

| Path | Page |
|------|------|
| `/` | Marketing home |
| `/quiz/28-day-ai-challenge` | 28-day quiz funnel |
| `/quiz/claude-ai-certification` | Claude quiz funnel |
| `/checkout/setup` | LMS account setup after trial (OTP / card) |
| `/checkout?product=&funnel=` | Expired-offer $1 checkout |
| `/login`, `/account/*`, `/app/*` | LMS |
| `/dashboard` | Alias → `/app/dashboard` |
| `/courses/:slug` | Redirect → `/app/courses/:slug` |
| `/api/health` | Health + database |
| `/api/me`, `/api/progress`, `/api/wise/*` | LMS session, XP, Wise |
| `/api/leads` | Funnel leads |
