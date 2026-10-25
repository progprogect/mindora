import { Link } from 'react-router-dom'
import { CompanyDetails, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { privacyPolicyCopy } from '@/marketing/data/privacyPolicyCopy'
import { NAV_COPY, ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

function Processor({
  title,
  data,
  personalDataLabel,
}: {
  title: string
  data: string
  personalDataLabel: string
}) {
  return (
    <div className="rounded-xl bg-sw-grey-light p-5">
      <h3 className="mb-2 font-semibold text-sw-dark">{title}</h3>
      <p>
        <strong>{personalDataLabel}</strong> {data}
      </p>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  const { locale } = useI18n()
  const copy = privacyPolicyCopy(locale)
  const nav = NAV_COPY[locale]
  usePageTitle(copy.pageTitle)

  return (
    <>
      <LegalHero
        kicker={copy.kicker}
        title={copy.heroTitle}
        updated={locale === 'en' ? copy.updatedDate : undefined}
        subtitle={
          locale === 'ru' ? (
            <p className="text-sm text-white/60">{copy.lastUpdatedLine}</p>
          ) : undefined
        }
      />
      <LegalCard>
        <LegalSection title={copy.sections.processing.title}>
          <p>{copy.sections.processing.intro}</p>
          {copy.processors.map((processor) => (
            <Processor
              key={processor.title}
              title={processor.title}
              data={processor.data}
              personalDataLabel={copy.personalDataLabel}
            />
          ))}
        </LegalSection>

        <LegalSection title={copy.sections.optOut.title}>
          <p>
            {copy.sections.optOut.beforeLink}
            <Link to={ROUTES.cookie} className="text-sw-blue hover:underline">
              {nav.cookies}
            </Link>
            {copy.sections.optOut.afterLink}
          </p>
        </LegalSection>

        <LegalSection title={copy.sections.additional.title}>
          <h3 className="font-semibold text-sw-dark">{copy.sections.additional.retentionTitle}</h3>
          <p>{copy.sections.additional.retentionBody}</p>
          <h3 className="font-semibold text-sw-dark">{copy.sections.additional.onlineSaleTitle}</h3>
          <p>{copy.sections.additional.onlineSaleBody}</p>
        </LegalSection>

        <LegalSection title={copy.sections.legalBases.title}>
          <p>{copy.sections.legalBases.body}</p>
        </LegalSection>

        <LegalSection title={copy.sections.transfers.title}>
          <p>{copy.sections.transfers.body}</p>
        </LegalSection>

        <LegalSection title={copy.sections.contact.title}>
          <p>
            <strong className="text-sw-dark">{copy.sections.contact.dataControllerLabel}</strong>{' '}
            {COMPANY.legalName}
          </p>
          <p>
            <strong className="text-sw-dark">{copy.sections.contact.dataProcessorLabel}</strong>{' '}
            {copy.sections.contact.dataProcessorBody}
          </p>
          <p>{copy.sections.contact.jurisdictionsBody}</p>
          <p>{copy.sections.contact.lawBody}</p>
          <CompanyDetails />
          <p>
            {copy.sections.contact.relatedPrefix}{' '}
            <Link to={ROUTES.cookie} className="text-sw-blue hover:underline">
              {nav.cookies}
            </Link>{' '}
            {copy.sections.contact.relatedSeparator}{' '}
            <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
              {nav.terms}
            </Link>{' '}
            {copy.sections.contact.relatedSeparator}{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              {nav.contact}
            </Link>
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
