import nodemailer from 'nodemailer'
import { loadEnv } from '../env.js'

export async function sendOtpEmail(email: string, token: string): Promise<void> {
  const env = loadEnv()
  if (!env.SMTP_PASS) {
    if (env.NODE_ENV === 'production') {
      throw new Error('SMTP_PASS is not configured')
    }
    console.log(`[otp] ${email} → ${token}`)
    return
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: env.AUTH_EMAIL,
    replyTo: env.SMTP_USER,
    to: email,
    subject: `Your SuccessWise.ai sign-in code is ${token}`,
    text: `Your 6-digit sign-in code is ${token}. It expires in 15 minutes.\n\nIf you did not request this, you can ignore this email.`,
  })
}
