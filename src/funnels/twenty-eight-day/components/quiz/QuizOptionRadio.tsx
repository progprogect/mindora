interface QuizOptionRadioProps {
  selected: boolean
}

/** 24×24 radio disk used on Q1–Q18 and Q8 tools. Selected: blue fill + white check. */
export default function QuizOptionRadio({ selected }: QuizOptionRadioProps) {
  return (
    <div
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
        selected ? 'scale-110 border-sw-blue bg-sw-blue' : 'border-sw-grey-border bg-white'
      }`}
      aria-hidden
    >
      {selected ? (
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
        </svg>
      ) : null}
    </div>
  )
}
