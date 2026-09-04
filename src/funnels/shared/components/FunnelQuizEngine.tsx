import { useCallback, useEffect, type Dispatch, type SetStateAction } from 'react'
import type { FunnelQuizState, FunnelScreen } from '@/funnels/shared/types'
import QuizLayout from '@/funnels/shared/components/QuizLayout'
import SaIdentityScreen from '@/funnels/shared/components/SaIdentityScreen'
import MasterIdentityScreen from '@/funnels/shared/components/MasterIdentityScreen'
import LargeCardQuestion from '@/funnels/shared/components/LargeCardQuestion'
import QuestionScreen from '@/funnels/shared/components/QuestionScreen'
import SocialProofScreen from '@/funnels/shared/components/SocialProofScreen'
import InterstitialScreen from '@/funnels/shared/components/InterstitialScreen'
import LoadingScreen from '@/funnels/shared/components/LoadingScreen'
import EmailScreen from '@/funnels/shared/components/EmailScreen'
import NameCaptureScreen from '@/funnels/shared/components/NameCaptureScreen'
import { trackEvent, identifyUser } from '@/shared/lib/tracking'
import { useCaptureLead, useSaveSurveyData, useUpdateLeadName } from '@/shared/lib/backend'
import { rememberCheckoutEmail } from '@/shared/lib/checkoutSession'

interface FunnelQuizEngineProps {
  funnelId: string
  pageTitle: string
  screens: FunnelScreen[]
  headerTotal: number
  quizState: FunnelQuizState
  setQuizState: Dispatch<SetStateAction<FunnelQuizState>>
  profileSnapshot: {
    score: number
    scoreLabel: string
    archetype: string
    role: string
  }
}

export default function FunnelQuizEngine({
  funnelId,
  pageTitle,
  screens,
  headerTotal,
  quizState,
  setQuizState,
  profileSnapshot,
}: FunnelQuizEngineProps) {
  const captureLead = useCaptureLead()
  const updateLeadName = useUpdateLeadName()
  const saveSurveyData = useSaveSurveyData()

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  const currentScreen = quizState.step < screens.length ? screens[quizState.step] : null

  const handleBack = useCallback(() => {
    setQuizState((prev) => {
      let nextStep = prev.step - 1
      if (nextStep >= 0 && screens[nextStep]?.type === 'loading') nextStep -= 1
      return { ...prev, step: Math.max(0, nextStep) }
    })
  }, [screens, setQuizState])

  const handleAdvance = useCallback(() => {
    setQuizState((prev) => ({ ...prev, step: prev.step + 1 }))
  }, [setQuizState])

  const handleAnswer = useCallback(
    (screenId: string, value: string) => {
      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [screenId]: value },
        step: prev.step + 1,
      }))
      trackEvent('QuizStepCompleted', { funnel: funnelId, screenId, value })
    },
    [funnelId, setQuizState],
  )

  const handleIdentity = useCallback(
    (value: string) => {
      trackEvent('QuizStarted', { funnel: funnelId, first_answer: value })
      handleAnswer(currentScreen?.id ?? 'identity', value)
    },
    [currentScreen?.id, funnelId, handleAnswer],
  )

  const handleLoadingComplete = useCallback(
    (micro: { device: string; commitment: string }) => {
      setQuizState((prev) => ({
        ...prev,
        answers: { ...prev.answers, 'micro-device': micro.device, 'micro-commitment': micro.commitment },
        step: prev.step + 1,
      }))
    },
    [setQuizState],
  )

  const handleEmailSubmit = useCallback(
    (email: string, consent: boolean) => {
      setQuizState((prev) => ({ ...prev, email, consent, step: prev.step + 1 }))
      rememberCheckoutEmail(email)
      void captureLead({ email, funnel: funnelId, consent })
      void saveSurveyData({
        email,
        funnel: funnelId,
        answers: JSON.stringify(quizState.answers),
        role: profileSnapshot.role,
        profileScore: profileSnapshot.score,
        scoreLabel: profileSnapshot.scoreLabel,
        archetype: profileSnapshot.archetype,
      })
      identifyUser(email, { funnel: funnelId, score: profileSnapshot.score })
      trackEvent('Lead', { email, funnel: funnelId })
      trackEvent('QuizCompleted', { funnel: funnelId, score: profileSnapshot.score })
    },
    [captureLead, funnelId, profileSnapshot, quizState.answers, saveSurveyData, setQuizState],
  )

  const handleNameSubmit = useCallback(
    (name: string) => {
      setQuizState((prev) => ({ ...prev, name, step: prev.step + 1 }))
      if (quizState.email) void updateLeadName({ email: quizState.email, name, funnel: funnelId })
    },
    [funnelId, quizState.email, setQuizState, updateLeadName],
  )

  if (!currentScreen) return null

  const questionStep = currentScreen.type === 'question' ? currentScreen.step : undefined
  const showProgress = currentScreen.type === 'question'
  const hideBack =
    quizState.step === 0 || currentScreen.type === 'name-capture' || currentScreen.type === 'loading'
  const ownsPadding = new Set([
    'identity-sa',
    'identity-master',
    'large-card',
    'social-proof',
    'interstitial',
    'email',
    'name-capture',
    'loading',
  ])
  const logoVariant = currentScreen.type === 'name-capture' && currentScreen.chrome === 'wordmark' ? 'text' : 'image'
  const echoValue =
    currentScreen.type === 'social-proof' || currentScreen.type === 'interstitial'
      ? currentScreen.echoKey
        ? quizState.answers[currentScreen.echoKey]
        : undefined
      : undefined

  const quizFooter =
    currentScreen.type === 'social-proof' || currentScreen.type === 'interstitial' ? (
      <button type="button" onClick={handleAdvance} className="sw-cta animate-pulse-cta">
        {currentScreen.ctaLabel}
      </button>
    ) : undefined

  return (
    <QuizLayout
      onBack={hideBack ? undefined : handleBack}
      currentStep={showProgress ? questionStep : undefined}
      totalSteps={showProgress ? headerTotal : undefined}
      logoVariant={logoVariant}
      pageClassName={currentScreen.type === 'identity-sa' ? 'overflow-x-hidden bg-[#F0F6FF]' : undefined}
      contentClassName={ownsPadding.has(currentScreen.type) ? 'p-0' : 'px-4'}
      footer={quizFooter}
    >
      {currentScreen.type === 'identity-sa' ? (
        <SaIdentityScreen screen={currentScreen} onSelect={handleIdentity} />
      ) : null}
      {currentScreen.type === 'identity-master' ? (
        <MasterIdentityScreen screen={currentScreen} onSelect={handleIdentity} />
      ) : null}
      {currentScreen.type === 'large-card' ? (
        <LargeCardQuestion
          key={currentScreen.id}
          screen={currentScreen}
          onSelect={(v) => handleAnswer(currentScreen.id, v)}
        />
      ) : null}
      {currentScreen.type === 'question' ? (
        <QuestionScreen
          key={currentScreen.id}
          screen={currentScreen}
          initialSelected={quizState.answers[currentScreen.id]}
          onAnswer={(v) => handleAnswer(currentScreen.id, v)}
        />
      ) : null}
      {currentScreen.type === 'social-proof' ? (
        <SocialProofScreen screen={currentScreen} echoValue={echoValue} />
      ) : null}
      {currentScreen.type === 'interstitial' ? (
        <InterstitialScreen screen={currentScreen} echoValue={echoValue} />
      ) : null}
      {currentScreen.type === 'loading' ? (
        <LoadingScreen screen={currentScreen} onComplete={handleLoadingComplete} />
      ) : null}
      {currentScreen.type === 'email' ? (
        <EmailScreen screen={currentScreen} onSubmit={handleEmailSubmit} />
      ) : null}
      {currentScreen.type === 'name-capture' ? (
        <NameCaptureScreen screen={currentScreen} onSubmit={handleNameSubmit} />
      ) : null}
    </QuizLayout>
  )
}
