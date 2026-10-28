import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'

/** Shown when a kit-only member opens a course outside their allowlist. */
export default function CourseLockedPanel({ backHref = '/app/dashboard' }: { backHref?: string }) {
  const { locale, t } = useI18n()
  return (
    <main className="max-w-2xl mx-auto px-4 pt-10 pb-36 text-center">
      <p className="text-4xl" aria-hidden>
        🔒
      </p>
      <h1 className="text-xl font-extrabold mt-3 text-sw-dark">{t('app.courseAccess.lockedTitle')}</h1>
      <p className="text-sm text-sw-grey mt-2 max-w-md mx-auto">{t('app.courseAccess.lockedBody')}</p>
      <Link
        to={withLocale(locale, "/pricing")}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-sw-blue px-5 py-3 text-sm font-bold text-white active:scale-[0.98]"
      >
        {t('app.courseAccess.unlockCta')}
      </Link>
      <div className="mt-4">
        <Link to={withLocale(locale, backHref)} className="text-sm font-bold text-sw-blue">
          {t('app.common.backToLearn')}
        </Link>
      </div>
    </main>
  )
}
