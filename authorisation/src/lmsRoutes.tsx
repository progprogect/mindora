import { Navigate, Route, useParams } from 'react-router-dom'
import AccountCreatePage from '@/account/AccountCreatePage'
import CheckoutSetupPage from '@/account/CheckoutSetupPage'
import OnboardPage from '@/account/OnboardPage'
import UpgradeGatePage from '@/account/UpgradeGatePage'
import UpgradePlannersPage from '@/account/UpgradePlannersPage'
import UpgradeWisePage from '@/account/UpgradeWisePage'
import WelcomePage from '@/account/WelcomePage'
import AppLayout from '@/app/AppLayout'
import CertificatePage from '@/app/pages/CertificatePage'
import CertificatesPage from '@/app/pages/CertificatesPage'
import CourseHubPage from '@/app/pages/CourseHubPage'
import DashboardPage from '@/app/pages/DashboardPage'
import LessonPage from '@/app/pages/LessonPage'
import PathCatalogPage from '@/app/pages/PathCatalogPage'
import PlannersPage from '@/app/pages/PlannersPage'
import ProfilePage from '@/app/pages/ProfilePage'
import ProgressPage from '@/app/pages/ProgressPage'
import PromptLibraryPage from '@/app/pages/PromptLibraryPage'
import PurchasesPage from '@/app/pages/PurchasesPage'
import WiseHistoryPage from '@/app/pages/WiseHistoryPage'
import WisePage from '@/app/pages/WisePage'
import WiseUnlockPage from '@/app/pages/WiseUnlockPage'
import AccountStubPage from '@/account/AccountStubPage'
import LoginPage from '@/auth/LoginPage'
import RequireAuth from '@/auth/RequireAuth'
import NotFoundPage from '@/pages/NotFoundPage'

const PUBLIC_COURSE_SLUG = '28-day-ai-challenge'

function RedirectPublicCourse() {
  const { slug, lessonId } = useParams()
  if (slug !== PUBLIC_COURSE_SLUG) return <NotFoundPage />
  return (
    <Navigate
      to={lessonId ? `/app/courses/${slug}/${lessonId}` : `/app/courses/${slug}`}
      replace
    />
  )
}

export const lmsRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
    <Route path="/checkout/setup" element={<CheckoutSetupPage />} />
    <Route path="/account/create" element={<AccountCreatePage />} />
    <Route path="/account/onboard" element={<OnboardPage />} />
    <Route path="/account/welcome" element={<WelcomePage />} />
    <Route path="/account/upgrade" element={<UpgradeGatePage />} />
    <Route path="/account/upgrade-planners" element={<UpgradePlannersPage />} />
    <Route path="/account/upgrade-wise" element={<UpgradeWisePage />} />
    <Route path="/account/upgrade-annual" element={<AccountStubPage title="Upgrade annual" />} />

    <Route
      path="/app"
      element={
        <RequireAuth>
          <AppLayout />
        </RequireAuth>
      }
    >
      <Route index element={<Navigate to="/app/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="progress" element={<ProgressPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="ai-and-technology" element={<PathCatalogPage pathKey="ai-and-technology" />} />
      <Route path="success-mindset" element={<PathCatalogPage pathKey="success-mindset" />} />
      <Route path="career" element={<PathCatalogPage pathKey="career" />} />
      <Route path="business" element={<PathCatalogPage pathKey="business" />} />
      <Route path="health" element={<PathCatalogPage pathKey="health" />} />
      <Route path="financial-wellbeing" element={<PathCatalogPage pathKey="financial-wellbeing" />} />
      <Route path="wise" element={<WisePage />} />
      <Route path="wise/history" element={<WiseHistoryPage />} />
      <Route path="wise/unlock" element={<WiseUnlockPage />} />
      <Route path="planners" element={<PlannersPage />} />
      <Route path="purchases" element={<PurchasesPage />} />
      <Route path="prompt-library" element={<PromptLibraryPage />} />
      <Route path="certificates" element={<CertificatesPage />} />
      <Route path="certificate/:certificateNumber" element={<CertificatePage />} />
      <Route path="courses/:slug" element={<CourseHubPage />} />
      <Route path="courses/:slug/:lessonId" element={<LessonPage />} />
    </Route>

    <Route path="/courses/:slug" element={<RedirectPublicCourse />} />
    <Route path="/courses/:slug/:lessonId" element={<RedirectPublicCourse />} />
  </>
)
