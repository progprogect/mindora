# SuccessWise

Railway app: one Node process serves the marketing SPA, the LMS SPA, and `/api`. Postgres via `DATABASE_URL`. Convex is not used.

## Quick start

```bash
cp .env.example .env
# fill DATABASE_URL, SESSION_SECRET (16+ chars), Stripe keys
npm install
npm run dev
```

- Vite (marketing): `http://localhost:5173` (proxies `/api` and `/stripe` to `:3000`)
- Funnel API: `http://localhost:3000` (runs migrations on start)
- LMS (canonical): from `../authorisation`, `npm run dev` → web `:5175` + API `:3001` (do not proxy LMS to `:3000`)

Needs a running Postgres. Seed catalog prices after the first start:

```bash
npm run db:seed
```

Local LMS login is `../authorisation` (`npm run dev`) with its own Postgres and `:3001`. This github API stays the funnel + Railway mirror until `createLmsApi` is mounted here.

## Environment variables

Copy `.env.example` → `.env` (or `.env.local`).

| Variable | When | Purpose |
|----------|------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | build | Stripe.js |
| `VITE_META_PIXEL_ID` | build | Meta Pixel |
| `VITE_META_CAPI_ENABLED` | build | Relay browser events to `/api/meta/event` |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | build | PostHog |
| `DATABASE_URL` | runtime | Postgres |
| `SESSION_SECRET` | runtime | Cookie HMAC (≥ 16 chars) |
| `STRIPE_SECRET_KEY` | runtime | PaymentIntents + webhook |
| `STRIPE_WEBHOOK_SECRET` | runtime | `POST /stripe/webhook` |
| `STRIPE_*_PRICE_ID` | runtime | Recurring prices after the $1 trial |
| `AUTH_RESEND_KEY` | runtime | OTP email (required in production) |
| `META_ACCESS_TOKEN` | runtime | Conversions API |
| `LMS_DIST` | runtime | Optional override; `npm run build` writes `./lms-dist` |
| `PUBLIC_ORIGIN` | runtime | Stripe Customer Portal return origin |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | runtime | Wise LLM (canned replies if unset) |

`VITE_*` are inlined at **build**. Secrets stay runtime-only.

## Build / Railway

```bash
npm run build
npm start
```

`build` compiles the server and marketing SPA. Locally it also copies LMS from `../authorisation` → `./lms-dist`. The GitHub `mindora` clone (and Railway) does not include that sibling folder, so LMS UI is skipped there; `/login` and `/app` fall back to the marketing SPA. The process listens on `$PORT`. Healthcheck: `GET /api/health` (DB ping).

Required Railway variables (service → Variables):

- `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (private URL of a Postgres plugin in the **same** project)
- `SESSION_SECRET` — 16+ random characters
- `RAILPACK_NO_SPA=1` if the builder tries to serve `dist/` as a static site

Without Postgres the HTTP server still listens and serves the marketing SPA; `/api/health` returns `{ ok: true, db: false }`. Node 22 is required (Vite 8).

Stripe webhook URL: `https://<railway>/stripe/webhook`.

## Routes

| Path | Page |
|------|------|
| `/` | Marketing home |
| `/quiz/28-day-ai-challenge` | 28-day quiz funnel |
| `/quiz/claude-ai-certification` | Claude quiz funnel |
| `/checkout/setup` | LMS account setup after trial (not the funnel stub) |
| `/checkout?product=&funnel=` | Expired-offer $1 checkout |
| `/login`, `/account/*`, `/app/*`, `/courses/*` | LMS SPA |
| `/api/health` | Health + database |
| `/api/me`, `/api/progress`, `/api/wise/*` | LMS session, XP, Wise |
