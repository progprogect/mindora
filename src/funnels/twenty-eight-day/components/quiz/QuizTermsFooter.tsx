import { Link } from 'react-router-dom'

export default function QuizTermsFooter() {
  return (
    <p className="mt-4 text-center text-[11px] leading-relaxed text-sw-grey">
      By continuing you agree to our{' '}
      <Link to="/terms-and-conditions" className="underline hover:text-sw-dark">
        Terms
      </Link>
      ,{' '}
      <Link to="/privacy-policy" className="underline hover:text-sw-dark">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link to="/subscription-terms" className="underline hover:text-sw-dark">
        Subscription Terms
      </Link>
      .
    </p>
  )
}
