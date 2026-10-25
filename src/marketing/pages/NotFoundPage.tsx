import { companyPagesCopy } from '@/marketing/data/company'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function NotFoundPage() {
  const { locale } = useI18n()
  const copy = companyPagesCopy(locale).notFound

  return (
    <main className="flex min-h-screen items-center justify-center bg-sw-grey-light px-4">
      <div className="max-w-md text-center">
        <p className="mb-4 text-6xl font-extrabold text-sw-blue">404</p>
        <h1 className="mb-2 text-2xl font-bold text-sw-dark">{copy.title}</h1>
        <p className="mb-8 text-sw-grey">{copy.description}</p>
      </div>
    </main>
  )
}
