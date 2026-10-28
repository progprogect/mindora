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

export type MailLocale = 'en' | 'ru'

export type TrialReceipt = {
  to: string
  amountCents: number
  paidAt: Date
  locale?: MailLocale
}

export type CancellationEmail = {
  to: string
  accessUntil: Date
  locale?: MailLocale
}

export type TrialWelcomeEmail = {
  to: string
  planLabel: string
  locale?: MailLocale
}

export type TrialChargeReminderEmail = {
  to: string
  amountCents: number
  chargeAt: Date
  locale?: MailLocale
}

export function planLabelFromFunnel(funnel?: string | null): string {
  if (!funnel) return 'MindoraAcademy Pro'
  return PLAN_LABELS[funnel] ?? 'MindoraAcademy Pro'
}

export async function sendOtpEmail(email: string, token: string, locale: 'en' | 'ru' = 'en'): Promise<void> {
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
    subject: locale === 'ru' ? 'Вход в MindoraAcademy.com' : 'Sign in to MindoraAcademy.com',
    text:
      locale === 'ru'
        ? `Ваш код подтверждения: ${token}\n\nКод действует 15 минут.`
        : `Your verification code is: ${token}\n\nThis code will expire in 15 minutes.`,
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendTrialReceiptEmail(receipt: TrialReceipt): Promise<void> {
  const env = loadEnv()
  const locale = resolveMailLocale(receipt.locale)
  const amount = formatUsd(receipt.amountCents)
  const date = formatLongDate(receipt.paidAt, locale)
  const origin = publicOrigin()
  const year = receipt.paidAt.getFullYear()
  const subject =
    locale === 'ru'
      ? `${BRAND} — Квитанция об оплате пробного периода (${amount})`
      : `${BRAND} — Trial payment receipt (${amount})`

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
    text: trialReceiptText({ amount, date, origin, year, locale }),
    html: brandedEmailHtml({
      origin,
      year,
      locale,
      innerHtml: trialReceiptInnerHtml({ amount, date, origin, locale }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendCancellationEmail(input: CancellationEmail): Promise<void> {
  const env = loadEnv()
  const locale = resolveMailLocale(input.locale)
  const origin = publicOrigin()
  const year = input.accessUntil.getFullYear()
  const accessUntil = formatLongDate(input.accessUntil, locale)
  const subject =
    locale === 'ru' ? `${BRAND} — Отмена подтверждена` : `${BRAND} — Cancellation confirmed`

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
    text: cancellationText({ origin, year, accessUntil, locale }),
    html: brandedEmailHtml({
      origin,
      year,
      locale,
      innerHtml: cancellationInnerHtml({ origin, accessUntil, locale }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

export async function sendTrialWelcomeEmail(input: TrialWelcomeEmail): Promise<void> {
  const env = loadEnv()
  const locale = resolveMailLocale(input.locale)
  const origin = publicOrigin()
  const year = new Date().getFullYear()
  const planLabel = input.planLabel || 'MindoraAcademy Pro'
  const subject =
    locale === 'ru'
      ? `Добро пожаловать в ${BRAND}! Ваш 3-дневный пробный период начался`
      : `Welcome to ${BRAND}! Your 3-day trial has started`

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
    text: trialWelcomeText({ origin, year, planLabel, locale }),
    html: brandedEmailHtml({
      origin,
      year,
      locale,
      innerHtml: trialWelcomeInnerHtml({ origin, planLabel, locale }),
    }),
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}

/** Sent ~24h before the first post-trial subscription charge. */
export async function sendTrialChargeReminderEmail(input: TrialChargeReminderEmail): Promise<void> {
  const env = loadEnv()
  const locale = resolveMailLocale(input.locale)
  const origin = publicOrigin()
  const year = input.chargeAt.getFullYear()
  const amount = formatUsd(input.amountCents)
  const chargeDate = formatLongDate(input.chargeAt, locale)
  const subject =
    locale === 'ru'
      ? `${BRAND} — Напоминание: завтра спишется ${amount}`
      : `${BRAND} — Reminder: your membership charge of ${amount} is tomorrow`

  if (!env.AUTH_RESEND_KEY) {
    if (env.NODE_ENV === 'production') {
      console.error(`[trial-reminder] AUTH_RESEND_KEY missing; skipped ${input.to}`)
      return
    }
    console.log(`[trial-reminder] ${input.to} → ${amount} on ${chargeDate}`)
    return
  }

  const resend = new Resend(env.AUTH_RESEND_KEY)
  const { error } = await resend.emails.send({
    from: env.AUTH_EMAIL,
    to: input.to,
    subject,
    text: trialChargeReminderText({ amount, chargeDate, origin, year, locale }),
    html: brandedEmailHtml({
      origin,
      year,
      locale,
      innerHtml: trialChargeReminderInnerHtml({ amount, chargeDate, origin, locale }),
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

function resolveMailLocale(locale?: MailLocale): MailLocale {
  return locale === 'ru' ? 'ru' : 'en'
}

function formatLongDate(date: Date, locale: MailLocale): string {
  const intlLocale = locale === 'ru' ? 'ru-RU' : 'en-GB'
  return new Intl.DateTimeFormat(intlLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function chatUrl(origin: string, locale: MailLocale): string {
  return `${origin}/${locale}/support?chat=open`
}

function loginUrl(origin: string, locale: MailLocale): string {
  return `${origin}/${locale}/login`
}

function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">${label}</a>`
}

function brandedEmailHtml({
  origin,
  year,
  locale,
  innerHtml,
}: {
  origin: string
  year: number
  locale: MailLocale
  innerHtml: string
}): string {
  const chat = chatUrl(origin, locale)
  const htmlLang = locale === 'ru' ? 'ru' : 'en'
  const helpBanner =
    locale === 'ru'
      ? 'Нужна помощь? Круглосуточная поддержка в чате'
      : 'Need help? 24/7 Live Chat Support'
  const mayaBlurb =
    locale === 'ru'
      ? `Нужна помощь? Спросите Maya в Центре поддержки — ответ за несколько минут, 24/7. <a href="${chat}" style="color:${BLUE};font-weight:600;">Открыть чат</a>`
      : `Need a hand? Ask Maya in the Support Centre — answers in minutes, 24/7. <a href="${chat}" style="color:${BLUE};font-weight:600;">Open live chat</a>`
  const serviceNotice =
    locale === 'ru'
      ? `Вы получили это письмо, потому что у вас есть аккаунт ${BRAND}. Это сервисное сообщение об аккаунте или платеже.`
      : `You received this email because you have a ${BRAND} account. This is a service message about your account or payment.`
  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<body style="margin:0;padding:0;background:#f3f4f6;${FONT}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:16px 28px;background:#0a0a0a;text-align:center;">
              <a href="${chat}" style="color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;">${helpBanner}</a>
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
                    <p style="margin:0;font-size:14px;line-height:1.5;color:${DARK};">${mayaBlurb}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.5;color:${GREY};">${serviceNotice}</p>
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
  locale,
}: {
  amount: string
  date: string
  origin: string
  locale: MailLocale
}): string {
  const chat = chatUrl(origin, locale)
  const profile = `${origin}/app/profile`
  if (locale === 'ru') {
    return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Квитанция об оплате пробного периода</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Здравствуйте</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Спасибо, что начали пробный период — подтверждаем ваш платёж. Вот ваша квитанция.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">СУММА ОПЛАТЫ</p>
                    <p style="margin:0;font-size:22px;font-weight:800;color:${DARK};">${amount}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">ДАТА</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${date}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">Вы можете обновить способ оплаты, управлять планом или отменить подписку в любое время в настройках профиля: <a href="${profile}" style="color:${BLUE};font-weight:600;">${profile}</a></p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">Вопросы по этому списанию? <a href="${chat}" style="color:${BLUE};font-weight:600;">Напишите в чат 24/7</a>. Или ответьте на это письмо.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— Команда ${BRAND}</p>
            </td>
          </tr>`
  }
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
  locale,
}: {
  amount: string
  date: string
  origin: string
  year: number
  locale: MailLocale
}): string {
  const chat = chatUrl(origin, locale)
  const profile = `${origin}/app/profile`
  if (locale === 'ru') {
    return [
      'Нужна помощь? Круглосуточная поддержка в чате',
      chat,
      '',
      BRAND,
      '',
      'Квитанция об оплате пробного периода',
      '',
      'Здравствуйте',
      '',
      'Спасибо, что начали пробный период — подтверждаем ваш платёж. Вот ваша квитанция.',
      '',
      `СУММА ОПЛАТЫ  ${amount}`,
      `ДАТА          ${date}`,
      '',
      'Вы можете обновить способ оплаты, управлять планом или отменить подписку в любое время в настройках профиля:',
      profile,
      '',
      'Вопросы по этому списанию? Напишите в чат 24/7:',
      chat,
      '',
      'Или ответьте на это письмо.',
      '',
      `— Команда ${BRAND}`,
      '',
      'Нужна помощь? Спросите Maya в Центре поддержки — ответ за несколько минут, 24/7.',
      chat,
      '',
      `Вы получили это письмо, потому что у вас есть аккаунт ${BRAND}. Это сервисное сообщение об аккаунте или платеже.`,
      '',
      `© ${year} ${BRAND} · ${BRAND_HOST}`,
    ].join('\n')
  }
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

function cancellationInnerHtml({
  origin,
  accessUntil,
  locale,
}: {
  origin: string
  accessUntil: string
  locale: MailLocale
}): string {
  const login = loginUrl(origin, locale)
  const support = `${origin}/support`
  if (locale === 'ru') {
    return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Отмена подтверждена</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Подтверждаем, что ваша подписка ${BRAND} отменена. От вас больше ничего не требуется.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Ваш прогресс, серии и значки сохранены навсегда — они будут ждать вас, если вы решите вернуться.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">ПОЛНЫЙ ДОСТУП ДО</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${accessUntil}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">ПОСЛЕ ЭТОЙ ДАТЫ</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">Списаний больше не будет</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(login, 'Оформить подписку снова')}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">Нам важно понять, почему вы уходите — ответьте на это письмо или зайдите на <a href="${support}" style="color:${BLUE};font-weight:600;">${BRAND_HOST}/support</a>.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— Команда ${BRAND}</p>
            </td>
          </tr>`
  }
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
  locale,
}: {
  origin: string
  year: number
  accessUntil: string
  locale: MailLocale
}): string {
  const chat = chatUrl(origin, locale)
  const login = loginUrl(origin, locale)
  if (locale === 'ru') {
    return [
      'Нужна помощь? Круглосуточная поддержка в чате',
      chat,
      '',
      BRAND,
      '',
      'Отмена подтверждена',
      '',
      `Подтверждаем, что ваша подписка ${BRAND} отменена. От вас больше ничего не требуется.`,
      '',
      'Ваш прогресс, серии и значки сохранены навсегда — они будут ждать вас, если вы решите вернуться.',
      '',
      `ПОЛНЫЙ ДОСТУП ДО  ${accessUntil}`,
      'ПОСЛЕ ЭТОЙ ДАТЫ   Списаний больше не будет',
      '',
      'Оформить подписку снова:',
      login,
      '',
      `Нам важно понять, почему вы уходите — ответьте на это письмо или зайдите на ${BRAND_HOST}/support.`,
      '',
      `— Команда ${BRAND}`,
      '',
      'Нужна помощь? Спросите Maya в Центре поддержки — ответ за несколько минут, 24/7.',
      chat,
      '',
      `Вы получили это письмо, потому что у вас есть аккаунт ${BRAND}. Это сервисное сообщение об аккаунте или платеже.`,
      '',
      `© ${year} ${BRAND} · ${BRAND_HOST}`,
    ].join('\n')
  }
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

function trialWelcomeInnerHtml({
  origin,
  planLabel,
  locale,
}: {
  origin: string
  planLabel: string
  locale: MailLocale
}): string {
  const login = loginUrl(origin, locale)
  if (locale === 'ru') {
    return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Ваш 3-дневный пробный период начался</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Вы сделали первый шаг к изменениям в жизни. Ваш аккаунт готов и ждёт вас.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Пароль запоминать не нужно. Введите email на странице входа — мы пришлём одноразовый код.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">ВАШ ПЛАН</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">${planLabel}</p>
                  </td>
                  <td style="padding:16px 20px;width:50%;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;font-weight:700;color:${GREY};">ДЛИТЕЛЬНОСТЬ ПРОБНОГО ПЕРИОДА</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:${DARK};">3 дня</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(login, 'Войти в MindoraAcademy')}</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${DARK};">Три первых шага: пройдите Success Assessment, начните первый урок и изучите категории курсов, чтобы найти то, что вам нужнее всего.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— Команда ${BRAND}</p>
            </td>
          </tr>`
  }
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

function trialChargeReminderInnerHtml({
  amount,
  chargeDate,
  origin,
  locale,
}: {
  amount: string
  chargeDate: string
  origin: string
  locale: MailLocale
}): string {
  const profile = `${origin}/app/profile`
  if (locale === 'ru') {
    return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Завтра спишется ${amount}</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Ваш 3-дневный пробный период скоро закончится.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Первое списание членства <strong>${amount}</strong> запланировано на <strong>${chargeDate}</strong>. Отменить можно в любой момент до этой даты в настройках профиля — набор за $1 и купленные дополнения останутся у вас.</p>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(profile, 'Управлять подпиской')}</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— Команда ${BRAND}</p>
            </td>
          </tr>`
  }
  return `<tr>
            <td style="padding:8px 28px 0;">
              <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;font-weight:800;color:${DARK};">Your ${amount} membership charge is tomorrow</h1>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:${DARK};">Your 3-day trial is ending soon.</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${DARK};">Your first membership charge of <strong>${amount}</strong> is scheduled for <strong>${chargeDate}</strong>. You can cancel any time before then in Your Profile Settings — your $1 kit and any purchased add-ons stay yours.</p>
              <p style="margin:0 0 24px;text-align:center;">${ctaButton(profile, 'Manage subscription')}</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:${DARK};">— The ${BRAND} Team</p>
            </td>
          </tr>`
}

function trialChargeReminderText({
  amount,
  chargeDate,
  origin,
  year,
  locale,
}: {
  amount: string
  chargeDate: string
  origin: string
  year: number
  locale: MailLocale
}): string {
  const chat = chatUrl(origin, locale)
  const profile = `${origin}/app/profile`
  if (locale === 'ru') {
    return [
      'Нужна помощь? Круглосуточная поддержка в чате',
      chat,
      '',
      BRAND,
      '',
      `Завтра спишется ${amount}`,
      '',
      'Ваш 3-дневный пробный период скоро закончится.',
      '',
      `Первое списание членства ${amount} запланировано на ${chargeDate}.`,
      'Отменить можно в любой момент до этой даты в настройках профиля — набор за $1 и купленные дополнения останутся у вас.',
      '',
      'Управлять подпиской:',
      profile,
      '',
      `— Команда ${BRAND}`,
      '',
      `© ${year} ${BRAND} · ${BRAND_HOST}`,
    ].join('\n')
  }
  return [
    'Need help? 24/7 Live Chat Support',
    chat,
    '',
    BRAND,
    '',
    `Your ${amount} membership charge is tomorrow`,
    '',
    'Your 3-day trial is ending soon.',
    '',
    `Your first membership charge of ${amount} is scheduled for ${chargeDate}.`,
    'You can cancel any time before then in Your Profile Settings — your $1 kit and any purchased add-ons stay yours.',
    '',
    'Manage subscription:',
    profile,
    '',
    `— The ${BRAND} Team`,
    '',
    `© ${year} ${BRAND} · ${BRAND_HOST}`,
  ].join('\n')
}

function trialWelcomeText({
  origin,
  year,
  planLabel,
  locale,
}: {
  origin: string
  year: number
  planLabel: string
  locale: MailLocale
}): string {
  const chat = chatUrl(origin, locale)
  const login = loginUrl(origin, locale)
  if (locale === 'ru') {
    return [
      'Нужна помощь? Круглосуточная поддержка в чате',
      chat,
      '',
      BRAND,
      '',
      'Ваш 3-дневный пробный период начался',
      '',
      'Вы сделали первый шаг к изменениям в жизни. Ваш аккаунт готов и ждёт вас.',
      '',
      'Пароль запоминать не нужно. Введите email на странице входа — мы пришлём одноразовый код.',
      '',
      `ВАШ ПЛАН                    ${planLabel}`,
      'ДЛИТЕЛЬНОСТЬ ПРОБНОГО ПЕРИОДА  3 дня',
      '',
      'Войти в MindoraAcademy:',
      login,
      '',
      'Три первых шага: пройдите Success Assessment, начните первый урок и изучите категории курсов, чтобы найти то, что вам нужнее всего.',
      '',
      `— Команда ${BRAND}`,
      '',
      'Нужна помощь? Спросите Maya в Центре поддержки — ответ за несколько минут, 24/7.',
      chat,
      '',
      `Вы получили это письмо, потому что у вас есть аккаунт ${BRAND}. Это сервисное сообщение об аккаунте или платеже.`,
      '',
      `© ${year} ${BRAND} · ${BRAND_HOST}`,
    ].join('\n')
  }
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
