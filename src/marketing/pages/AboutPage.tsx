import { LegalCard, LegalHero } from '@/marketing/components/LegalBlocks'
import { companyPagesCopy } from '@/marketing/data/company'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function AboutPage() {
  const { locale } = useI18n()
  const copy = companyPagesCopy(locale).about
  usePageTitle(copy.pageTitle)

  return (
    <>
      <LegalHero
        kicker={copy.kicker}
        title={copy.title}
        subtitle={
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/60">{copy.subtitle}</p>
        }
      />
      <LegalCard>
        <div className="space-y-4 leading-relaxed text-sw-grey">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </LegalCard>
    </>
  )
}
