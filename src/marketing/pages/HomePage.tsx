import HeroSection from '@/marketing/sections/HeroSection'
import MarqueeSection from '@/marketing/sections/MarqueeSection'
import StatsSection from '@/marketing/sections/StatsSection'
import ProblemSection from '@/marketing/sections/ProblemSection'
import FeaturesSection from '@/marketing/sections/FeaturesSection'
import HowItWorksSection from '@/marketing/sections/HowItWorksSection'
import AiCoachSection from '@/marketing/sections/AiCoachSection'
import SuccessStoriesSection from '@/marketing/sections/SuccessStoriesSection'
import MoneyBackSection from '@/marketing/sections/MoneyBackSection'
import FinalCtaSection from '@/marketing/sections/FinalCtaSection'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('SuccessWise.ai — Turn Daily Learning Into Daily Progress')

  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiCoachSection />
      <SuccessStoriesSection />
      <MoneyBackSection />
      <FinalCtaSection />
    </main>
  )
}
