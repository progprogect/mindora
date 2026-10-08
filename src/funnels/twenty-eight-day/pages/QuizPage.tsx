import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizScreens } from '@/funnels/twenty-eight-day/data/quizScreens'
import type { QuizRole, QuizState } from '@/funnels/twenty-eight-day/types/quiz'
import {
  loadQuizState,
  loadSalesStep,
  persistQuizResults,
  persistQuizState,
  persistSalesStep,
} from '@/funnels/twenty-eight-day/lib/quizStorage'
import { buildProfile, getDominantEcho, getInterstitial1Variant } from '@/funnels/twenty-eight-day/lib/scoring'
import { trackEvent, identifyUser } from '@/shared/lib/tracking'
import { useCaptureLead, useSaveSurveyData, useUpdateLeadName } from '@/shared/lib/backend'
import { rememberCheckoutEmail } from '@/shared/lib/checkoutSession'

import QuizScreenLayout from '@/funnels/twenty-eight-day/components/quiz/QuizScreenLayout'
import IdentityScreen from '@/funnels/twenty-eight-day/components/quiz/IdentityScreen'
import SocialProofScreen from '@/funnels/twenty-eight-day/components/quiz/SocialProofScreen'
import QuestionScreen from '@/funnels/twenty-eight-day/components/quiz/QuestionScreen'
import AIToolsQuestionScreen from '@/funnels/twenty-eight-day/components/quiz/AIToolsQuestionScreen'
import InterstitialScreen from '@/funnels/twenty-eight-day/components/quiz/InterstitialScreen'
import LoadingScreen from '@/funnels/twenty-eight-day/components/quiz/LoadingScreen'
import EmailScreen from '@/funnels/twenty-eight-day/components/quiz/EmailScreen'
import NameCaptureScreen from '@/funnels/twenty-eight-day/components/quiz/NameCaptureScreen'

import SalesFunnelLayout from '@/funnels/twenty-eight-day/components/sales/SalesFunnelLayout'
import PersonalProfileScreen from '@/funnels/twenty-eight-day/components/sales/PersonalProfileScreen'
import SalesBenefitsScreen from '@/funnels/twenty-eight-day/components/sales/SalesBenefitsScreen'
import SalesBeforeAfterScreen from '@/funnels/twenty-eight-day/components/sales/SalesBeforeAfterScreen'
import SalesSocialProofScreen from '@/funnels/twenty-eight-day/components/sales/SalesSocialProofScreen'
import SalesSpinWheelScreen from '@/funnels/twenty-eight-day/components/sales/SalesSpinWheelScreen'
import SalesPlanScreen from '@/funnels/twenty-eight-day/components/sales/SalesPlanScreen'

const FUNNEL = '28-day-ai-challenge'
const TOTAL_QUIZ_SCREENS = quizScreens.length
const HIDE_PROGRESS_TYPES = new Set(['loading', 'social-proof', 'interstitial', 'email', 'name-capture'])

function findProgressStep(index: number): number {
  for (let i = index; i >= 0; i -= 1) {
    const screen = quizScreens[i]
    if (screen.type === 'question' || screen.type === 'ai-tools') return screen.step
  }
  return 0
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [quizState, setQuizState] = useState<QuizState>(() => loadQuizState())
  const [salesStep, setSalesStep] = useState<number>(() => loadSalesStep())
  const [percentOff, setPercentOff] = useState<number>(50)

  const captureLead = useCaptureLead()
  const updateLeadName = useUpdateLeadName()
  const saveSurveyData = useSaveSurveyData()

  useEffect(() => persistQuizState(quizState), [quizState])
  useEffect(() => persistSalesStep(salesStep), [salesStep])

  // Stripe redirect return handler.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('redirect_status') === 'succeeded') {
      params.delete('redirect_status')
      const cleanSearch = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (cleanSearch ? `?${cleanSearch}` : ''))
      navigate('/checkout/setup?trial=1&funnel=' + FUNNEL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const quizFinished = quizState.step >= TOTAL_QUIZ_SCREENS
  const currentScreen = quizFinished ? null : quizScreens[quizState.step]

  const profile = useMemo(
    () => buildProfile(quizState.role, quizState.answers),
    [quizState.role, quizState.answers],
  )

  const handleBack = useCallback(() => {
    setQuizState((prev) => {
      let nextStep = prev.step - 1
      if (nextStep >= 0 && quizScreens[nextStep]?.type === 'loading') nextStep -= 1
      return { ...prev, step: Math.max(0, nextStep) }
    })
  }, [])

  const handleIdentitySelect = useCallback(
    (optionId: string) => {
      if (currentScreen?.type !== 'identity') return
      const option = currentScreen.options.find((o) => o.id === optionId)
      const role = (option?.role ?? null) as QuizRole | null

      setQuizState((prev) => ({
        ...prev,
        role,
        answers: { ...prev.answers, identity: optionId },
        step: prev.step + 1,
      }))
      trackEvent('QuizStarted', { role })
    },
    [currentScreen],
  )

  const handleQuestionAnswer = useCallback(
    (screenId: string, optionId: string) => {
      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [screenId]: optionId },
        step: prev.step + 1,
      }))
      trackEvent('QuizStepCompleted', { screenId, optionId })
    },
    [],
  )

  const handleAdvance = useCallback(() => {
    setQuizState((prev) => ({ ...prev, step: prev.step + 1 }))
  }, [])

  const handleLoadingComplete = useCallback((micro: { device: string; commitment: string }) => {
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, 'micro-device': micro.device, 'micro-commitment': micro.commitment },
      step: prev.step + 1,
    }))
  }, [])

  const handleEmailSubmit = useCallback(
    (email: string, consent: boolean) => {
      setQuizState((prev) => ({ ...prev, email, consent, step: prev.step + 1 }))
      rememberCheckoutEmail(email)
      persistQuizResults({
        role: quizState.role,
        email,
        name: quizState.name,
        profile,
        savedAt: Date.now(),
      })

      void captureLead({ email, funnel: FUNNEL, consent })
      void saveSurveyData({
        email,
        funnel: FUNNEL,
        answers: JSON.stringify(quizState.answers),
        role: quizState.role ?? 'personal',
        profileScore: profile.score,
        scoreLabel: profile.scoreLabel,
        archetype: profile.archetype,
      })
      identifyUser(email, { role: quizState.role, score: profile.score })
      trackEvent('Lead', { email })
      trackEvent('QuizCompleted', { score: profile.score, archetype: profile.archetype })
    },
    [captureLead, saveSurveyData, quizState.answers, quizState.role, profile],
  )

  const handleNameSubmit = useCallback(
    (name: string) => {
      setQuizState((prev) => ({ ...prev, name, step: prev.step + 1 }))
      if (quizState.email) {
        void updateLeadName({ email: quizState.email, name })
      }
      persistQuizResults({
        role: quizState.role,
        email: quizState.email,
        name,
        profile,
        savedAt: Date.now(),
      })
    },
    [quizState.email, quizState.role, profile, updateLeadName],
  )

  // ---- Sales funnel ----

  if (quizFinished) {
    const goToSalesStep = (step: number) => setSalesStep(step)

    // The checkout page replaces the standard nav with its own sticky offer
    // bar (matching the original — no back button/logo/progress dots there).
    if (salesStep === 5) {
      return (
        <SalesPlanScreen
          profile={profile}
          email={quizState.email}
          name={quizState.name}
          answers={quizState.answers}
          percentOff={percentOff}
          onPercentOffResolved={setPercentOff}
          onCheckoutSuccess={() => {
            persistQuizResults({
              role: quizState.role,
              email: quizState.email,
              name: quizState.name,
              profile,
              savedAt: Date.now(),
            })
            window.localStorage.setItem('sw_checkout_completed', 'true')
            window.location.href = `/checkout/setup?trial=1&funnel=${FUNNEL}`
          }}
          onExpiredPlanContinue={(productId) => {
            persistQuizResults({
              role: quizState.role,
              email: quizState.email,
              name: quizState.name,
              profile,
              savedAt: Date.now(),
              product: productId,
            })
            window.location.href = `/checkout?product=${encodeURIComponent(productId)}&funnel=${FUNNEL}`
          }}
        />
      )
    }

    return (
      <SalesFunnelLayout
        step={salesStep}
        onBack={salesStep > 0 ? () => goToSalesStep(salesStep - 1) : undefined}
        contentClassName={salesStep === 0 || salesStep === 4 ? 'p-0' : 'px-4 py-0'}
        footer={
          salesStep === 0 ? (
            <button type="button" onClick={() => goToSalesStep(1)} className="sw-cta animate-pulse-cta">
              See My Plan →
            </button>
          ) : salesStep === 1 ? (
            <button type="button" onClick={() => goToSalesStep(2)} className="sw-cta animate-pulse-cta">
              Continue →
            </button>
          ) : salesStep === 2 ? (
            <button type="button" onClick={() => goToSalesStep(3)} className="sw-cta animate-pulse-cta">
              Continue →
            </button>
          ) : salesStep === 3 ? (
            <button type="button" onClick={() => goToSalesStep(4)} className="sw-cta animate-pulse-cta">
              Start My 28-Day AI Challenge →
            </button>
          ) : undefined
        }
      >
        {salesStep === 0 && (
          <PersonalProfileScreen
            profile={profile}
            role={quizState.role}
            name={quizState.name}
            answers={quizState.answers}
          />
        )}
        {salesStep === 1 && <SalesBenefitsScreen profile={profile} answers={quizState.answers} />}
        {salesStep === 2 && <SalesBeforeAfterScreen profile={profile} answers={quizState.answers} />}
        {salesStep === 3 && <SalesSocialProofScreen />}
        {salesStep === 4 && (
          <SalesSpinWheelScreen
            name={quizState.name}
            onFinish={(revealedPercentOff) => {
              setPercentOff(revealedPercentOff)
              goToSalesStep(5)
            }}
          />
        )}
      </SalesFunnelLayout>
    )
  }

  // ---- Quiz phase ----

  if (!currentScreen) return null

  const progressCurrent = findProgressStep(quizState.step)
  const showProgress = quizState.step > 0 && !HIDE_PROGRESS_TYPES.has(currentScreen.type)
  const dominantEcho = getDominantEcho(quizState.answers)
  const logoVariant = currentScreen.type === 'name-capture' ? 'text' : undefined
  const ownsPadding = new Set(['identity', 'social-proof', 'interstitial', 'email', 'name-capture', 'loading'])
  const quizFooter =
    currentScreen.type === 'social-proof' ? (
      <button type="button" onClick={handleAdvance} className="sw-cta animate-pulse-cta">
        {currentScreen.ctaLabel}
      </button>
    ) : currentScreen.type === 'interstitial' ? (
      <button type="button" onClick={handleAdvance} className="sw-cta animate-pulse-cta">
        {currentScreen.ctaLabel}
      </button>
    ) : undefined

  return (
    <QuizScreenLayout
      onBack={quizState.step > 0 && currentScreen.type !== 'name-capture' ? handleBack : undefined}
      currentStep={showProgress ? progressCurrent : undefined}
      totalSteps={showProgress ? 18 : undefined}
      logoVariant={logoVariant}
      pageClassName={currentScreen.type === 'identity' ? 'bg-sw-blue-light' : undefined}
      contentClassName={ownsPadding.has(currentScreen.type) ? 'p-0' : 'px-4'}
      footer={quizFooter}
    >
      {currentScreen.type === 'identity' && (
        <IdentityScreen screen={currentScreen} onSelect={handleIdentitySelect} />
      )}
      {currentScreen.type === 'social-proof' && <SocialProofScreen screen={currentScreen} />}
      {currentScreen.type === 'question' && (
        <QuestionScreen
          key={currentScreen.id}
          screen={currentScreen}
          initialSelected={quizState.answers[currentScreen.id]}
          onAnswer={(optionId) => handleQuestionAnswer(currentScreen.id, optionId)}
        />
      )}
      {currentScreen.type === 'ai-tools' && (
        <AIToolsQuestionScreen
          key={currentScreen.id}
          screen={currentScreen}
          initialSelected={quizState.answers[currentScreen.id]}
          onAnswer={(optionId) => handleQuestionAnswer(currentScreen.id, optionId)}
        />
      )}
      {currentScreen.type === 'interstitial' && (
        <InterstitialScreen
          screen={currentScreen}
          variantKey={currentScreen.id === 'interstitial-1' ? getInterstitial1Variant(quizState.answers) : null}
          dominantEcho={currentScreen.id === 'interstitial-1' ? null : dominantEcho}
        />
      )}
      {currentScreen.type === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      {currentScreen.type === 'email' && <EmailScreen screen={currentScreen} onSubmit={handleEmailSubmit} />}
      {currentScreen.type === 'name-capture' && (
        <NameCaptureScreen screen={currentScreen} onSubmit={handleNameSubmit} />
      )}
    </QuizScreenLayout>
  )
}
