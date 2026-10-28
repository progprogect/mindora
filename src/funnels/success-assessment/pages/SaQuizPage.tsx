import { withLocale } from '../../../../authorisation/src/i18n/locale'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import FunnelQuizEngine from '@/funnels/shared/components/FunnelQuizEngine'
import SalesWordmarkLayout from '@/funnels/shared/components/SalesWordmarkLayout'
import SpinWheelScreen from '@/funnels/shared/components/SpinWheelScreen'
import TrialPlanScreen, { type TrialPlanCopy } from '@/funnels/shared/components/TrialPlanScreen'
import { createFunnelStorage } from '@/funnels/shared/lib/storage'
import { getSaScreens } from '@/funnels/success-assessment/data/screens'
import { saPageTitle } from '@/funnels/success-assessment/data/screenCopy'
import { saSalesCopy } from '@/funnels/success-assessment/data/saSalesCopy'
import {
  buildSaProfile,
  formatPlus90,
  rewardLine,
  visionStruggle,
} from '@/funnels/success-assessment/lib/scoring'
import SaProfileScreen from '@/funnels/success-assessment/components/SaProfileScreen'
import { SaRoadmapScreen, SaSocialScreen, SaTransformationScreen } from '@/funnels/success-assessment/components/SaSalesScreens'
import { funnelUiCopy } from '@/funnels/shared/i18n/funnelUiCopy'

const FUNNEL = 'success-assessment'
const SA_HANDLES = [
  'sarah.m***',
  'james.k***',
  'priya.r***',
  'tom.b***',
  'anna.w***',
  'david.l***',
  'emily.c***',
  'marcus.t***',
  'claire.n***',
  'ryan.h***',
  'zoe.p***',
  'ben.s***',
]

export default function SaQuizPage() {
  const { locale } = useI18n()
  const navigate = useNavigate()
  const storage = useMemo(() => createFunnelStorage(FUNNEL), [])
  const screens = useMemo(() => getSaScreens(locale), [locale])
  const salesUi = saSalesCopy(locale)
  const pageTitle = saPageTitle(locale)
  const ui = funnelUiCopy(locale)

  const [quizState, setQuizState] = useState(() => storage.loadState())
  const [salesStep, setSalesStep] = useState(() => storage.loadSalesStep())
  const [percentOff, setPercentOff] = useState(50)
  const profile = useMemo(() => buildSaProfile(quizState.answers, locale), [quizState.answers, locale])

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])
  useEffect(() => storage.persistState(quizState), [quizState, storage])
  useEffect(() => storage.persistSalesStep(salesStep), [salesStep, storage])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('redirect_status') === 'succeeded') {
      params.delete('redirect_status')
      const clean = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (clean ? `?${clean}` : ''))
      navigate(withLocale(locale, `/checkout/setup?trial=1&funnel=${FUNNEL}`))
    }
  }, [navigate])

  const quizFinished = quizState.step >= screens.length

  if (quizFinished) {
    if (salesStep === 5) {
      const trial = salesUi.trial
      const copy: TrialPlanCopy = {
        funnel: FUNNEL,
        headline: (name) => (
          <>
            {trial.planHeadline}
            <br />
            {locale === 'ru' ? (
              <>
                {name ? (
                  <>
                    готов, <span className="text-sw-blue">{name}!</span>
                  </>
                ) : (
                  <span className="text-sw-blue">готов!</span>
                )}
              </>
            ) : (
              <>
                is ready,{' '}
                {name ? <span className="text-sw-blue">{name}!</span> : <span className="text-sw-blue">ready!</span>}
              </>
            )}
          </>
        ),
        insight: profile.quote,
        metaLeft: { kicker: trial.metaLeftKicker, value: `${profile.archetype} ${profile.archetypeEmoji}` },
        metaRight: { kicker: trial.metaRightKicker, value: profile.scoreLabel },
        pathTitle: trial.pathTitle,
        pathSubtitle: trial.pathSubtitle,
        pathItems: trial.pathItems,
        pathCta: trial.pathCta,
        tickerLabel: trial.ticker,
        tickerHandles: SA_HANDLES,
        highlights: trial.highlights,
        impactTitle: trial.includedTitle,
        impactItems: [],
        includedTitle: trial.includedTitle,
        included: trial.included(profile.archetype, profile.archetypeEmoji),
        testimonialsTitle: trial.testimonialsTitle,
        testimonials: trial.testimonials,
      }

      return (
        <TrialPlanScreen
          copy={copy}
          email={quizState.email}
          name={quizState.name}
          percentOff={percentOff}
          onPercentOffResolved={setPercentOff}
          onCheckoutSuccess={() => {
            window.localStorage.setItem('sw_checkout_completed', 'true')
            window.location.href = withLocale(locale, `/checkout/setup?trial=1&funnel=${FUNNEL}`)
          }}
          onExpiredPlanContinue={(productId) => {
            window.location.href = withLocale(locale, `/checkout?product=${encodeURIComponent(productId)}&funnel=${FUNNEL}`)
          }}
        />
      )
    }

    const struggle = visionStruggle(profile.vision, locale)
    const footerCta = salesUi.footerCta[salesStep === 0 ? 0 : salesStep === 3 ? 1 : 2]

    if (salesStep === 4) {
      return (
        <SalesWordmarkLayout>
          <SpinWheelScreen
            name={quizState.name}
            subtitle={salesUi.spinSubtitle}
            onFinish={(pct) => {
              setPercentOff(pct)
              setSalesStep(5)
            }}
          />
        </SalesWordmarkLayout>
      )
    }

    return (
      <SalesWordmarkLayout
        onBack={salesStep > 0 ? () => setSalesStep((s) => s - 1) : undefined}
        footer={
          <button type="button" onClick={() => setSalesStep((s) => s + 1)} className="sw-cta animate-pulse-cta">
            {footerCta}
          </button>
        }
      >
        {salesStep === 0 ? <SaProfileScreen name={quizState.name ?? ui.defaultName} profile={profile} /> : null}
        {salesStep === 1 ? <SaRoadmapScreen profile={profile} /> : null}
        {salesStep === 2 ? (
          <SaTransformationScreen
            profile={profile}
            plus90={formatPlus90(undefined, locale)}
            rewardLine={rewardLine(profile.reward, locale)}
            struggle={struggle}
          />
        ) : null}
        {salesStep === 3 ? <SaSocialScreen /> : null}
      </SalesWordmarkLayout>
    )
  }

  return (
    <FunnelQuizEngine
      funnelId={FUNNEL}
      pageTitle={pageTitle}
      screens={screens}
      headerTotal={17}
      quizState={quizState}
      setQuizState={setQuizState}
      profileSnapshot={{
        score: profile.score,
        scoreLabel: profile.scoreLabel,
        archetype: profile.archetype,
        role: quizState.answers['q2-identity'] ?? 'career-employee',
      }}
    />
  )
}
