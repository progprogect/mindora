import { LegalCard, LegalHero } from '@/marketing/components/LegalBlocks'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us — Mindora Academy')

  return (
    <>
      <LegalHero
        kicker="Company"
        title="About Us"
        subtitle={
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/60">
            Mindora Academy is an online educational platform focused on helping people understand
            and use artificial intelligence in a simple, practical, and effective way.
          </p>
        }
      />
      <LegalCard>
        <div className="space-y-4 leading-relaxed text-sw-grey">
          <p>
            We offer educational materials, practical resources, and a growing knowledge base of
            ready-to-use AI prompts that can help users save time, improve productivity, automate
            everyday tasks, and get better results from AI tools.
          </p>
          <p>
            Our platform is designed for both beginners who are taking their first steps into the
            world of artificial intelligence and experienced users who want to expand their
            knowledge and discover new ways to apply AI in their work and everyday life.
          </p>
          <p>
            At Mindora Academy, we believe that AI should be accessible to everyone. Our mission is
            to make learning artificial intelligence easier by providing clear educational content,
            useful resources, and practical tools that users can apply immediately.
          </p>
          <p>
            We are constantly expanding our library and developing new materials to help our
            community stay up to date with the rapidly evolving world of artificial intelligence.
          </p>
        </div>
      </LegalCard>
    </>
  )
}
