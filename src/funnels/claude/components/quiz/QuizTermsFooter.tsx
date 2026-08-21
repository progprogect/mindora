import { Link } from 'react-router-dom'

/** Port of the identity-screen legal footer — matches production copy verbatim. */
export default function QuizTermsFooter() {
  return (
    <div className="mt-4 space-y-1 text-center">
      <p className="text-[11px] leading-relaxed text-sw-grey">
        By proceeding, you agree to the{' '}
        <Link to="/terms-and-conditions" className="underline hover:text-sw-dark">
          Terms and Conditions
        </Link>
        ,{' '}
        <Link to="/privacy-policy" className="underline hover:text-sw-dark">
          Privacy Policy
        </Link>
        ,{' '}
        <Link to="/subscription-terms" className="underline hover:text-sw-dark">
          Subscription Terms
        </Link>
      </p>
      <p className="text-[11px] text-sw-grey">ClickTech Solutions LTD. T/A. SuccessWise.</p>
    </div>
  )
}
