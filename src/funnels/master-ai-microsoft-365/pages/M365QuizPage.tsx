import { useMemo } from 'react'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { getM365Screens } from '@/funnels/master-ai-microsoft-365/data/screens'
import { m365PageTitle } from '@/funnels/master-ai-microsoft-365/data/screenCopy'

export default function M365QuizPage() {
  const { locale } = useI18n()
  const screens = useMemo(() => getM365Screens(locale), [locale])
  const pageTitle = m365PageTitle(locale)

  return (
    <MasterFunnelPage
      kind="m365"
      funnelId="master-ai-microsoft-365"
      pageTitle={pageTitle}
      screens={screens}
    />
  )
}
