import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { M365_SCREENS } from '@/funnels/master-ai-microsoft-365/data/screens'

export default function M365QuizPage() {
  return (
    <MasterFunnelPage
      kind="m365"
      funnelId="master-ai-microsoft-365"
      pageTitle="Master AI for Microsoft 365 — MindoraAcademy.com | Word, Excel, PowerPoint, Outlook & Teams"
      screens={M365_SCREENS}
    />
  )
}
