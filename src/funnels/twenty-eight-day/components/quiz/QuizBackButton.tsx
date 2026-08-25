interface QuizBackButtonProps {
  onClick: () => void
}

/** Production back glyph: 18×18, stroke 2.5, path M19 12H5M12 5l-7 7 7 7. */
export default function QuizBackButton({ onClick }: QuizBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-sw-dark transition-colors hover:bg-sw-grey-light"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M19 12H5M12 5l-7 7 7 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
