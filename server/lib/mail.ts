/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
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
    to: [email],
    subject: `Your SuccessWise.ai sign-in code is ${token}`,
    text: `Your 6-digit sign-in code is ${token}. It expires in 15 minutes.\n\nIf you did not request this, you can ignore this email.`,
  })
  if (error) {
    throw new Error(JSON.stringify(error))
  }
}
