import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthGate } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGate()
  if (isLoading) return <AuthSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
