import { Link } from 'react-router-dom'

export default function QuizTermsFooter() {
  return (
    <p className="mt-4 text-center text-[11px] leading-relaxed text-sw-grey">
      By proceeding, you agree to the{' '}
      <Link to="/terms-and-conditions" className="underline text-sw-blue hover:text-sw-blue-hover">
        Terms and Conditions
      </Link>
      ,{' '}
      <Link to="/privacy-policy" className="underline text-sw-blue hover:text-sw-blue-hover">
        Privacy Policy
      </Link>
      ,{' '}
      <Link to="/subscription-terms" className="underline text-sw-blue hover:text-sw-blue-hover">
        Subscription Terms
      </Link>
    </p>
  )
}
