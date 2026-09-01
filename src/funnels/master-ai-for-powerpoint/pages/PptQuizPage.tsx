import MasterFunnelPage from '@/funnels/shared/pages/MasterFunnelPage'
import { PPT_SCREENS } from '@/funnels/master-ai-for-powerpoint/data/screens'

export default function PptQuizPage() {
  return (
    <MasterFunnelPage
      kind="ppt"
      funnelId="master-ai-for-powerpoint"
      pageTitle="Master AI for PowerPoint — MindoraAcademy.com | Build Decks in Minutes"
      screens={PPT_SCREENS}
    />
  )
}
