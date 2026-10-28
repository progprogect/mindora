import { withLocale } from '@/i18n/locale'
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthGate } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useI18n } from '@/i18n/I18nProvider'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { locale } = useI18n()
  const { isLoading, isAuthenticated } = useAuthGate()
  if (isLoading) return <AuthSpinner />
  if (!isAuthenticated) return <Navigate to={withLocale(locale, '/login')} replace />
  return children
}
