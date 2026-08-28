import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PlannerOffer } from '@/account/UpgradePlannersPage'
import { WiseOffer } from '@/account/UpgradeWisePage'
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
            <Route path="/__preview/upgrade-planners" element={<PlannerOffer hasSavedCard />} />
            <Route path="/__preview/upgrade-wise" element={<WiseOffer />} />
          </>
        ) : null}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
