import { Resend } from 'resend'
import { loadEnv } from '../env.js'

const BRAND = 'MindoraAcademy.com'
const BRAND_NAME = 'MindoraAcademy'
const TLD = '.com'
const BRAND_HOST = 'mindoraacademy.com'
const DEFAULT_ORIGIN = 'https://www.mindoraacademy.com'
const BLUE = '#2563eb'
const DARK = '#0a0a0a'
const GREY = '#6b7280'
const FONT = "font-family:Arial,Helvetica,sans-serif;"

const PLAN_LABELS: Record<string, string> = {
  'claude-ai-certification': 'Claude AI Certification',
  '28-day-ai-challenge': '28-Day AI Challenge',
  'success-assessment': 'Success Assessment',
}

export type TrialReceipt = {
  to: string
  amountCents: number
  paidAt: Date
}

export type CancellationEmail = {
  to: string
  accessUntil: Date
}

export type TrialWelcomeEmail = {
  to: string
  planLabel: string
}

export function planLabelFromFunnel(funnel?: string | null): string {
  if (!funnel) return 'MindoraAcademy Pro'
  return PLAN_LABELS[funnel] ?? 'MindoraAcademy Pro'
}

export async function sendOtpEmail(email: string, token: string): Promise<void> {
  const env = loadEnv()
  if (!env.AUTH_RESEND_KEY) {
    if (env.NODE_ENV === 'production') {
      throw new Error('AUTH_RESEND_KEY is not configured')
    }
    console.log(`[otp] ${email} → ${token}`)
    return
  }

  const resend = new Resend(env.AUTH_RESEND_KEY)
  const { error } = await resend.emails.send({
    from: env.AUTH_EMAIL,
    to: email,
    subject: 'Sign in to MindoraAcademy.com',
    text: `Your verification code is: ${token}\n\nThis code will expire in 15 minutes.`,
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendTrialReceiptEmail(receipt: TrialReceipt): Promise<void> {
  const env = loadEnv()
  const amount = formatUsd(receipt.amountCents)
  const date = formatLongDate(receipt.paidAt)
  const origin = publicOrigin()
  const year = receipt.paidAt.getFullYear()
  const subject = `${BRAND} — Trial payment receipt (${amount})`

  if (!env.AUTH_RESEND_KEY) {
    if (env.NODE_ENV === 'production') {
      console.error(`[receipt] AUTH_RESEND_KEY missing; skipped ${receipt.to} → ${amount}`)
      return
    }
    console.log(`[receipt] ${receipt.to} → ${amount}`)
    return
  }

  const resend = new Resend(env.AUTH_RESEND_KEY)
  const { error } = await resend.emails.send({
    from: env.AUTH_EMAIL,
    to: receipt.to,
    subject,
    text: trialReceiptText({ amount, date, origin, year }),
    html: brandedEmailHtml({
      origin,
      year,
      innerHtml: trialReceiptInnerHtml({ amount, date, origin }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendCancellationEmail(input: CancellationEmail): Promise<void> {
  const env = loadEnv()
  const origin = publicOrigin()
  const year = input.accessUntil.getFullYear()
  const accessUntil = formatLongDate(input.accessUntil)
  const subject = `${BRAND} — Cancellation confirmed`

  if (!env.AUTH_RESEND_KEY) {
    if (env.NODE_ENV === 'production') {
      console.error(`[cancel-mail] AUTH_RESEND_KEY missing; skipped ${input.to}`)
      return
    }
    console.log(`[cancel-mail] ${input.to} → access until ${accessUntil}`)
    return
  }

  const resend = new Resend(env.AUTH_RESEND_KEY)
  const { error } = await resend.emails.send({
    from: env.AUTH_EMAIL,
    to: input.to,
    subject,
    text: cancellationText({ origin, year, accessUntil }),
    html: brandedEmailHtml({
      origin,
      year,
      innerHtml: cancellationInnerHtml({ origin, accessUntil }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendTrialWelcomeEmail(input: TrialWelcomeEmail): Promise<void> {
  const env = loadEnv()
  const origin = publicOrigin()
  const year = new Date().getFullYear()
  const planLabel = input.planLabel || 'MindoraAcademy Pro'
  const subject = `Welcome to ${BRAND}! Your 3-day trial has started`

  if (!env.AUTH_RESEND_KEY) {
    if (env.NODE_ENV === 'production') {
      console.error(`[welcome-mail] AUTH_RESEND_KEY missing; skipped ${input.to}`)
      return
    }
    console.log(`[welcome-mail] ${input.to} → ${planLabel}`)
    return
  }

  const resend = new Resend(env.AUTH_RESEND_KEY)
  const { error } = await resend.emails.send({
    from: env.AUTH_EMAIL,
    to: input.to,
    subject,
    text: trialWelcomeText({ origin, year, planLabel }),
    html: brandedEmailHtml({
      origin,
      year,
      innerHtml: trialWelcomeInnerHtml({ origin, planLabel }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

function publicOrigin(): string {
  const origin = loadEnv().PUBLIC_ORIGIN.replace(/\/$/, '')
  return origin || DEFAULT_ORIGIN
}

function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function chatUrl(origin: string): string {
  return `${origin}/support?chat=open`
}

function loginUrl(origin: string): string {
  return `${origin}/login`
}

function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">${label}</a>`
}

function brandedEmailHtml({
  origin,
  year,
  innerHtml,
}: {
  origin: string
  year: number
  innerHtml: string
}): string {
  const chat = chatUrl(origin)
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f3f4f6;${FONT}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:16px 28px;background:#0a0a0a;text-align:center;">
              <a href="${chat}" style="color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;">Need help? 24/7 Live Chat Support</a>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;text-align:center;">
              <span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${DARK};">${BRAND_NAME}</span><span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${BLUE};">${TLD}</span>
            </td>
          </tr>
          ${innerHtml}
          <tr>
            <td style="padding:0 28px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:14px;line-height:1.5;color:${DARK};">Need a hand? Ask Maya in the Support Centre — answers in minutes, 24/7. <a href="${chat}" style="color:${BLUE};font-weight:600;">Open live chat</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.5;color:${GREY};">You received this email because you have a ${BRAND} account. This is a service message about your account or payment.</p>
              <p style="margin:0;font-size:12px;color:${GREY};">© ${year} ${BRAND} · ${BRAND_HOST}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function trialReceiptInnerHtml({
  amount,
  date,
  origin,
}: {
  amount: string
  date: string
  origin: string
}): string {
  const chat = chatUrl(origin)
  const profile = `${origin}/app/profile`
  return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Your trial payment receipt</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Hi there</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Thanks for starting your trial — here's confirmation of your payment. Here's your receipt.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">AMOUNT PAID</p>
                    <p style="margin:0;font-size:22px;font-weight:800;color:${DARK};">${amount}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">DATE</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${date}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">You can update your payment method or manage your plan, or cancel at any time in Your Profile Settings at: <a href="${profile}" style="color:${BLUE};font-weight:600;">${profile}</a></p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">Questions about this charge? <a href="${chat}" style="color:${BLUE};font-weight:600;">Chat live here 24/7</a>. Alternatively reply to this email.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— The ${BRAND} Team</p>
            </td>
          </tr>`
}

function trialReceiptText({
  amount,
  date,
  origin,
  year,
}: {
  amount: string
  date: string
  origin: string
  year: number
}): string {
  const chat = chatUrl(origin)
  const profile = `${origin}/app/profile`
  return [
    `Need help? 24/7 Live Chat Support`,
    chat,
    '',
    BRAND,
    '',
    'Your trial payment receipt',
    '',
    'Hi there',
    '',
    "Thanks for starting your trial — here's confirmation of your payment. Here's your receipt.",
    '',
    `AMOUNT PAID  ${amount}`,
    `DATE         ${date}`,
    '',
    'You can update your payment method or manage your plan, or cancel at any time in Your Profile Settings at:',
    profile,
    '',
    'Questions about this charge? Chat live here 24/7:',
    chat,
    '',
    'Alternatively reply to this email.',
    '',
    `— The ${BRAND} Team`,
    '',
    'Need a hand? Ask Maya in the Support Centre — answers in minutes, 24/7.',
    chat,
    '',
    `You received this email because you have a ${BRAND} account. This is a service message about your account or payment.`,
    '',
    `© ${year} ${BRAND} · ${BRAND_HOST}`,
  ].join('\n')
}

function cancellationInnerHtml({ origin, accessUntil }: { origin: string; accessUntil: string }): string {
  const login = loginUrl(origin)
  const support = `${origin}/support`
  return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Cancellation confirmed</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">This confirms your ${BRAND} subscription has been cancelled. Nothing further is needed from you.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Your progress, streaks and badges are saved permanently — they'll be waiting if you decide to come back.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">FULL ACCESS UNTIL</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${accessUntil}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">AFTER THAT DATE</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">No further charges will be taken</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(login, 'Resubscribe any time')}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">We'd genuinely like to know why you're leaving — reply to this email or visit <a href="${support}" style="color:${BLUE};font-weight:600;">${BRAND_HOST}/support</a>.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— The ${BRAND} Team</p>
            </td>
          </tr>`
}

function cancellationText({
  origin,
  year,
  accessUntil,
}: {
  origin: string
  year: number
  accessUntil: string
}): string {
  const chat = chatUrl(origin)
  const login = loginUrl(origin)
  return [
    `Need help? 24/7 Live Chat Support`,
    chat,
    '',
    BRAND,
    '',
    'Cancellation confirmed',
    '',
    `This confirms your ${BRAND} subscription has been cancelled. Nothing further is needed from you.`,
    '',
    "Your progress, streaks and badges are saved permanently — they'll be waiting if you decide to come back.",
    '',
    `FULL ACCESS UNTIL  ${accessUntil}`,
    'AFTER THAT DATE    No further charges will be taken',
    '',
    'Resubscribe any time:',
    login,
    '',
    `We'd genuinely like to know why you're leaving — reply to this email or visit ${BRAND_HOST}/support.`,
    '',
    `— The ${BRAND} Team`,
    '',
    'Need a hand? Ask Maya in the Support Centre — answers in minutes, 24/7.',
    chat,
    '',
    `You received this email because you have a ${BRAND} account. This is a service message about your account or payment.`,
    '',
    `© ${year} ${BRAND} · ${BRAND_HOST}`,
  ].join('\n')
}

function trialWelcomeInnerHtml({ origin, planLabel }: { origin: string; planLabel: string }): string {
  const login = loginUrl(origin)
  return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Your 3-day trial has started</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">You've just taken the first step toward transforming your life. Your account is ready and waiting.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">There's no password to remember. Enter your email on the login page and we'll send you a one-time code.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">YOUR PLAN</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${planLabel}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">TRIAL LENGTH</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">3 days</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(login, 'Log in to MindoraAcademy')}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">The first three things to do: complete the Success Assessment, start your first lesson, and explore the course categories to find what you need most.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— The ${BRAND} Team</p>
            </td>
          </tr>`
}

function trialWelcomeText({
  origin,
  year,
  planLabel,
}: {
  origin: string
  year: number
  planLabel: string
}): string {
  const chat = chatUrl(origin)
  const login = loginUrl(origin)
  return [
    `Need help? 24/7 Live Chat Support`,
    chat,
    '',
    BRAND,
    '',
    'Your 3-day trial has started',
    '',
    "You've just taken the first step toward transforming your life. Your account is ready and waiting.",
    '',
    "There's no password to remember. Enter your email on the login page and we'll send you a one-time code.",
    '',
    `YOUR PLAN     ${planLabel}`,
    'TRIAL LENGTH  3 days',
    '',
    'Log in to MindoraAcademy:',
    login,
    '',
    'The first three things to do: complete the Success Assessment, start your first lesson, and explore the course categories to find what you need most.',
    '',
    `— The ${BRAND} Team`,
    '',
    'Need a hand? Ask Maya in the Support Centre — answers in minutes, 24/7.',
    chat,
    '',
    `You received this email because you have a ${BRAND} account. This is a service message about your account or payment.`,
    '',
    `© ${year} ${BRAND} · ${BRAND_HOST}`,
  ].join('\n')
}
