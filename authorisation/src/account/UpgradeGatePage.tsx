import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner />
}

function UpgradeGate() {
  const navigate = useNavigate()
  const user = useCurrentUser()

  useEffect(() => {
    if (user === undefined) return
    if (user?.onboardingComplete) {
      navigate('/app/dashboard', { replace: true })
      return
    }
    navigate('/account/upgrade-planners', { replace: true })
  }, [user, navigate])

  return <AuthSpinner message="Almost there..." />
}

export default function UpgradeGatePage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <UpgradeGate />
      </Authenticated>
    </>
  )
}
