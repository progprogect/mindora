import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buyOffer, chargeErrorMessage } from '@/lib/api'
import { useI18n } from '@/i18n/I18nProvider'
import { usePurchases } from '@/lib/lmsQueries'
import { COACH_OFFER_SLUG, ownsCoachSku } from '@/shared/coach'

export default function MindoraUnlockPage() {
  const { t } = useI18n()
  const purchases = usePurchases()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const unlocked = ownsCoachSku(purchases)

  const buy = async () => {
    setBusy(true)
    setError(null)
    try {
      const result = await buyOffer({ offerSlug: COACH_OFFER_SLUG })
      if (result.checkoutUrl) return
      if (result.success || result.alreadyPurchased) {
        navigate('/app/mindora')
        return
      }
      setError(chargeErrorMessage(result, t, t('app.mindora.paymentFailed')))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center gap-2 px-4 h-14 border-b border-sw-grey-border">
        <Link to="/app/mindora" className="w-8 h-8 flex items-center justify-center" aria-label={t('app.mindora.back')}>
          ←
        </Link>
        <h1 className="text-base font-bold text-sw-dark">{t('app.mindora.unlockPageTitle')}</h1>
      </header>
      <main className="max-w-lg mx-auto px-4 py-8 text-center">
        {unlocked ? (
          <>
            <h2 className="text-xl font-extrabold">{t('app.mindora.alreadyUnlocked')}</h2>
            <p className="text-sm text-sw-grey mt-2">{t('app.mindora.fullAccess')}</p>
            <Link to="/app/mindora" className="mt-6 inline-block rounded-full bg-sw-blue text-white font-bold px-6 py-3">
              {t('app.mindora.chatWith')}
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold mt-2">{t('app.mindora.coachTitle')}</h2>
            <p className="text-sm text-sw-grey mt-1">{t('app.mindora.lifetimeUnlock')}</p>
            <p className="text-4xl font-extrabold mt-6">$19.95</p>
            <p className="text-xs text-sw-grey">{t('app.mindora.oneTimePayment')}</p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void buy()}
              className="mt-6 w-full rounded-full bg-sw-blue text-white font-bold py-3.5 disabled:opacity-50"
            >
              {busy ? t('app.common.processingEllipsis') : t('app.mindora.unlockButton')}
            </button>
            {error ? <p className="text-sm text-sw-coral mt-3">{error}</p> : null}
            <p className="text-xs text-sw-grey mt-4">{t('app.mindora.requiresSub')}</p>
          </>
        )}
      </main>
    </div>
  )
}
