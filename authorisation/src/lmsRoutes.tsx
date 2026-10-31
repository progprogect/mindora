import { Navigate, Route, useLocation, useParams } from 'react-router-dom'
import AccountCreatePage from '@/account/AccountCreatePage'
import CheckoutSetupPage from '@/account/CheckoutSetupPage'
import OnboardPage from '@/account/OnboardPage'
import UpgradeMindoraPage from '@/account/UpgradeMindoraPage'
import UpgradePlannersPage from '@/account/UpgradePlannersPage'
import UpgradePromptPage from '@/account/UpgradePromptPage'
import WelcomePage from '@/account/WelcomePage'
import AppLayout from '@/app/AppLayout'
import { FloatingLanguageSwitcher } from '@/i18n/LanguageSwitcher'
import CertificatePage from '@/app/pages/CertificatePage'
import CertificatesPage from '@/app/pages/CertificatesPage'
import CourseHubPage from '@/app/pages/CourseHubPage'
import DashboardPage from '@/app/pages/DashboardPage'
import LessonPage from '@/app/pages/LessonPage'
import MaterialsPage from '@/app/pages/MaterialsPage'
import MaterialPage from '@/app/pages/MaterialPage'
import PathCatalogPage from '@/app/pages/PathCatalogPage'
import PlannersPage from '@/app/pages/PlannersPage'
import ProfilePage from '@/app/pages/ProfilePage'
import ProgressPage from '@/app/pages/ProgressPage'
import PromptLibraryPage from '@/app/pages/PromptLibraryPage'
import PurchasesPage from '@/app/pages/PurchasesPage'
import MindoraHistoryPage from '@/app/pages/MindoraHistoryPage'
import MindoraPage from '@/app/pages/MindoraPage'
import MindoraUnlockPage from '@/app/pages/MindoraUnlockPage'
import LoginPage from '@/auth/LoginPage'
import RequireAuth from '@/auth/RequireAuth'
import RequireLmsAccess from '@/auth/RequireLmsAccess'
import NotFoundPage from '@/pages/NotFoundPage'
import { isLocale, withLocale, type Locale } from '@/i18n/locale'

const PUBLIC_COURSE_SLUG = '28-day-ai-challenge'

function localeFromParams(): Locale {
  const { locale } = useParams()
  return isLocale(locale) ? locale : 'en'
}

function RedirectPublicCourse() {
  const { slug, lessonId } = useParams()
  const locale = localeFromParams()
  if (slug !== PUBLIC_COURSE_SLUG) return <NotFoundPage />
  const target = lessonId ? `/app/courses/${slug}/${lessonId}` : `/app/courses/${slug}`
  return <Navigate to={withLocale(locale, target)} replace />
}

function RedirectPreserve({ to }: { to: string }) {
  const { search } = useLocation()
  const locale = localeFromParams()
  return <Navigate to={`${withLocale(locale, to)}${search}`} replace />
}

function RedirectToAppDashboard() {
  const locale = localeFromParams()
  return <Navigate to={withLocale(locale, '/app/dashboard')} replace />
}

export const lmsRoutes = (
  <>
    <Route path="login" element={<LoginPage />} />
    <Route path="dashboard" element={<RedirectToAppDashboard />} />
    <Route path="checkout/setup" element={<CheckoutSetupPage />} />
    <Route path="account/create" element={<AccountCreatePage />} />
    <Route path="account/onboard" element={<><FloatingLanguageSwitcher /><OnboardPage /></>} />
    <Route path="account/welcome" element={<WelcomePage />} />
    <Route path="account/upgrade" element={<><FloatingLanguageSwitcher /><UpgradePromptPage /></>} />
    <Route path="account/upgrade-planners" element={<><FloatingLanguageSwitcher /><UpgradePlannersPage /></>} />
    {/* Annual OTO removed from new $1 funnel path; keep URL as soft redirect for legacy links. */}
    <Route path="account/upgrade-annual" element={<RedirectToAppDashboard />} />
    <Route path="account/upgrade-mindora" element={<><FloatingLanguageSwitcher /><UpgradeMindoraPage /></>} />
    <Route path="account/upgrade-wise" element={<RedirectPreserve to="/account/upgrade-mindora" />} />

    <Route
      path="app"
      element={
        <RequireAuth>
          <RequireLmsAccess>
            <AppLayout />
          </RequireLmsAccess>
        </RequireAuth>
      }
    >
      <Route index element={<RedirectToAppDashboard />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="progress" element={<ProgressPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="ai-and-technology" element={<PathCatalogPage pathKey="ai-and-technology" />} />
      <Route path="success-mindset" element={<PathCatalogPage pathKey="success-mindset" />} />
      <Route path="career" element={<PathCatalogPage pathKey="career" />} />
      <Route path="business" element={<PathCatalogPage pathKey="business" />} />
      <Route path="health" element={<PathCatalogPage pathKey="health" />} />
      <Route path="financial-wellbeing" element={<PathCatalogPage pathKey="financial-wellbeing" />} />
      <Route path="mindora" element={<MindoraPage />} />
      <Route path="mindora/history" element={<MindoraHistoryPage />} />
      <Route path="mindora/unlock" element={<MindoraUnlockPage />} />
      <Route path="wise" element={<RedirectPreserve to="/app/mindora" />} />
      <Route path="wise/history" element={<RedirectPreserve to="/app/mindora/history" />} />
      <Route path="wise/unlock" element={<RedirectPreserve to="/app/mindora/unlock" />} />
      <Route path="planners" element={<PlannersPage />} />
      <Route path="materials" element={<MaterialsPage />} />
      <Route path="materials/:slug" element={<MaterialPage />} />
      <Route path="purchases" element={<PurchasesPage />} />
      <Route path="prompt-library" element={<PromptLibraryPage />} />
      <Route path="certificates" element={<CertificatesPage />} />
      <Route path="certificate/:certificateNumber" element={<CertificatePage />} />
      <Route path="courses/:slug" element={<CourseHubPage />} />
      <Route path="courses/:slug/:lessonId" element={<LessonPage />} />
    </Route>

    <Route path="courses/:slug" element={<RedirectPublicCourse />} />
    <Route path="courses/:slug/:lessonId" element={<RedirectPublicCourse />} />
  </>
)
