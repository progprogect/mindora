import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AnnualOffer } from '@/account/UpgradeAnnualPage'
import { PlannerOffer } from '@/account/UpgradePlannersPage'
import { PromptOffer } from '@/account/UpgradePromptPage'
import { MindoraOffer } from '@/account/UpgradeMindoraPage'
import { lmsRoutes } from '@/lmsRoutes'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {lmsRoutes}

        {import.meta.env.DEV ? (
          <>
            <Route path="/__preview/upgrade-prompt" element={<PromptOffer hasSavedCard />} />
            <Route path="/__preview/upgrade-planners" element={<PlannerOffer hasSavedCard />} />
            <Route path="/__preview/upgrade-planners-nocard" element={<PlannerOffer hasSavedCard={false} />} />
            <Route path="/__preview/upgrade-annual" element={<AnnualOffer />} />
            <Route path="/__preview/upgrade-mindora" element={<MindoraOffer />} />
            <Route path="/__preview/upgrade-wise" element={<Navigate to="/__preview/upgrade-mindora" replace />} />
          </>
        ) : null}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
