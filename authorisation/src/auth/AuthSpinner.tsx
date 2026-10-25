import { useI18n } from '@/i18n/I18nProvider'

export default function AuthSpinner({ message }: { message?: string }) {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sw-grey text-sm font-medium">{message ?? t('auth.loading')}</p>
      </div>
    </div>
  )
}
