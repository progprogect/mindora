import { Link } from 'react-router-dom'

/** Port of the identity-screen legal footer — matches production copy verbatim. */
export default function QuizTermsFooter() {
  return (
    <div className="mt-4 px-4 text-center">
      <p className="text-[11px] leading-relaxed text-sw-grey">
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
      <p className="mt-2 text-[11px] text-sw-grey">Scalion Ltd T/A. MindoraAcademy.com</p>
    </div>
  )
}
