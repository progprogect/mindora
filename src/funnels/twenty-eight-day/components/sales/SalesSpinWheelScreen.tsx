import { useMemo, useRef, useState } from 'react'
import { PartyPopper } from 'lucide-react'

interface SalesSpinWheelScreenProps {
  onFinish: (percentOff: number) => void
}

interface WheelSegment {
  label: string
  color: string
  isPrize?: boolean
  percentOff: number
}

const SEGMENTS: WheelSegment[] = [
  { label: '10%', color: 'hsl(var(--sw-grey-light))', percentOff: 10 },
  { label: '97%', color: 'hsl(var(--sw-blue))', isPrize: true, percentOff: 97 },
  { label: '20%', color: 'hsl(var(--sw-grey-light))', percentOff: 20 },
  { label: '30%', color: 'hsl(var(--sw-amber-light))', percentOff: 30 },
  { label: '50%', color: 'hsl(var(--sw-grey-light))', percentOff: 50 },
  { label: '15%', color: 'hsl(var(--sw-amber-light))', percentOff: 15 },
  { label: '25%', color: 'hsl(var(--sw-grey-light))', percentOff: 25 },
  { label: '40%', color: 'hsl(var(--sw-amber-light))', percentOff: 40 },
]

const SEGMENT_ANGLE = 360 / SEGMENTS.length
const SPIN_DURATION_MS = 4400
const EXTRA_SPINS = 5

function computeFinalRotation(): number {
  const prizeIndex = SEGMENTS.findIndex((s) => s.isPrize)
  const centerAngle = prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
  const alignRotation = (360 - centerAngle) % 360
  return EXTRA_SPINS * 360 + alignRotation
}

const conicGradient = `conic-gradient(${SEGMENTS.map(
  (s, i) => `${s.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`,
).join(', ')})`

export default function SalesSpinWheelScreen({ onFinish }: SalesSpinWheelScreenProps) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const finalRotation = useRef(computeFinalRotation())

  const handleSpin = () => {
    if (spinning || showPopup) return
    setSpinning(true)
    setRotation(finalRotation.current)
    window.setTimeout(() => {
      setSpinning(false)
      setShowPopup(true)
    }, SPIN_DURATION_MS)
  }

  const labelPositions = useMemo(
    () =>
      SEGMENTS.map((s, i) => ({
        ...s,
        angle: i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2,
      })),
    [],
  )

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-8 py-4 text-center animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-sw-dark">Spin to unlock your discount</h1>
        <p className="mt-2 text-sm text-sw-grey">One free spin — every spin wins a discount.</p>
      </div>

      <div className="relative flex size-64 items-center justify-center">
        <div className="absolute -top-1 z-10 h-6 w-6 rotate-45 border-t-4 border-l-4 border-sw-dark" />

        <div
          className="relative size-64 rounded-full border-4 border-sw-dark shadow-sw-lg"
          style={{
            background: conicGradient,
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.19, 1, 0.22, 1)` : 'none',
          }}
        >
          {labelPositions.map((s) => (
            <span
              key={s.label}
              className="absolute top-1/2 left-1/2 origin-left text-sm font-extrabold text-sw-dark"
              style={{ transform: `rotate(${s.angle}deg) translateX(2.2rem)` }}
            >
              {s.label}
            </span>
          ))}
        </div>

        <div className="absolute flex size-14 items-center justify-center rounded-full border-4 border-sw-white bg-sw-dark text-lg">
          🎯
        </div>
      </div>

      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning || showPopup}
        className="w-full max-w-xs animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {spinning ? 'SPINNING…' : 'SPIN THE WHEEL'}
      </button>

      {showPopup ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-sw-dark/40 sm:items-center">
          <div className="w-full max-w-sm animate-slide-up rounded-t-sw border border-sw-border bg-sw-white p-6 text-center shadow-sw-lg sm:rounded-sw">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-sw-blue-light">
              <PartyPopper className="size-7 text-sw-blue" />
            </div>
            <h2 className="text-xl font-extrabold text-sw-dark">You won 97% OFF!</h2>
            <p className="mt-2 text-sm text-sw-grey">
              This is the best discount we offer — claim it now before it expires.
            </p>
            <button
              type="button"
              onClick={() => onFinish(97)}
              className="mt-5 w-full rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
            >
              Claim My Discount
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
