import { useEffect, useRef, useState } from 'react'
import QuizStickyCta from '@/funnels/shared/components/QuizStickyCta'

interface SpinWheelScreenProps {
  name: string | null
  subtitle: string
  onFinish: (percentOff: number) => void
}

interface WheelSegment {
  label: string
  colorA: boolean
  percentOff: number
  isPrize?: boolean
}

const SEGMENTS: WheelSegment[] = [
  { label: '10%', colorA: true, percentOff: 10 },
  { label: '30%', colorA: false, percentOff: 30 },
  { label: '40%', colorA: true, percentOff: 40 },
  { label: '97%', colorA: false, percentOff: 97, isPrize: true },
  { label: '20%', colorA: true, percentOff: 20 },
  { label: '15%', colorA: false, percentOff: 15 },
]

const CENTER = 150
const OUTER_RING_RADIUS = 148
const WEDGE_RADIUS = 133
const DOT_RADIUS = 141
const LABEL_RADIUS = 82
const HUB_RADIUS = 14
const DOT_COUNT = 12
const FINAL_ROTATION = 1980
const SPIN_DURATION_MS = 4400
const PRIZE_PERCENT = 97

const CONFETTI: Array<{ x: number; y: number; r: number; w: number; h: number; c: string }> = [
  { x: 18, y: 42, r: 15, w: 8, h: 5, c: '#2563EB' },
  { x: 55, y: 18, r: -20, w: 6, h: 10, c: '#f59e0b' },
  { x: 78, y: 55, r: 30, w: 10, h: 4, c: '#10b981' },
  { x: 88, y: 22, r: -45, w: 7, h: 7, c: '#ef4444' },
  { x: 6, y: 70, r: 60, w: 9, h: 4, c: '#8b5cf6' },
  { x: 30, y: 80, r: -10, w: 5, h: 9, c: '#f97316' },
  { x: 72, y: 75, r: 50, w: 8, h: 5, c: '#2563EB' },
  { x: 92, y: 58, r: -30, w: 6, h: 6, c: '#f59e0b' },
  { x: 15, y: 30, r: 70, w: 4, h: 8, c: '#10b981' },
  { x: 45, y: 90, r: -55, w: 10, h: 4, c: '#ec4899' },
  { x: 40, y: 10, r: 40, w: 8, h: 4, c: '#8b5cf6' },
  { x: 96, y: 40, r: -65, w: 6, h: 7, c: '#f97316' },
  { x: 25, y: 55, r: 80, w: 9, h: 4, c: '#f59e0b' },
  { x: 70, y: 10, r: -35, w: 4, h: 9, c: '#10b981' },
  { x: 10, y: 90, r: -80, w: 8, h: 4, c: '#ef4444' },
]

function toRadians(angleDeg: number): number {
  return ((angleDeg - 90) * Math.PI) / 180
}

function pointOnCircle(radius: number, angleDeg: number): { x: number; y: number } {
  const rad = toRadians(angleDeg)
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

function wedgePath(startAngle: number, endAngle: number): string {
  const start = pointOnCircle(WEDGE_RADIUS, startAngle)
  const end = pointOnCircle(WEDGE_RADIUS, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A ${WEDGE_RADIUS} ${WEDGE_RADIUS} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

function Wheel({ rotation, spinning }: { rotation: number; spinning: boolean }) {
  const dots = Array.from({ length: DOT_COUNT }).map((_, i) => pointOnCircle(DOT_RADIUS, (i * 360) / DOT_COUNT))
  const segmentAngle = 360 / SEGMENTS.length

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px] drop-shadow-xl" aria-hidden="true">
      <circle cx={CENTER} cy={CENTER} r={OUTER_RING_RADIUS} style={{ fill: 'hsl(var(--sw-blue))' }} />
      <g
        style={{
          transformOrigin: `${CENTER}px ${CENTER}px`,
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.19, 1, 0.22, 1)` : 'none',
        }}
      >
        {SEGMENTS.map((segment, i) => {
          const center = i * segmentAngle
          const labelPoint = pointOnCircle(LABEL_RADIUS, center)
          return (
            <g key={`${segment.label}-${i}`}>
              <path
                d={wedgePath(center - segmentAngle / 2, center + segmentAngle / 2)}
                style={{
                  fill: segment.colorA ? 'hsl(var(--sw-blue-light))' : 'rgb(208, 226, 251)',
                  stroke: 'hsl(var(--sw-blue-border))',
                  strokeWidth: 1,
                }}
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${center}, ${labelPoint.x.toFixed(2)}, ${labelPoint.y.toFixed(2)})`}
                style={{ fontSize: '14px', fontWeight: 800, fill: 'hsl(var(--sw-dark))' }}
              >
                <tspan x={labelPoint.x} dy="-7">
                  {segment.label}
                </tspan>
                <tspan x={labelPoint.x} dy="16" style={{ fontSize: '11px', fontWeight: 600 }}>
                  off
                </tspan>
              </text>
            </g>
          )
        })}
      </g>
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={6}
          style={{ fill: 'hsl(var(--sw-amber))', stroke: 'white', strokeWidth: 1.5 }}
        />
      ))}
      <circle cx={CENTER} cy={CENTER} r={HUB_RADIUS} style={{ fill: 'hsl(var(--sw-dark))' }} />
      <circle cx={CENTER} cy={CENTER} r={HUB_RADIUS - 5} style={{ fill: 'white' }} />
      <polygon points={`${CENTER},8 ${CENTER - 10},0 ${CENTER + 10},0`} style={{ fill: 'hsl(var(--sw-dark))' }} />
    </svg>
  )
}

function DiscountPopup({ name, onClaim }: { name: string | null; onClaim: () => void }) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-white px-6 pt-8 pb-10">
      <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-sw-grey-border" />
      <h2 className="mb-5 text-center text-3xl font-extrabold text-sw-dark">Woo hoo! 🥳</h2>
      <div className="relative mb-4 overflow-hidden rounded-2xl border border-sw-blue-border bg-sw-blue-light">
        {CONFETTI.map((piece, i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-sm opacity-80"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: piece.w,
              height: piece.h,
              background: piece.c,
              transform: `rotate(${piece.r}deg)`,
            }}
          />
        ))}
        <div className="relative z-10 py-7 text-center">
          <p className="mb-1 text-base font-bold text-sw-dark">
            {name ? `${name}, you won a discount` : 'You won a discount'}
          </p>
          <p className="text-5xl font-extrabold text-sw-blue">{PRIZE_PERCENT}% off</p>
        </div>
      </div>
      <p className="mb-6 text-center text-sm text-sw-grey">It will be applied automatically</p>
      <button type="button" onClick={onClaim} className="sw-cta font-extrabold tracking-wide uppercase">
        CLAIM MY DISCOUNT
      </button>
    </div>
  )
}

export default function SpinWheelScreen({ name, subtitle, onFinish }: SpinWheelScreenProps) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSpin = () => {
    if (spinning || finished) return
    setSpinning(true)
    setRotation(FINAL_ROTATION)
    timeoutRef.current = window.setTimeout(() => {
      setSpinning(false)
      setFinished(true)
      setShowPopup(true)
    }, SPIN_DURATION_MS)
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col overflow-x-hidden pb-32">
      <div className="mb-6 px-4 pt-8 text-center animate-fade-up">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Spin &amp; Unlock Your
          <br />
          <span className="text-sw-blue">Personal Discount!</span>
        </h1>
        <p className="text-sm text-sw-grey">{subtitle}</p>
      </div>

      <div className="flex cursor-pointer justify-center px-4 animate-fade-up" onClick={handleSpin}>
        <Wheel rotation={rotation} spinning={spinning} />
      </div>

      <QuizStickyCta zClass="z-30" compact>
        <button
          type="button"
          onClick={handleSpin}
          disabled={finished}
          className="sw-cta font-extrabold tracking-wider uppercase"
        >
          {finished ? 'YOU WON 97% OFF! 🎉' : spinning ? 'SPINNING…' : 'SPIN'}
        </button>
      </QuizStickyCta>

      {showPopup ? <DiscountPopup name={name} onClaim={() => onFinish(PRIZE_PERCENT)} /> : null}
    </div>
  )
}
