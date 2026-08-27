import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MarketingLayout from '@/marketing/components/MarketingLayout'
import HomePage from '@/marketing/pages/HomePage'
import PricingPage from '@/marketing/pages/PricingPage'
import BillingPage from '@/marketing/pages/BillingPage'
import SupportPage from '@/marketing/pages/SupportPage'
import PrivacyPolicyPage from '@/marketing/pages/PrivacyPolicyPage'
import TermsPage from '@/marketing/pages/TermsPage'
import RefundPolicyPage from '@/marketing/pages/RefundPolicyPage'
import SubscriptionTermsPage from '@/marketing/pages/SubscriptionTermsPage'
import LoginPage from '@/marketing/pages/LoginPage'
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
const CheckoutSetupPage = lazy(() => import('@/checkout/CheckoutSetupPage'))
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
            <Route path="/checkout/setup" element={<CheckoutSetupPage />} />
            <Route path="/checkout/:funnel" element={<FunnelCheckoutPage />} />
            <Route path="/checkout" element={<EmptyCheckoutPage />} />
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/support" element={<SupportPage />} />
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/email-preferences" element={<EmailPreferencesPage />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route path="/app/*" element={<Navigate to="/login" replace />} />
            <Route path="/courses/*" element={<Navigate to="/login" replace />} />
            <Route path="/learn" element={<NotFoundPage />} />
            <Route path="/learn/*" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
