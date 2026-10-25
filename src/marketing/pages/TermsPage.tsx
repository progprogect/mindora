import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CompanyDetails, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import { MONEY_BACK_DAYS } from '@/marketing/data/moneyBack'
import {
  termsPageCopy,
  type TermsBlock,
  type TermsInlinePart,
  type TermsLinkRoute,
  type TermsParagraphContent,
} from '@/marketing/data/terms'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

const TERMS_LINK_ROUTES: Record<TermsLinkRoute, string> = {
  privacy: ROUTES.privacy,
  billing: ROUTES.billing,
  refund: ROUTES.refund,
  cookie: ROUTES.cookie,
  contact: ROUTES.contact,
  terms: ROUTES.terms,
}

function renderInlineParts(parts: TermsInlinePart[], strongClassName?: string): ReactNode {
  return parts.map((part, index) => {
    switch (part.kind) {
      case 'text':
        return <Fragment key={index}>{part.value}</Fragment>
      case 'extWebsite':
        return (
          <a
            key={index}
            href={COMPANY.website}
            className="text-sw-blue hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {COMPANY.website}
          </a>
        )
      case 'moneyBackDays':
        return <Fragment key={index}>{MONEY_BACK_DAYS}</Fragment>
      case 'link':
        return (
          <Link key={index} to={TERMS_LINK_ROUTES[part.route]} className="text-sw-blue hover:underline">
            {part.label}
          </Link>
        )
      case 'strong':
        return (
          <strong key={index} className={strongClassName ?? 'text-sw-dark'}>
            {part.value}
          </strong>
        )
      default:
        return null
    }
  })
}

function renderParagraphContent(content: TermsParagraphContent): ReactNode {
  if (typeof content === 'string') {
    return content
  }
  return renderInlineParts(content)
}

function renderBlock(block: TermsBlock): ReactNode {
  switch (block.kind) {
    case 'companyDetails':
      return <CompanyDetails />
    case 'h3':
      return <h3 className="font-semibold text-sw-dark">{block.text}</h3>
    case 'ul':
      return (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index}>{renderParagraphContent(item)}</li>
          ))}
        </ul>
      )
    case 'p':
      return <p>{renderParagraphContent(block.content)}</p>
    default:
      return null
  }
}

export default function TermsPage() {
  const { locale } = useI18n()
  const copy = termsPageCopy(locale)
  usePageTitle(copy.pageTitle)

  return (
    <>
      <LegalHero title={copy.heroTitle} />
      <LegalCard>
        {copy.sections.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            {section.blocks.map((block, index) => (
              <Fragment key={`${section.title}-${index}`}>{renderBlock(block)}</Fragment>
            ))}
          </LegalSection>
        ))}
      </LegalCard>
    </>
  )
}
