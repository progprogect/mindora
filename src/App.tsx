import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConvexProvider } from 'convex/react'
import { convexClient } from '@/shared/lib/convexClient'
import HomePage from '@/pages/HomePage'
import CheckoutSetupPage from '@/pages/CheckoutSetupPage'
import LegalStubPage from '@/pages/LegalStubPage'
import NotFoundPage from '@/pages/NotFoundPage'
import QuizPage from '@/funnels/twenty-eight-day/pages/QuizPage'
import ClaudeQuizPage from '@/funnels/claude/pages/ClaudeQuizPage'

function App() {
  return (
    <ConvexProvider client={convexClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/28-day-ai-challenge" element={<QuizPage />} />
          <Route path="/quiz/claude-ai-certification" element={<ClaudeQuizPage />} />
          <Route path="/checkout/setup" element={<CheckoutSetupPage />} />
          <Route
            path="/terms-and-conditions"
            element={<LegalStubPage title="Terms & Conditions" />}
          />
          <Route path="/privacy-policy" element={<LegalStubPage title="Privacy Policy" />} />
          <Route
            path="/subscription-terms"
            element={<LegalStubPage title="Subscription Terms" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  )
}

export default App
