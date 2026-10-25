import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'

export default function NotFoundPage() {
  const { t } = useI18n()
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}
    >
      <div className="text-center max-w-md">
        <p className="text-6xl font-extrabold text-sw-blue mb-4">404</p>
        <h1 className="text-2xl font-bold text-sw-dark mb-2">{t('auth.notFoundTitle')}</h1>
        <p className="text-sw-grey mb-8">{t('auth.notFoundBody')}</p>
        <Link
          to="/"
          className="inline-block bg-sw-blue hover:bg-sw-blue-hover text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {t('auth.backToHome')}
        </Link>
      </div>
    </div>
  )
}
