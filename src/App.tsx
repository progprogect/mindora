import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PlannerOffer } from '../authorisation/src/account/UpgradePlannersPage'
import { lmsRoutes } from '../authorisation/src/lmsRoutes.tsx'
import MarketingLayout from '@/marketing/components/MarketingLayout'
import HomePage from '@/marketing/pages/HomePage'
import PricingPage from '@/marketing/pages/PricingPage'
import BillingPage from '@/marketing/pages/BillingPage'
import SupportPage from '@/marketing/pages/SupportPage'
import AboutPage from '@/marketing/pages/AboutPage'
import ContactPage from '@/marketing/pages/ContactPage'
import CookiePolicyPage from '@/marketing/pages/CookiePolicyPage'
import PrivacyPolicyPage from '@/marketing/pages/PrivacyPolicyPage'
import TermsPage from '@/marketing/pages/TermsPage'
import RefundPolicyPage from '@/marketing/pages/RefundPolicyPage'
import SubscriptionTermsPage from '@/marketing/pages/SubscriptionTermsPage'
import EmailPreferencesPage from '@/marketing/pages/EmailPreferencesPage'
import UnsubscribePage from '@/marketing/pages/UnsubscribePage'
import NotFoundPage from '@/marketing/pages/NotFoundPage'
import LearnCategoryPage from '@/marketing/pages/LearnCategoryPage'
import FinancialWellbeingPage from '@/marketing/pages/FinancialWellbeingPage'
import { LEARN_CATEGORIES } from '@/marketing/data/learn'

const QuizPage = lazy(() => import('@/funnels/twenty-eight-day/pages/QuizPage'))
const ClaudeQuizPage = lazy(() => import('@/funnels/claude/pages/ClaudeQuizPage'))
const SaQuizPage = lazy(() => import('@/funnels/success-assessment/pages/SaQuizPage'))
const PptQuizPage = lazy(() => import('@/funnels/master-ai-for-powerpoint/pages/PptQuizPage'))
const M365QuizPage = lazy(() => import('@/funnels/master-ai-microsoft-365/pages/M365QuizPage'))
const ExcelQuizPage = lazy(() => import('@/funnels/master-claude-ai-excel/pages/ExcelQuizPage'))
const FunnelCheckoutPage = lazy(() => import('@/checkout/FunnelCheckoutPage'))
const OneTimeCheckoutPage = lazy(() => import('@/checkout/OneTimeCheckoutPage'))
const EmptyCheckoutPage = lazy(() => import('@/checkout/EmptyCheckoutPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-dvh bg-white" />}>
        <Routes>
            <Route path="/quiz/28-day-ai-challenge" element={<QuizPage />} />
            <Route path="/quiz/claude-ai-certification" element={<ClaudeQuizPage />} />
            <Route path="/quiz/success-assessment" element={<SaQuizPage />} />
            <Route path="/quiz/master-ai-for-powerpoint" element={<PptQuizPage />} />
            <Route path="/quiz/master-ai-microsoft-365" element={<M365QuizPage />} />
            <Route path="/quiz/master-claude-ai-excel" element={<ExcelQuizPage />} />
            {lmsRoutes}
            {import.meta.env.DEV ? (
              <>
                <Route path="/__preview/upgrade-planners" element={<PlannerOffer hasSavedCard />} />
                <Route path="/__preview/upgrade-planners-nocard" element={<PlannerOffer hasSavedCard={false} />} />
              </>
            ) : null}
            <Route path="/checkout/one-time" element={<OneTimeCheckoutPage />} />
            <Route path="/checkout/:funnel" element={<FunnelCheckoutPage />} />
            <Route path="/checkout" element={<EmptyCheckoutPage />} />
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/subscription-terms" element={<SubscriptionTermsPage />} />
              <Route
                path="/learn/success-mindset"
                element={<LearnCategoryPage category={LEARN_CATEGORIES['success-mindset']} />}
              />
              <Route
                path="/learn/career"
                element={<LearnCategoryPage category={LEARN_CATEGORIES.career} />}
              />
              <Route
                path="/learn/business"
                element={<LearnCategoryPage category={LEARN_CATEGORIES.business} />}
              />
              <Route
                path="/learn/ai-and-technology"
                element={<LearnCategoryPage category={LEARN_CATEGORIES['ai-and-technology']} />}
              />
              <Route
                path="/learn/health"
                element={<LearnCategoryPage category={LEARN_CATEGORIES.health} />}
              />
              <Route path="/learn/financial-wellbeing" element={<FinancialWellbeingPage />} />
            </Route>
            <Route path="/email-preferences" element={<EmailPreferencesPage />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route path="/learn" element={<NotFoundPage />} />
            <Route path="/learn/*" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
