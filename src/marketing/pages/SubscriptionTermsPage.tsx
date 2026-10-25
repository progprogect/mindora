import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { ROUTES } from '@/marketing/data/nav'
import { MONEY_BACK_CHIP, MONEY_BACK_DAYS } from '@/marketing/data/moneyBack'
import {
  subscriptionTermsPageCopy,
  type SubscriptionTermsBlock,
  type SubscriptionTermsInlinePart,
  type SubscriptionTermsLinkRoute,
  type SubscriptionTermsParagraphContent,
} from '@/marketing/data/subscriptionTerms'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

const SUBSCRIPTION_LINK_ROUTES: Record<SubscriptionTermsLinkRoute, string> = {
  terms: ROUTES.terms,
  privacy: ROUTES.privacy,
  refund: ROUTES.refund,
  support: ROUTES.support,
}

function renderInlineParts(parts: SubscriptionTermsInlinePart[]): ReactNode {
  return parts.map((part, index) => {
    switch (part.kind) {
      case 'text':
        return <Fragment key={index}>{part.value}</Fragment>
      case 'link':
        return (
          <Link key={index} to={SUBSCRIPTION_LINK_ROUTES[part.route]} className="text-sw-blue hover:underline">
            {part.label}
          </Link>
        )
      case 'moneyBackChip':
        return <Fragment key={index}>{MONEY_BACK_CHIP}</Fragment>
      case 'moneyBackDays':
        return <Fragment key={index}>{MONEY_BACK_DAYS}</Fragment>
      case 'strong':
        return (
          <strong key={index} className="text-sw-dark">
            {part.value}
          </strong>
        )
      case 'email':
        return (
          <a key={index} href={`mailto:${part.address}`} className="text-sw-blue hover:underline">
            {part.address}
          </a>
        )
      case 'supportLink':
        return (
          <Link key={index} to={ROUTES.support} className="text-sw-blue hover:underline">
            {part.label}
          </Link>
        )
      default:
        return null
    }
  })
}

function renderContent(content: SubscriptionTermsParagraphContent): ReactNode {
  if (typeof content === 'string') {
    return content
  }
  return renderInlineParts(content)
}

function renderBlock(block: SubscriptionTermsBlock): ReactNode {
  switch (block.kind) {
    case 'p':
      return <p>{renderContent(block.content)}</p>
    case 'ul':
      return (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index}>{renderContent(item)}</li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function SubscriptionTermsPage() {
  const { locale } = useI18n()
  const copy = subscriptionTermsPageCopy(locale)
  usePageTitle(copy.pageTitle)

  return (
    <>
      <LegalHero title={copy.heroTitle} updated={copy.heroUpdated} />
      <LegalCard>
        <p className="leading-relaxed text-sw-grey">{renderContent(copy.intro)}</p>
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
