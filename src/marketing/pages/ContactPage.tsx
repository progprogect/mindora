import { Link } from 'react-router-dom'
import { CompanyDetails, LegalCard, LegalHero } from '@/marketing/components/LegalBlocks'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact — Mindora Academy')

  return (
    <>
      <LegalHero kicker="Company" title="Contact" />
      <LegalCard>
        <CompanyDetails />
        <p className="text-sm text-sw-grey">
          Need help? →{' '}
          <Link to={ROUTES.support} className="font-medium text-sw-blue hover:underline">
            Help &amp; Support
          </Link>
        </p>
      </LegalCard>
    </>
  )
}
