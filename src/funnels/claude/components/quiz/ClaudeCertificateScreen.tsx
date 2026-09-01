import { Check } from 'lucide-react'
import AssetImage from '@/shared/components/AssetImage'

interface ClaudeCertificateScreenProps {
  onContinue: () => void
}

const CERTIFICATE_BULLETS = [
  'Official Claude AI mastery certification by MindoraAcademy.com',
  'Recognised credential for your CV and LinkedIn',
  'Validates real, practical AI skills — not just theory',
  'Complete in 7 days — 15 minutes per day',
]

/** Port of `n()` (`ClaudeCertificateScreen-*.js`) — certificate image + 4 checkmark bullets. */
export default function ClaudeCertificateScreen({ onContinue }: ClaudeCertificateScreenProps) {
  return (
    <div className="flex flex-1 flex-col animate-fade-up">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 pt-6 pb-44">
        <h2 className="mb-2 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">
          Earn your <span className="text-sw-blue">Claude AI</span>
          <br />
          Certificate of Mastery
        </h2>
        <p className="mb-5 max-w-xs text-center text-sm leading-relaxed text-sw-grey">
          Complete the learning plan and earn a certificate recognising your commitment to developing practical
          Claude AI skills.
        </p>

        <div className="mb-6 w-full max-w-sm overflow-hidden rounded-xl border border-sw-blue-border bg-sw-white p-2 shadow-lg">
          <AssetImage
            src="/assets/certificate.png"
            alt="Claude AI Certificate of Mastery"
            fallbackEmoji="🎓"
            className="h-auto w-full rounded-lg"
          />
        </div>

        <div className="w-full max-w-sm space-y-3">
          {CERTIFICATE_BULLETS.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-sw-blue">
                <Check className="size-3.5 text-sw-white" strokeWidth={3} />
              </span>
              <p className="text-sm leading-snug font-medium text-sw-dark">{bullet}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-md transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            CONTINUE →
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
