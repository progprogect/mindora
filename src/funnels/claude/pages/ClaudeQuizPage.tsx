import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { claudeQuizScreens } from '@/funnels/claude/data/claudeQuizScreens'
import { CLAUDE_TOTAL_QUESTION_STEPS, type ClaudeIdentity, type ClaudeQuizState } from '@/funnels/claude/types/claudeQuiz'
import {
  clearClaudeSalesStep,
  loadClaudeQuizState,
  loadClaudeSalesStep,
  persistClaudeQuizResults,
  persistClaudeQuizState,
  persistClaudeSalesStep,
  CLAUDE_SALES_TOTAL_STEPS,
} from '@/funnels/claude/lib/claudeQuizStorage'
import { buildClaudeProfile, CLAUDE_PROFILE_SCORE_BY_LEVEL } from '@/funnels/claude/lib/claudeProfile'
import { trackEvent, identifyUser } from '@/shared/lib/tracking'
import { useCaptureLead, useSaveSurveyData, useSetCheckoutOfferPercentAction, useUpdateLeadName } from '@/shared/lib/backend'
import { getCheckoutSessionKey, rememberCheckoutEmail } from '@/shared/lib/checkoutSession'

import ClaudeQuizLayout from '@/funnels/claude/components/quiz/ClaudeQuizLayout'
import ClaudeIdentityScreen from '@/funnels/claude/components/quiz/ClaudeIdentityScreen'
import ClaudeSocialProofScreen from '@/funnels/claude/components/quiz/ClaudeSocialProofScreen'
import ClaudeQuestionScreen from '@/funnels/claude/components/quiz/ClaudeQuestionScreen'
import ClaudeInterstitialScreen from '@/funnels/claude/components/quiz/ClaudeInterstitialScreen'
import ClaudeCertificateScreen from '@/funnels/claude/components/quiz/ClaudeCertificateScreen'
import ClaudeLoadingScreen from '@/funnels/claude/components/quiz/ClaudeLoadingScreen'
import ClaudeEmailScreen from '@/funnels/claude/components/quiz/ClaudeEmailScreen'
import ClaudeNameCaptureScreen from '@/funnels/claude/components/quiz/ClaudeNameCaptureScreen'

import ClaudeSalesFunnelLayout from '@/funnels/claude/components/sales/ClaudeSalesFunnelLayout'
import ClaudeProfileScreen from '@/funnels/claude/components/sales/ClaudeProfileScreen'
import ClaudeBenefitsScreen from '@/funnels/claude/components/sales/ClaudeBenefitsScreen'
import ClaudeBeforeAfterScreen from '@/funnels/claude/components/sales/ClaudeBeforeAfterScreen'
import ClaudeSalesSocialProofScreen from '@/funnels/claude/components/sales/ClaudeSocialProofScreen'
import ClaudeSpinWheelScreen from '@/funnels/claude/components/sales/ClaudeSpinWheelScreen'
import ClaudeSalesPlanScreen from '@/funnels/claude/components/sales/ClaudeSalesPlanScreen'

const FUNNEL = 'claude-ai-certification'
const SPIN_WHEEL_DISCOUNT_PERCENT = 97

/**
 * Port of `Ce()` — the Claude quiz state machine. Covers identity → 16
 * questions → 3 interstitials → certificate → loading → email → name
 * capture (Этап 2), then the 6-step sales funnel — profile, benefits,
 * before/after, social proof, spin wheel, pricing (Этап 4) — before handing
 * off to `/checkout/setup` (Этап 6). See
 * docs/claude_ai_certification/implementation-plan.md.
 */
export default function ClaudeQuizPage() {
  const navigate = useNavigate()
  const [quizState, setQuizState] = useState<ClaudeQuizState>(() => loadClaudeQuizState())
  const [salesStep, setSalesStep] = useState<number>(() => loadClaudeSalesStep())
  const [percentOff, setPercentOff] = useState<number>(50)
  const startedTrackingRef = useRef(false)

  const captureLead = useCaptureLead()
  const updateLeadName = useUpdateLeadName()
  const saveSurveyData = useSaveSurveyData()
  const setCheckoutOfferPercent = useSetCheckoutOfferPercentAction()

  useEffect(() => persistClaudeQuizState(quizState), [quizState])
  useEffect(() => persistClaudeSalesStep(salesStep), [salesStep])

  // Stripe redirect return handler — matches the 28-day quiz + production Claude funnel.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('redirect_status') === 'succeeded') {
      params.delete('payment_intent')
      params.delete('payment_intent_client_secret')
      params.delete('redirect_status')
      const cleanSearch = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (cleanSearch ? `?${cleanSearch}` : ''))
      clearClaudeSalesStep()
      navigate(`/checkout/setup?trial=1&funnel=${FUNNEL}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const profile = useMemo(
    () => buildClaudeProfile(quizState.identity, quizState.answers),
    [quizState.identity, quizState.answers],
  )

  const currentScreen = quizState.step < claudeQuizScreens.length ? claudeQuizScreens[quizState.step] : null

  const handleAdvance = useCallback(() => {
    setQuizState((prev) => ({ ...prev, step: Math.min(prev.step + 1, claudeQuizScreens.length - 1) }))
  }, [])

  const handleBack = useCallback(() => {
    setQuizState((prev) => (prev.step === 0 ? prev : { ...prev, step: prev.step - 1 }))
  }, [])

  const handleAnswer = useCallback((screenId: string, value: string) => {
    if (!startedTrackingRef.current) {
      startedTrackingRef.current = true
      trackEvent('QuizStarted', { funnel: FUNNEL, first_answer: value })
    } else {
      trackEvent('QuizStepCompleted', { funnel: FUNNEL, screenId, value })
    }

    setQuizState((prev) => {
      const answers = { ...prev.answers, [screenId]: value }
      const identity = screenId === 'identity' ? (value as ClaudeIdentity) : prev.identity
      return {
        ...prev,
        answers,
        identity,
        step: Math.min(prev.step + 1, claudeQuizScreens.length - 1),
      }
    })
  }, [])

  const handleLoadingComplete = useCallback(
    (micro: { device: string; commitment: string }) => {
      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, 'loading-device': micro.device, 'loading-commitment': micro.commitment },
      }))
      handleAdvance()
    },
    [handleAdvance],
  )

  const handleEmailSubmit = useCallback(
    async (email: string, consent: boolean) => {
      setQuizState((prev) => ({ ...prev, submittedEmail: email, step: prev.step + 1 }))
      rememberCheckoutEmail(email)

      void captureLead({ email, funnel: FUNNEL, consent })
      void saveSurveyData({
        email,
        funnel: FUNNEL,
        answers: JSON.stringify(quizState.answers),
        role: quizState.identity || 'not-yet',
        profileScore: CLAUDE_PROFILE_SCORE_BY_LEVEL[profile.level],
        scoreLabel: profile.levelLabel,
        archetype: profile.persona,
      })
      identifyUser(email, { identity: quizState.identity, level: profile.level })
      trackEvent('Lead', { funnel: FUNNEL, email })
      trackEvent('QuizCompleted', { funnel: FUNNEL, level: profile.level, persona: profile.persona })
    },
    [captureLead, saveSurveyData, quizState.answers, quizState.identity, profile],
  )

  const handleNameSubmit = useCallback(
    (name: string) => {
      setQuizState((prev) => ({ ...prev, submittedName: name }))
      if (quizState.submittedEmail) {
        void updateLeadName({ email: quizState.submittedEmail, name, funnel: FUNNEL })
      }
      persistClaudeQuizResults({
        answers: quizState.answers,
        identity: quizState.identity,
        email: quizState.submittedEmail,
        name,
        quizType: 'claude-ai-certification',
      })
    },
    [quizState.answers, quizState.identity, quizState.submittedEmail, updateLeadName],
  )

  // ---- Sales funnel (Этап 4): profile → benefits → before/after → social proof → spin wheel → pricing ----

  if (quizState.submittedEmail && quizState.submittedName) {
    const goToSalesStep = (step: number) => setSalesStep(Math.min(Math.max(step, 0), CLAUDE_SALES_TOTAL_STEPS - 1))

    if (salesStep === 5) {
      return (
        <ClaudeSalesPlanScreen
          name={quizState.submittedName}
          email={quizState.submittedEmail}
          profile={profile}
          answers={quizState.answers}
          percentOff={percentOff}
          onPercentOffResolved={setPercentOff}
            onCheckoutSuccess={() => {
              persistClaudeQuizResults({
                answers: quizState.answers,
                identity: quizState.identity,
                email: quizState.submittedEmail,
                name: quizState.submittedName,
                quizType: 'claude-ai-certification',
              })
              navigate(`/checkout/setup?trial=1&funnel=${FUNNEL}`)
            }}
            onExpiredPlanContinue={(productId) => {
              persistClaudeQuizResults({
                answers: quizState.answers,
                identity: quizState.identity,
                email: quizState.submittedEmail,
                name: quizState.submittedName,
                product: productId,
                quizType: 'claude-ai-certification',
              })
              window.location.href = `/checkout?product=${encodeURIComponent(productId)}&funnel=${FUNNEL}`
            }}
        />
      )
    }

    return (
      <ClaudeSalesFunnelLayout step={salesStep} onBack={salesStep > 0 ? () => goToSalesStep(salesStep - 1) : undefined}>
        {salesStep === 0 && (
          <ClaudeProfileScreen
            name={quizState.submittedName}
            profile={profile}
            answers={quizState.answers}
            onContinue={() => goToSalesStep(1)}
          />
        )}
        {salesStep === 1 && (
          <ClaudeBenefitsScreen profile={profile} answers={quizState.answers} onContinue={() => goToSalesStep(2)} />
        )}
        {salesStep === 2 && (
          <ClaudeBeforeAfterScreen profile={profile} answers={quizState.answers} onContinue={() => goToSalesStep(3)} />
        )}
        {salesStep === 3 && <ClaudeSalesSocialProofScreen onContinue={() => goToSalesStep(4)} />}
        {salesStep === 4 && (
          <ClaudeSpinWheelScreen
            name={quizState.submittedName}
            discountPercent={SPIN_WHEEL_DISCOUNT_PERCENT}
            onContinue={() => {
              setPercentOff(SPIN_WHEEL_DISCOUNT_PERCENT)
              // Persist the guaranteed win server-side (keyed by session) so it survives
              // refresh/back-nav — the pricing screen only *reads* the offer on mount.
              void setCheckoutOfferPercent(getCheckoutSessionKey(), SPIN_WHEEL_DISCOUNT_PERCENT)
              trackEvent('SpinWheelSpun', { funnel: FUNNEL, discountPercent: SPIN_WHEEL_DISCOUNT_PERCENT })
              goToSalesStep(5)
            }}
          />
        )}
      </ClaudeSalesFunnelLayout>
    )
  }

  if (quizState.submittedEmail) {
    return <ClaudeNameCaptureScreen onSubmit={handleNameSubmit} />
  }

  // ---- Quiz phase ----

  if (!currentScreen) return null

  const showProgress = currentScreen.type === 'question'
  const currentQuestionStep = currentScreen.type === 'question' ? currentScreen.step : undefined
  const bgColor = currentScreen.type === 'identity' ? 'hsl(240 40% 95%)' : undefined

  return (
    <ClaudeQuizLayout
      onBack={quizState.step > 0 ? handleBack : undefined}
      currentStep={currentQuestionStep}
      totalSteps={CLAUDE_TOTAL_QUESTION_STEPS}
      showProgress={showProgress}
      bgColor={bgColor}
    >
      {currentScreen.type === 'identity' && (
        <ClaudeIdentityScreen screen={currentScreen} onSelect={(value) => handleAnswer(currentScreen.id, value)} />
      )}
      {currentScreen.type === 'social-proof' && (
        <ClaudeSocialProofScreen screen={currentScreen} answers={quizState.answers} onContinue={handleAdvance} />
      )}
      {currentScreen.type === 'question' && (
        <ClaudeQuestionScreen
          key={currentScreen.id}
          screen={currentScreen}
          initialValue={quizState.answers[currentScreen.id]}
          onSelect={(value) => handleAnswer(currentScreen.id, value)}
        />
      )}
      {currentScreen.type === 'interstitial' && (
        <ClaudeInterstitialScreen screen={currentScreen} answers={quizState.answers} onContinue={handleAdvance} />
      )}
      {currentScreen.type === 'certificate' && <ClaudeCertificateScreen onContinue={handleAdvance} />}
      {currentScreen.type === 'loading' && <ClaudeLoadingScreen onComplete={handleLoadingComplete} />}
      {currentScreen.type === 'email' && <ClaudeEmailScreen onSubmit={handleEmailSubmit} />}
    </ClaudeQuizLayout>
  )
}
