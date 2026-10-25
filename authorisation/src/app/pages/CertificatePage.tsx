import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'

export default function CertificatePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-sw-grey-light pb-28">
      <header className="sticky top-0 z-30 border-b border-sw-grey-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3.5">
          <Link
            to="/app/certificates"
            aria-label={t('app.certificate.backAria')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sw-grey transition hover:bg-sw-grey-light"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="flex-1 truncate text-base font-bold text-sw-dark">{t('app.common.certificate')}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 pt-5">
        <div data-testid="certificate-not-found" className="rounded-2xl border border-sw-grey-border bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-sw-dark">{t('app.certificate.notFoundTitle')}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sw-grey">{t('app.certificate.notFoundBody')}</p>
          <Link
            to="/app/certificates"
            className="mt-6 inline-block rounded-full bg-sw-blue px-7 py-3.5 text-base font-semibold text-white transition hover:bg-sw-blue-hover"
          >
            {t('app.common.myCertificates')}
          </Link>
        </div>
      </main>
    </div>
  )
}
