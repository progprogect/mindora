import { Link } from 'react-router-dom'
import { CompanyBox, LegalCard, LegalHero } from '@/marketing/components/LegalBlocks'
import { COMPANY, companyPagesCopy } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function ContactPage() {
  const { locale } = useI18n()
  const copy = companyPagesCopy(locale).contact
  usePageTitle(copy.pageTitle)

  return (
    <>
      <LegalHero kicker={copy.kicker} title={copy.title} />
      <LegalCard>
        <CompanyBox>
          <dl className="space-y-1.5 text-sm text-sw-grey">
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.legalEntity} </dt>
              <dd className="inline">{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.registration} </dt>
              <dd className="inline">{COMPANY.registration}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.companyNumber} </dt>
              <dd className="inline">{COMPANY.companyNumber}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.address} </dt>
              <dd className="inline">{COMPANY.address}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.serviceName} </dt>
              <dd className="inline">{COMPANY.serviceName}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.contactEmail} </dt>
              <dd className="inline">
                <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-sw-dark">{copy.details.website} </dt>
              <dd className="inline">
                <a
                  href={COMPANY.website}
                  className="text-sw-blue hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {COMPANY.website}
                </a>
              </dd>
            </div>
          </dl>
        </CompanyBox>
        <p className="text-sm text-sw-grey">
          {copy.needHelp}{' '}
          <Link to={ROUTES.support} className="font-medium text-sw-blue hover:underline">
            {copy.helpLink}
          </Link>
        </p>
      </LegalCard>
    </>
  )
}
