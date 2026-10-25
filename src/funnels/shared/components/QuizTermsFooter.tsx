import { Link } from 'react-router-dom'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import { funnelUiCopy } from '@/funnels/shared/i18n/funnelUiCopy'

interface QuizTermsFooterProps {
  /** Master-* identity uses 404 `/terms` and `/privacy` — copy as on prod. */
  brokenLegal?: boolean
  agreeWith?: boolean
  merchant?: boolean
  className?: string
}

export default function QuizTermsFooter({
  brokenLegal = false,
  agreeWith = false,
  merchant = false,
  className = 'mt-4 px-2 text-center',
}: QuizTermsFooterProps) {
  const { locale } = useI18n()
  const ui = funnelUiCopy(locale)
  const termsTo = brokenLegal ? '/terms' : '/terms-and-conditions'
  const privacyTo = brokenLegal ? '/privacy' : '/privacy-policy'

  return (
    <div className={className}>
      <p className="text-[11px] leading-relaxed text-sw-grey">
        {ui.termsAgreePrefix(agreeWith)}{' '}
        <Link to={termsTo} className="text-sw-blue underline hover:text-sw-blue-hover">
          {ui.termsAndConditions}
        </Link>
        ,{' '}
        <Link to={privacyTo} className="text-sw-blue underline hover:text-sw-blue-hover">
          {ui.privacyPolicy}
        </Link>
        ,{' '}
        <Link to="/subscription-terms" className="text-sw-blue underline hover:text-sw-blue-hover">
          {ui.subscriptionTerms}
        </Link>
      </p>
      {merchant ? <p className="mt-2 text-[11px] text-sw-grey">{ui.merchantLine}</p> : null}
    </div>
  )
}
