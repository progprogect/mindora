import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '@/marketing/data/company'
import {
  billingPageCopy,
  type BillingInlinePart,
  type BillingLinkRoute,
  type BillingText,
} from '@/marketing/data/billingPage'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

const BILLING_LINK_ROUTES: Record<BillingLinkRoute, string> = {
  terms: ROUTES.terms,
  refund: ROUTES.refund,
  privacy: ROUTES.privacy,
  contact: ROUTES.contact,
  support: ROUTES.support,
}

function renderInline(parts: BillingInlinePart[]): ReactNode {
  return parts.map((part, index) => {
    switch (part.kind) {
      case 'text':
        return <Fragment key={index}>{part.value}</Fragment>
      case 'link':
        return (
          <Link key={index} to={BILLING_LINK_ROUTES[part.route]} className="font-medium text-sw-blue hover:underline">
            {part.label}
          </Link>
        )
      case 'supportChat':
        return (
          <Link
            key={index}
            to={`${ROUTES.support}?chat=open`}
            className="font-medium text-sw-blue hover:underline"
          >
            {part.label}
          </Link>
        )
      case 'email':
        return (
          <a key={index} href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
            {COMPANY.email}
          </a>
        )
      case 'strong':
        return (
          <strong key={index} className="text-sw-dark">
            {part.value}
          </strong>
        )
      case 'serviceName':
        return <Fragment key={index}>{COMPANY.serviceName}</Fragment>
      default:
        return null
    }
  })
}

function renderText(text: BillingText): ReactNode {
  if (typeof text === 'string') {
    return text
  }
  return renderInline(text)
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-sw-blue">✓</span> {children}
    </li>
  )
}

export default function BillingPage() {
  const { locale } = useI18n()
  const copy = billingPageCopy(locale)
  usePageTitle(copy.pageTitle)

  return (
    <>
      <section className="bg-sw-dark px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">{copy.heroKicker}</p>
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{copy.heroTitle}</h1>
          <p className="mx-auto max-w-xl text-base text-white/70">{renderText(copy.heroSubtitle)}</p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-2 text-xl font-bold text-sw-dark sm:text-2xl">{copy.subscriptionTitle}</h2>
            <p className="mb-4 text-sw-grey">{renderText(copy.subscriptionIntro)}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.plans.map((plan) => {
                const borderStyle =
                  plan.variant === 'popular'
                    ? { borderColor: 'hsl(var(--sw-blue))' }
                    : plan.variant === 'value'
                      ? { borderColor: 'hsl(var(--sw-success))' }
                      : undefined
                const badgeStyle =
                  plan.variant === 'popular'
                    ? { backgroundColor: 'hsl(var(--sw-blue))' }
                    : plan.variant === 'value'
                      ? { backgroundColor: 'hsl(var(--sw-success))' }
                      : undefined

                return (
                  <div
                    key={plan.label}
                    className={
                      plan.variant === 'default'
                        ? 'rounded-2xl border border-sw-grey-border p-5'
                        : 'relative rounded-2xl border-2 p-5'
                    }
                    style={borderStyle}
                  >
                    {plan.badge ? (
                      <div
                        className="absolute -top-3 left-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                        style={badgeStyle}
                      >
                        {plan.badge}
                      </div>
                    ) : null}
                    <p className="mb-2 text-sm font-semibold tracking-wide text-sw-grey uppercase">{plan.label}</p>
                    <p className="mb-4 text-sm text-sw-grey">{plan.description}</p>
                    <ul className="space-y-2 text-sm text-sw-grey">
                      {plan.features.map((item) => (
                        <CheckItem key={item}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-sw-grey">{copy.subscriptionFootnote}</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-2 text-xl font-bold text-sw-dark sm:text-2xl">{copy.oneTimeTitle}</h2>
            <p className="mb-4 text-sw-grey">{copy.oneTimeIntro}</p>
            <ul className="space-y-2 text-sm text-sw-grey">
              {copy.oneTimeFeatures.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="border-b border-sw-grey-border pb-3 text-xl font-bold text-sw-dark sm:text-2xl">
              {copy.faqTitle}
            </h2>
            {copy.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 font-semibold text-sw-dark">{faq.question}</h3>
                <div className="space-y-2 leading-relaxed text-sw-grey">
                  <p>{renderText(faq.answer)}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'hsl(var(--sw-blue-light))' }}
          >
            <h3 className="mb-2 text-lg font-bold text-sw-dark">{copy.ctaTitle}</h3>
            <p className="mb-4 text-sm text-sw-grey">{copy.ctaBody}</p>
            <Link
              to={`${ROUTES.support}?chat=open`}
              className="inline-block rounded-full bg-sw-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sw-blue-hover"
            >
              {copy.ctaButton}
            </Link>
          </div>

          <p className="pb-4 text-center text-sm text-sw-grey">
            {copy.relatedLabel}{' '}
            {copy.relatedLinks.map((link, index) => (
              <Fragment key={link.route}>
                {index > 0 ? ' · ' : null}
                <Link to={BILLING_LINK_ROUTES[link.route]} className="text-sw-blue hover:underline">
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </p>
        </div>
      </main>
    </>
  )
}
