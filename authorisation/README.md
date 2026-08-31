# SuccessWise LMS (`authorisation/`)

Canonical `/login`, `/account`, `/app` SPA **and** LMS API. Two processes in this package: Vite on `:5175` and Hono on `:3001`. Postgres is a **separate** database from the github funnel (`DATABASE_URL` must not be the github DB until Wave 8 glue).

## Quick start

```bash
cp .env.example .env
# set DATABASE_URL (e.g. .../successwise_lms) and SESSION_SECRET (16+ chars)
npm install
npm run dev
```

- Web: http://localhost:5175/login (proxies `/api` and `/stripe` to `:3001`)
- API: http://localhost:3001 (`GET /api/health`, migrations on start)

Keep the github process **stopped** for LMS login. Vite must not proxy to `:3000`.

Without `SMTP_PASS`, OTP is printed in the API log:

```
[otp] you@example.com → 123456
```

Sign-in uses cookie `sw_session`. Onboarded users land on `/app/dashboard`.

```bash
npm run build
npm start
```

`start` serves `dist/` plus `/api` on `$PORT` (default 3001).

The github funnel (`/api/leads`, quiz checkout) runs on `github/` `:3000` with LMS routes mounted from a nested copy of this package (`github/authorisation`). Local LMS development in this folder stays on `:3001`.
