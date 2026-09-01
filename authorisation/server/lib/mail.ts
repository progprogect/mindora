import { Resend } from 'resend'
import { loadEnv } from '../env.js'

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
