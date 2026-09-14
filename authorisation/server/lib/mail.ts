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

export type TrialReceipt = {
  to: string
  amountCents: number
  paidAt: Date
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
  const date = formatPaidAt(receipt.paidAt)
  const origin = publicOrigin()
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
    text: trialReceiptText({ amount, date, origin, year: receipt.paidAt.getFullYear() }),
    html: trialReceiptHtml({ amount, date, origin, year: receipt.paidAt.getFullYear() }),
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

function formatPaidAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
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
  const chat = `${origin}/support?chat=open`
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

function trialReceiptHtml({
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
  const chat = `${origin}/support?chat=open`
  const profile = `${origin}/app/profile`
  const font = "font-family:Arial,Helvetica,sans-serif;"
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f3f4f6;${font}">
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
          <tr>
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
          </tr>
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
