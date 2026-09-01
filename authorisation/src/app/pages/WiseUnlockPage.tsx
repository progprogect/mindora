import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { chargeUpsell } from '@/lib/api'
import { useHasSavedCard, usePurchases } from '@/lib/lmsQueries'

export default function WiseUnlockPage() {
  const purchases = usePurchases()
  const hasCard = useHasSavedCard()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const unlocked = purchases?.has('wise-ai-coach')

  const buy = async () => {
    setBusy(true)
    setError(null)
    try {
      const result = await chargeUpsell({ offerSlug: 'wise-ai-coach' })
      if (result.success || result.alreadyPurchased) {
        navigate('/app/wise')
        return
      }
      setError(result.error || 'Payment failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center gap-2 px-4 h-14 border-b border-sw-grey-border">
        <Link to="/app/wise" className="w-8 h-8 flex items-center justify-center" aria-label="Back">
          ←
        </Link>
        <h1 className="text-base font-bold text-sw-dark">Unlock Wise</h1>
      </header>
      <main className="max-w-lg mx-auto px-4 py-8 text-center">
        {unlocked ? (
          <>
            <h2 className="text-xl font-extrabold">Wise is already unlocked!</h2>
            <p className="text-sm text-sw-grey mt-2">You have full access to 20 coaching conversations per day.</p>
            <Link to="/app/wise" className="mt-6 inline-block rounded-full bg-sw-blue text-white font-bold px-6 py-3">
              Chat with Wise
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold mt-2">Wise AI Coach</h2>
            <p className="text-sm text-sw-grey mt-1">One-time unlock • Lifetime access</p>
            <p className="text-4xl font-extrabold mt-6">$19.95</p>
            <p className="text-xs text-sw-grey">one-time payment</p>
            <button
              type="button"
              disabled={busy || hasCard === false}
              onClick={() => void buy()}
              className="mt-6 w-full rounded-full bg-sw-blue text-white font-bold py-3.5 disabled:opacity-50"
            >
              {busy ? 'Charging…' : 'UNLOCK WISE — $19.95 →'}
            </button>
            {error ? <p className="text-sm text-sw-coral mt-3">{error}</p> : null}
            <p className="text-xs text-sw-grey mt-4">
              Requires an active MindoraAcademy subscription. Your payment is processed securely by Stripe.
            </p>
          </>
        )}
      </main>
    </div>
  )
}
