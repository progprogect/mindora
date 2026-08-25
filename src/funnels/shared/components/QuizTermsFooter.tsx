import { Link } from 'react-router-dom'

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
  const termsTo = brokenLegal ? '/terms' : '/terms-and-conditions'
  const privacyTo = brokenLegal ? '/privacy' : '/privacy-policy'

  return (
    <div className={className}>
      <p className="text-[11px] leading-relaxed text-sw-grey">
        By proceeding, you agree {agreeWith ? 'with' : 'to the'}{' '}
        <Link to={termsTo} className="text-sw-blue underline hover:text-sw-blue-hover">
          Terms and Conditions
        </Link>
        ,{' '}
        <Link to={privacyTo} className="text-sw-blue underline hover:text-sw-blue-hover">
          Privacy Policy
        </Link>
        ,{' '}
        <Link to="/subscription-terms" className="text-sw-blue underline hover:text-sw-blue-hover">
          Subscription Terms
        </Link>
      </p>
      {merchant ? (
        <p className="mt-2 text-[11px] text-sw-grey">ClickTech Solutions LTD. T/A. SuccessWise.</p>
      ) : null}
    </div>
  )
}
