import { withLocale } from '../../../authorisation/src/i18n/locale'
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
  const additional = copy.sections.additional
  const rights = copy.sections.rights
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
          <p>
            {copy.intro.p1Start}
            <a href={COMPANY.website} className="text-sw-blue hover:underline">
              {COMPANY.websiteHost}
            </a>
            {copy.intro.p1End}
          </p>
          <p>{copy.sections.processing.intro}</p>
          {copy.processors.map((processor) => (
            <Processor
              key={processor.title}
              title={processor.title}
              data={processor.data}
              personalDataLabel={copy.personalDataLabel}
            />
          ))}
          <p>
            {copy.sections.processing.afterProcessorsBeforeLink}
            <Link to={withLocale(locale, ROUTES.cookie)} className="text-sw-blue hover:underline">
              {nav.cookies}
            </Link>
            {copy.sections.processing.afterProcessorsAfterLink}
          </p>
        </LegalSection>

        <LegalSection title={copy.sections.optOut.title}>
          <p>
            {copy.sections.optOut.beforeLink}
            <Link to={withLocale(locale, ROUTES.cookie)} className="text-sw-blue hover:underline">
              {nav.cookies}
            </Link>
            {copy.sections.optOut.afterLink}
          </p>
        </LegalSection>

        <LegalSection title={additional.title}>
          <h3 className="font-semibold text-sw-dark">{additional.directCollectTitle}</h3>
          <p>{additional.directCollectBody}</p>
          <h3 className="font-semibold text-sw-dark">{additional.onlineSaleTitle}</h3>
          <p>{additional.onlineSaleBody}</p>
          <h3 className="font-semibold text-sw-dark">{additional.marketingTitle}</h3>
          <p>{additional.marketingBody}</p>
          <h3 className="font-semibold text-sw-dark">{additional.retentionTitle}</h3>
          <p>{additional.retentionBody}</p>
          <h3 className="font-semibold text-sw-dark">{additional.securityTitle}</h3>
          <p>{additional.securityBody}</p>
          <h3 className="font-semibold text-sw-dark">{additional.breachTitle}</h3>
          <p>{additional.breachBody}</p>
        </LegalSection>

        <LegalSection title={copy.sections.legalBases.title}>
          <p>{copy.sections.legalBases.body}</p>
        </LegalSection>

        <LegalSection title={copy.sections.transfers.title}>
          <p>{copy.sections.transfers.body}</p>
        </LegalSection>

        <LegalSection title={rights.title}>
          <p>{rights.intro}</p>
          <ul className="list-disc space-y-2 pl-5">
            {rights.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {rights.exerciseBeforeEmail}
            <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
              {COMPANY.email}
            </a>
            {rights.exerciseAfterEmail}
            <a
              href="https://www.ico.org.uk"
              className="text-sw-blue hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {rights.icoUrl}
            </a>
            {rights.exerciseEnd}
          </p>
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
            <Link to={withLocale(locale, ROUTES.cookie)} className="text-sw-blue hover:underline">
              {nav.cookies}
            </Link>{' '}
            {copy.sections.contact.relatedSeparator}{' '}
            <Link to={withLocale(locale, ROUTES.terms)} className="text-sw-blue hover:underline">
              {nav.terms}
            </Link>{' '}
            {copy.sections.contact.relatedSeparator}{' '}
            <Link to={withLocale(locale, ROUTES.contact)} className="text-sw-blue hover:underline">
              {nav.contact}
            </Link>
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
