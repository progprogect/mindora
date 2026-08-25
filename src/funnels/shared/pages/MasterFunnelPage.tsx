import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunnelQuizEngine from '@/funnels/shared/components/FunnelQuizEngine'
import SalesDotsLayout from '@/funnels/shared/components/SalesDotsLayout'
import SalesWordmarkLayout from '@/funnels/shared/components/SalesWordmarkLayout'
import SpinWheelScreen from '@/funnels/shared/components/SpinWheelScreen'
import TrialPlanScreen from '@/funnels/shared/components/TrialPlanScreen'
import {
  BeforeAfterTable,
  BulletBenefitsScreen,
  LegalSocialScreen,
  M365ProfileScreen,
  MasterSkillProfileScreen,
} from '@/funnels/shared/components/MasterSalesScreens'
import { createFunnelStorage } from '@/funnels/shared/lib/storage'
import {
  buildExcelProfile,
  buildM365Profile,
  buildPptProfile,
} from '@/funnels/shared/lib/masterProfile'
import { excelPlan, m365Plan, M365_BEFORE_AFTER, M365_BENEFITS, PPT_BEFORE_AFTER, PPT_BENEFITS, pptPlan } from '@/funnels/shared/data/planCopy'
import type { FunnelScreen } from '@/funnels/shared/types'
import {
  ExcelBeforeAfterScreen,
  ExcelBenefitsScreen,
  ExcelSocialScreen,
} from '@/funnels/master-claude-ai-excel/components/ExcelSalesScreens'

export type MasterKind = 'ppt' | 'm365' | 'excel'

interface MasterFunnelPageProps {
  kind: MasterKind
  funnelId: string
  pageTitle: string
  screens: FunnelScreen[]
}

export default function MasterFunnelPage({ kind, funnelId, pageTitle, screens }: MasterFunnelPageProps) {
  const navigate = useNavigate()
  const storage = useMemo(() => createFunnelStorage(funnelId), [funnelId])
  const [quizState, setQuizState] = useState(() => storage.loadState())
  const [salesStep, setSalesStep] = useState(() => storage.loadSalesStep())
  const [percentOff, setPercentOff] = useState(50)
  const name = quizState.name ?? 'Alex'

  const pptProfile = useMemo(() => buildPptProfile(quizState.answers), [quizState.answers])
  const excelProfile = useMemo(() => buildExcelProfile(quizState.answers), [quizState.answers])
  const m365Profile = useMemo(() => buildM365Profile(quizState.answers), [quizState.answers])

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
      navigate(`/checkout/setup?trial=1&funnel=${funnelId}`)
    }
  }, [funnelId, navigate])

  const quizFinished = quizState.step >= screens.length
  const skill = kind === 'excel' ? excelProfile : pptProfile

  if (quizFinished) {
    if (salesStep === 5) {
      const copy =
        kind === 'ppt'
          ? pptPlan(quizState.name, pptProfile.levelLabel, pptProfile.timeSavedShort, pptProfile.opportunity)
          : kind === 'm365'
            ? m365Plan(quizState.name, m365Profile.readinessLabel, m365Profile.timeSavedShort, m365Profile.opportunity)
            : excelPlan(quizState.name, excelProfile.levelLabel, excelProfile.timeSavedShort, excelProfile.opportunity)

      return (
        <TrialPlanScreen
          copy={copy}
          email={quizState.email}
          name={quizState.name}
          percentOff={percentOff}
          onPercentOffResolved={setPercentOff}
          onCheckoutSuccess={() => {
            window.localStorage.setItem('sw_checkout_completed', 'true')
            window.location.href = `/checkout/setup?trial=1&funnel=${funnelId}`
          }}
          onExpiredPlanContinue={(productId) => {
            window.location.href = `/checkout?product=${encodeURIComponent(productId)}&funnel=${funnelId}`
          }}
        />
      )
    }

    if (salesStep === 4) {
      const spin = (
        <SpinWheelScreen
          name={quizState.name}
          subtitle="Don't miss your chance to master AI with your personal reward 🎁"
          onFinish={(pct) => {
            setPercentOff(pct)
            setSalesStep(5)
          }}
        />
      )
      if (kind === 'excel') {
        return <SalesWordmarkLayout contentClassName="p-0">{spin}</SalesWordmarkLayout>
      }
      return (
        <SalesDotsLayout step={4} onBack={() => setSalesStep(3)}>
          {spin}
        </SalesDotsLayout>
      )
    }

    const continueLabel =
      salesStep === 0
        ? kind === 'ppt'
          ? 'See My PowerPoint Mastery Plan →'
          : kind === 'excel'
            ? 'See My Excel Mastery Plan →'
            : 'Continue →'
        : kind === 'excel'
          ? 'Continue →'
          : 'Continue'

    if (kind === 'excel') {
      return (
        <SalesWordmarkLayout
          onBack={salesStep > 0 ? () => setSalesStep((s) => s - 1) : undefined}
          footer={
            <button type="button" onClick={() => setSalesStep((s) => s + 1)} className="sw-cta animate-pulse-cta">
              {continueLabel}
            </button>
          }
        >
          {salesStep === 0 ? (
            <MasterSkillProfileScreen
              name={name}
              titleLine="Excel + AI Profile"
              levelKicker="Excel level"
              profile={excelProfile}
              badgeEmoji="📊"
            />
          ) : null}
          {salesStep === 1 ? <ExcelBenefitsScreen /> : null}
          {salesStep === 2 ? <ExcelBeforeAfterScreen /> : null}
          {salesStep === 3 ? <ExcelSocialScreen /> : null}
        </SalesWordmarkLayout>
      )
    }

    return (
      <SalesDotsLayout
        step={salesStep}
        onBack={salesStep > 0 ? () => setSalesStep((s) => s - 1) : undefined}
      >
        {salesStep === 0 && kind === 'ppt' ? (
          <MasterSkillProfileScreen
            name={name}
            titleLine="PowerPoint + AI Profile"
            levelKicker="PowerPoint level"
            profile={pptProfile}
          />
        ) : null}
        {salesStep === 0 && kind === 'm365' ? <M365ProfileScreen name={name} profile={m365Profile} /> : null}
        {salesStep === 1 && kind === 'ppt' ? (
          <BulletBenefitsScreen
            kicker={PPT_BENEFITS.kicker}
            title={PPT_BENEFITS.title(name)}
            intro={PPT_BENEFITS.intro}
            bullets={PPT_BENEFITS.bullets}
            footer={PPT_BENEFITS.footer}
          />
        ) : null}
        {salesStep === 1 && kind === 'm365' ? (
          <BulletBenefitsScreen
            kicker={M365_BENEFITS.kicker}
            title={M365_BENEFITS.title(name)}
            intro={M365_BENEFITS.intro}
            bullets={M365_BENEFITS.bullets}
            footer={M365_BENEFITS.footer}
          />
        ) : null}
        {salesStep === 2 && kind === 'ppt' ? (
          <BeforeAfterTable
            kicker={PPT_BEFORE_AFTER.kicker}
            title={PPT_BEFORE_AFTER.title(name)}
            intro={PPT_BEFORE_AFTER.intro}
            rows={PPT_BEFORE_AFTER.rows}
            footer={PPT_BEFORE_AFTER.footer}
          />
        ) : null}
        {salesStep === 2 && kind === 'm365' ? (
          <BeforeAfterTable
            kicker={M365_BEFORE_AFTER.kicker}
            title={M365_BEFORE_AFTER.title(name)}
            intro={M365_BEFORE_AFTER.intro}
            rows={M365_BEFORE_AFTER.rows}
            footer={M365_BEFORE_AFTER.footer}
          />
        ) : null}
        {salesStep === 3 ? <LegalSocialScreen name={name} /> : null}
        <div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
        >
          <div className="mx-auto max-w-lg">
            <button
              type="button"
              onClick={() => setSalesStep((s) => s + 1)}
              className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-white shadow-lg"
            >
              {continueLabel}
            </button>
          </div>
          <div style={{ paddingTop: 56, paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </SalesDotsLayout>
    )
  }

  return (
    <FunnelQuizEngine
      funnelId={funnelId}
      pageTitle={pageTitle}
      screens={screens}
      headerTotal={16}
      quizState={quizState}
      setQuizState={setQuizState}
      profileSnapshot={{
        score: kind === 'm365' ? m365Profile.readiness : skill.rings[2]?.score ?? 60,
        scoreLabel: kind === 'm365' ? m365Profile.readinessLabel : skill.levelLabel,
        archetype: kind === 'm365' ? m365Profile.persona : skill.persona,
        role: quizState.answers['q2-work-status'] ?? 'full-time',
      }}
    />
  )
}
