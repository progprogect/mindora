import { useMemo } from 'react'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { getExcelScreens } from '@/funnels/master-claude-ai-excel/data/screens'
import { excelPageTitle } from '@/funnels/master-claude-ai-excel/data/screenCopy'

export default function ExcelQuizPage() {
  const { locale } = useI18n()
  const screens = useMemo(() => getExcelScreens(locale), [locale])
  const pageTitle = excelPageTitle(locale)

  return (
    <MasterFunnelPage
      kind="excel"
      funnelId="master-claude-ai-excel"
      pageTitle={pageTitle}
      screens={screens}
    />
  )
}
