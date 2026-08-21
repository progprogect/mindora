import { useEffect, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Lock } from 'lucide-react'
import { getStripe, isStripeConfigured } from '@/shared/lib/stripeClient'
import { useCreateTrialSetupIntent } from '@/shared/lib/backend'

interface InlineTrialCheckoutProps {
  email: string
  productId: string
  funnel: string
  onSuccess: () => void
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)
    setError(null)

    const { error: confirmError } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname}?redirect_status=succeeded`,
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Something went wrong, please try again.')
      setSubmitting(false)
      return
    }

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={{ layout: 'tabs' }} />
      {error ? <p className="text-xs font-medium text-sw-red">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Lock className="size-4" />
        {submitting ? 'Processing…' : 'START MY FREE 7 DAYS'}
      </button>
    </form>
  )
}

export default function InlineTrialCheckout({ email, productId, funnel, onSuccess }: InlineTrialCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const createTrialSetupIntent = useCreateTrialSetupIntent()

  useEffect(() => {
    if (!isStripeConfigured) return
    let cancelled = false

    createTrialSetupIntent({ email, productId, funnel })
      .then((res) => {
        if (!cancelled) setClientSecret(res.clientSecret)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not start checkout.')
      })

    return () => {
      cancelled = true
    }
  }, [createTrialSetupIntent, email, productId, funnel])

  if (!isStripeConfigured) {
    return (
      <div className="rounded-sw border border-dashed border-sw-border bg-sw-grey-light p-4 text-center text-xs text-sw-grey">
        Stripe isn&apos;t configured yet. Set <code className="font-mono">VITE_STRIPE_PUBLISHABLE_KEY</code> and{' '}
        <code className="font-mono">STRIPE_SECRET_KEY</code> to enable checkout — see <code>.env.example</code>.
      </div>
    )
  }

  if (error) {
    return <p className="text-center text-xs font-medium text-sw-red">{error}</p>
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-sw-grey">Loading secure checkout…</div>
    )
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: 'hsl(221 83% 53%)' } } }}
    >
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  )
}
