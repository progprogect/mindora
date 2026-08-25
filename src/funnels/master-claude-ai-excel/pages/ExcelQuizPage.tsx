import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { EXCEL_SCREENS } from '@/funnels/master-claude-ai-excel/data/screens'

export default function ExcelQuizPage() {
  return (
    <MasterFunnelPage
      kind="excel"
      funnelId="master-claude-ai-excel"
      pageTitle="Master Claude AI for Excel — SuccessWise.ai | Save 5+ Hours/Week"
      screens={EXCEL_SCREENS}
    />
  )
}
