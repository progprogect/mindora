import { useMemo } from 'react'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { getPptScreens } from '@/funnels/master-ai-for-powerpoint/data/screens'
import { pptPageTitle } from '@/funnels/master-ai-for-powerpoint/data/screenCopy'

export default function PptQuizPage() {
  const { locale } = useI18n()
  const screens = useMemo(() => getPptScreens(locale), [locale])
  const pageTitle = pptPageTitle(locale)

  return (
    <MasterFunnelPage
      kind="ppt"
      funnelId="master-ai-for-powerpoint"
      pageTitle={pageTitle}
      screens={screens}
    />
  )
}
