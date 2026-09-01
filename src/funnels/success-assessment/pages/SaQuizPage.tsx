import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunnelQuizEngine from '@/funnels/shared/components/FunnelQuizEngine'
import SalesWordmarkLayout from '@/funnels/shared/components/SalesWordmarkLayout'
import SpinWheelScreen from '@/funnels/shared/components/SpinWheelScreen'
import TrialPlanScreen, { type TrialPlanCopy } from '@/funnels/shared/components/TrialPlanScreen'
import { createFunnelStorage } from '@/funnels/shared/lib/storage'
import { SA_SCREENS } from '@/funnels/success-assessment/data/screens'
import {
  buildSaProfile,
  formatPlus90,
  rewardLine,
  visionStruggle,
} from '@/funnels/success-assessment/lib/scoring'
import SaProfileScreen from '@/funnels/success-assessment/components/SaProfileScreen'
import { SaRoadmapScreen, SaSocialScreen, SaTransformationScreen } from '@/funnels/success-assessment/components/SaSalesScreens'

const FUNNEL = 'success-assessment'
const TITLE = 'Success Assessment — MindoraAcademy.com | Your Personalised Roadmap'
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
  const navigate = useNavigate()
  const storage = useMemo(() => createFunnelStorage(FUNNEL), [])
  const [quizState, setQuizState] = useState(() => storage.loadState())
  const [salesStep, setSalesStep] = useState(() => storage.loadSalesStep())
  const [percentOff, setPercentOff] = useState(50)
  const profile = useMemo(() => buildSaProfile(quizState.answers), [quizState.answers])

  useEffect(() => {
    document.title = TITLE
  }, [])
  useEffect(() => storage.persistState(quizState), [quizState, storage])
  useEffect(() => storage.persistSalesStep(salesStep), [salesStep, storage])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('redirect_status') === 'succeeded') {
      params.delete('redirect_status')
      const clean = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (clean ? `?${clean}` : ''))
      navigate(`/checkout/setup?trial=1&funnel=${FUNNEL}`)
    }
  }, [navigate])

  const quizFinished = quizState.step >= SA_SCREENS.length

  if (quizFinished) {
    if (salesStep === 5) {
      const copy: TrialPlanCopy = {
        funnel: FUNNEL,
        headline: (name) => (
          <>
            Your Personalised Success Plan
            <br />
            is ready, {name ? <span className="text-sw-blue">{name}!</span> : <span className="text-sw-blue">ready!</span>}
          </>
        ),
        insight: profile.quote,
        metaLeft: { kicker: '✨ Your archetype', value: `${profile.archetype} ${profile.archetypeEmoji}` },
        metaRight: { kicker: '⚡ Your level', value: profile.scoreLabel },
        pathTitle: 'YOUR PERSONALISED SUCCESS ROADMAP',
        pathSubtitle: 'Daily lessons across Mindset, Career, Health & more. 10–15 minutes a day.',
        pathItems: [
          { emoji: '🧠', kicker: 'DAY 1', label: 'Mindset Reset' },
          { emoji: '🎯', kicker: 'DAY 2', label: 'Goal Setting' },
          { emoji: '💼', kicker: 'DAY 3', label: 'Career Strategy' },
          { emoji: '⚙️', kicker: 'DAY 4', label: 'Habit Design' },
          { emoji: '🏢', kicker: 'DAY 8', label: 'Business Clarity' },
          { emoji: '💰', kicker: 'DAY 9', label: 'Financial Mindset' },
          { emoji: '💪', kicker: 'DAY 10', label: 'Health & Energy' },
          { emoji: '📈', kicker: 'DAY 11', label: 'Productivity' },
          { emoji: '🌟', kicker: 'DAY 15', label: 'Leadership' },
          { emoji: '🤖', kicker: 'DAY 16', label: 'AI & Technology' },
          { emoji: '⏱️', kicker: 'DAY 17', label: 'Time Mastery' },
          { emoji: '🌱', kicker: 'DAY 18', label: 'Life Design' },
        ],
        pathCta: 'GET MY AI PLAN →',
        tickerLabel: '🔥 1,247 people started their plan this week',
        tickerHandles: SA_HANDLES,
        highlights: [
          'Full access to your personalised 28-Day AI Plan',
          'Easy-to-follow daily lessons — no experience required',
          'New AI tools and skills added every week',
        ],
        impactTitle: "What's included in your plan",
        impactItems: [],
        includedTitle: "What's included in your plan",
        included: [
          '90-day personalised Success Roadmap (10 min/day)',
          `Plan matched to your ${profile.archetype} ${profile.archetypeEmoji}`,
          '200+ lessons across Mindset, Career, Business, Health & Finance',
          'Certificate of completion',
          'Expert-led content updated every week',
          'Cancel anytime — no lock-in',
        ],
        testimonialsTitle: 'What members say',
        testimonials: [
          {
            quote:
              'My clarity went from 2/10 to 9/10 in the first month. The roadmap showed me exactly which areas were holding me back.',
            name: 'Rachel T.',
            role: 'Career Changer',
          },
          {
            quote:
              'I used to jump between self-help books with zero structure. MindoraAcademy gave me a real system — I got promoted in 4 months.',
            name: 'Marcus H.',
            role: 'Entrepreneur',
          },
          {
            quote:
              "Knowing I was a 'Wellness Warrior' helped me prioritise health first. My energy and focus improved within weeks.",
            name: 'Priya S.',
            role: 'Operations Director',
          },
        ],
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
            window.location.href = `/checkout/setup?trial=1&funnel=${FUNNEL}`
          }}
          onExpiredPlanContinue={(productId) => {
            window.location.href = `/checkout?product=${encodeURIComponent(productId)}&funnel=${FUNNEL}`
          }}
        />
      )
    }

    const struggle = visionStruggle(profile.vision)
    const footerCta =
      salesStep === 0
        ? 'SEE MY PERSONALISED PLAN →'
        : salesStep === 3
          ? 'Unlock My Success Plan →'
          : 'Continue →'

    if (salesStep === 4) {
      return (
        <SalesWordmarkLayout>
          <SpinWheelScreen
            name={quizState.name}
            subtitle="Don't miss your chance to unlock your Success Plan with a personal reward 🎁"
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
        {salesStep === 0 ? <SaProfileScreen name={quizState.name ?? 'Alex'} profile={profile} /> : null}
        {salesStep === 1 ? <SaRoadmapScreen profile={profile} /> : null}
        {salesStep === 2 ? (
          <SaTransformationScreen
            profile={profile}
            plus90={formatPlus90()}
            rewardLine={rewardLine(profile.reward)}
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
      pageTitle={TITLE}
      screens={SA_SCREENS}
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
