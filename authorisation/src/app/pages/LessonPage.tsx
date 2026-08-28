import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getHub, isFlashcard, lessonXp, moduleLessonIds, type LessonCard } from '@/content/catalog'
import { useCourse } from '@/content/useCourse'
import { todayIso } from '@/content/lms'
import { completeLesson } from '@/lib/api'
import { useSession } from '@/auth/session'

type Stage = 'cards' | 'quizIntro' | 'quiz' | 'result'
type SlideDir = 'none' | 'forward' | 'back'

type CompletionData = {
  xpEarned: number
  newBadges: string[]
  newStreak: number
  dailyBonusApplied: boolean
}

const SWIPE_MIN = 40
const FOOTER_FADE = { background: 'linear-gradient(to bottom, rgba(255,255,255,0.85), white 20%)' }

const RESULT_BADGES: Record<string, { label: string; icon: string; desc: string }> = {
  'first-step': { label: 'First Step', icon: '👣', desc: 'Completed your first lesson!' },
  'on-fire': { label: 'On Fire', icon: '🔥', desc: '7-day learning streak!' },
  unstoppable: { label: 'Unstoppable', icon: '💥', desc: '30-day learning streak!' },
  'module-master': { label: 'Module Master', icon: '🏅', desc: 'Completed a full module!' },
  'course-graduate': { label: 'Course Graduate', icon: '🎓', desc: 'Completed the full course!' },
  'perfect-score': { label: 'Perfect Score', icon: '⭐', desc: '100% on a quiz!' },
  'week-warrior': { label: 'Week Warrior', icon: '🛡️', desc: '7 lessons in one week!' },
}

export default function LessonPage() {
  const { lessonId = '' } = useParams()
  return <LessonPlayer key={lessonId} />
}

function LessonPlayer() {
  const { slug = '', lessonId = '' } = useParams()
  const course = useCourse(slug)
  const lesson = course?.lessons.find((item) => item.id === lessonId)
  const { refresh } = useSession()
  const [stage, setStage] = useState<Stage>('cards')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [slide, setSlide] = useState<SlideDir>('none')
  const [animating, setAnimating] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [busy, setBusy] = useState(false)
  const [completion, setCompletion] = useState<CompletionData | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const navRef = useRef({ next: () => {}, prev: () => {} })

  const module = useMemo(
    () => course?.modules.find((item) => moduleLessonIds(course, item).includes(lessonId)),
    [course, lessonId],
  )

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [cardIndex, qIndex, stage])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (stage !== 'cards') return
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        navRef.current.next()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navRef.current.prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage])

  if (course === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  if (!course || !lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <p className="font-extrabold">Lesson not found</p>
          <Link to={`/app/courses/${slug}`} className="mt-3 inline-block font-bold text-sw-blue">
            Back to course
          </Link>
        </div>
      </main>
    )
  }

  const hub = getHub(slug)
  const unit = ((hub.unitLabel as string) || 'days') === 'days' ? 'Day' : 'Lesson'
  const cards = lesson.cards
  const quiz = lesson.quiz
  const card = cards[cardIndex]
  const cardCount = Math.max(cards.length, 1)
  const lastCard = cardIndex === cards.length - 1
  const lastQuestion = qIndex === quiz.length - 1
  const xpValue = lessonXp(lesson)
  const lessonIndex = course.lessons.findIndex((item) => item.id === lesson.id)
  const nextLesson = lessonIndex >= 0 ? course.lessons[lessonIndex + 1] : undefined
  const chromeCard = stage === 'quizIntro' || stage === 'result' ? Math.max(0, cards.length - 1) : cardIndex
  const pct =
    stage === 'quiz'
      ? Math.round(((qIndex + 1) / Math.max(quiz.length, 1)) * 100)
      : Math.round(((chromeCard + 1) / cardCount) * 100)

  const goPrevCard = () => {
    if (animating) return
    if (stage === 'quizIntro') {
      setStage('cards')
      return
    }
    if (cardIndex === 0) return
    setFlipped(false)
    setSlide('back')
    setAnimating(true)
    window.setTimeout(() => {
      setCardIndex((value) => Math.max(0, value - 1))
      setSlide('none')
      setAnimating(false)
    }, 220)
  }

  const goNextCard = () => {
    if (animating) return
    if (lastCard) {
      setStage(quiz.length ? 'quizIntro' : 'result')
      return
    }
    setFlipped(false)
    setSlide('forward')
    setAnimating(true)
    window.setTimeout(() => {
      setCardIndex((value) => value + 1)
      setSlide('none')
      setAnimating(false)
    }, 220)
  }

  const startQuiz = () => {
    setQIndex(0)
    setRevealed(false)
    setCorrectCount(0)
    setCompletion(null)
    setStage('quiz')
  }

  const pickOption = (correct: boolean) => {
    if (revealed) return
    setRevealed(true)
    if (correct) setCorrectCount((value) => value + 1)
  }

  const submitQuestion = () => {
    if (!revealed || busy) return
    if (!lastQuestion) {
      setQIndex((value) => value + 1)
      setRevealed(false)
      return
    }
    void finish(correctCount, quiz.length)
  }

  const finish = async (correct: number, total: number) => {
    setBusy(true)
    setStage('result')
    try {
      const payload = await completeLesson({
        courseSlug: slug,
        lessonSlug: lesson.id,
        xpValue,
        correct,
        total,
        localDate: todayIso(),
        moduleLessonSlugs: module ? moduleLessonIds(course, module) : undefined,
        totalLessons: course.lessons.length,
      })
      setCompletion({
        xpEarned: payload.xpEarned,
        newBadges: payload.newBadges,
        newStreak: payload.newStreak ?? payload.stats.streakCount,
        dailyBonusApplied: payload.dailyBonusApplied ?? false,
      })
      await refresh({ silent: true })
    } catch {
      setCompletion(null)
    } finally {
      setBusy(false)
    }
  }

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (!touchStart.current || stage !== 'cards') return
    const dx = event.changedTouches[0].clientX - touchStart.current.x
    const dy = event.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dy) > Math.abs(dx) * 1.5) return
    if (Math.abs(dx) < SWIPE_MIN) return
    if (dx < 0) goNextCard()
    else goPrevCard()
  }

  navRef.current = { next: goNextCard, prev: goPrevCard }

  const showQuizChrome = stage === 'quiz'
  const slideStyle =
    slide === 'none'
      ? {}
      : slide === 'forward'
        ? { opacity: 0, transform: 'translateX(-20px)' }
        : { opacity: 0, transform: 'translateX(20px)' }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          {showQuizChrome ? (
            <button
              type="button"
              aria-label="Exit quiz"
              onClick={() => setStage('quizIntro')}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-sw-grey-light transition-colors shrink-0"
            >
              <BackChevron />
            </button>
          ) : (
            <>
              <Link
                to="/app/dashboard"
                aria-label="Back to dashboard"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-sw-grey-light transition-colors shrink-0"
              >
                <HomeIcon />
              </Link>
              <Link
                to={`/app/courses/${slug}`}
                aria-label="Back to course overview"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-sw-grey-light transition-colors shrink-0"
              >
                <BackChevron />
              </Link>
            </>
          )}
          <div className="flex-1 min-w-0">
            {showQuizChrome ? (
              <>
                <div className="text-[10px] font-semibold text-sw-grey uppercase tracking-wider">Quick Quiz</div>
                <div className="text-xs font-bold text-sw-dark">
                  Question {qIndex + 1} of {quiz.length}
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] font-semibold text-sw-grey uppercase tracking-wider truncate">{module?.title ?? course.title}</div>
                <div className="text-xs font-bold text-sw-dark">
                  {unit} {lesson.dayNumber} of {course.totalDays}
                </div>
              </>
            )}
          </div>
          {showQuizChrome ? (
            <Dots current={qIndex} total={quiz.length} label={`Question ${qIndex + 1} of ${quiz.length}`} />
          ) : (
            <Dots current={chromeCard} total={cardCount} label={`Card ${chromeCard + 1} of ${cardCount}`} />
          )}
        </div>
        <div
          className="h-0.5 bg-sw-grey-border"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={showQuizChrome ? `Quiz progress: question ${qIndex + 1} of ${quiz.length}` : 'Lesson progress'}
        >
          <div className="h-full bg-sw-blue transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {stage === 'cards' && card ? (
        <main
          className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pt-20 pb-32"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={{ transition: slide === 'none' ? 'opacity 0.22s ease, transform 0.22s ease' : 'none', ...slideStyle }}>
            <CardView card={card} flipped={flipped} onFlip={() => setFlipped((value) => !value)} lessonTitle={lesson.title} />
          </div>
          {cardIndex === 0 ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-sw-grey text-xs opacity-60">
              <span>←</span>
              <span>Swipe to navigate</span>
              <span>→</span>
            </div>
          ) : null}
        </main>
      ) : null}

      {stage === 'quizIntro' ? (
        <QuizIntro
          unit={unit}
          day={lesson.dayNumber}
          totalDays={course.totalDays}
          cardCount={cardCount}
          questionCount={quiz.length}
          xp={xpValue}
          onStart={startQuiz}
          onReview={() => {
            setCardIndex(Math.max(0, cards.length - 1))
            setStage('cards')
          }}
        />
      ) : null}

      {stage === 'quiz' && quiz[qIndex] ? (
        <QuizQuestion
          key={qIndex}
          question={quiz[qIndex]}
          onAnswer={pickOption}
        />
      ) : null}

      {stage === 'result' ? (
        <ResultView
          unit={unit}
          day={lesson.dayNumber}
          totalDays={course.totalDays}
          lessonTitle={lesson.title}
          score={correctCount}
          total={quiz.length}
          xpValue={xpValue}
          completion={completion}
          isSaving={busy}
          onReview={() => {
            setCardIndex(0)
            setStage('cards')
          }}
        />
      ) : null}

      <div className="h-24 shrink-0" aria-hidden="true" />

      {stage === 'quizIntro' ? null : stage === 'result' ? (
        <div className="fixed bottom-0 left-0 right-0 z-50" style={FOOTER_FADE}>
          <div className="max-w-2xl mx-auto px-4 pt-3 pb-3 flex flex-col gap-2">
            {nextLesson ? (
              <Link
                to={`/app/courses/${slug}/${nextLesson.id}`}
                className="flex items-center justify-center gap-2 bg-sw-blue text-white font-extrabold text-base py-4 rounded-full shadow-lg hover:bg-sw-blue-hover active:scale-[0.98] transition-all duration-200"
              >
                <span>Next Lesson →</span>
              </Link>
            ) : (
              <Link
                to={`/app/courses/${slug}`}
                className="flex items-center justify-center gap-2 bg-sw-blue text-white font-extrabold text-base py-4 rounded-full shadow-lg hover:bg-sw-blue-hover active:scale-[0.98] transition-all duration-200"
              >
                <span>🏆 Back to Course</span>
              </Link>
            )}
            {correctCount < quiz.length && !busy ? (
              <button type="button" onClick={startQuiz} className="w-full text-sm font-semibold text-sw-grey hover:text-sw-blue transition-colors py-2">
                Retry quiz
              </button>
            ) : null}
          </div>
          <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'white' }} />
        </div>
      ) : stage === 'quiz' ? (
        <div className="fixed bottom-0 left-0 right-0 z-50" style={FOOTER_FADE}>
          <div className="max-w-2xl mx-auto px-4 pt-3 pb-3">
            <button
              type="button"
              disabled={!revealed}
              onClick={submitQuestion}
              className={`w-full flex items-center justify-center gap-2 font-extrabold text-base py-4 rounded-full shadow-lg transition-all duration-200 ${
                revealed ? 'bg-sw-blue text-white hover:bg-sw-blue-hover active:scale-[0.98]' : 'bg-sw-grey-light text-sw-grey cursor-not-allowed'
              }`}
            >
              {lastQuestion ? (
                <>
                  <span>See Results</span>
                  <span>🏆</span>
                </>
              ) : (
                <>
                  <span>Next Question</span>
                  <NextChevron />
                </>
              )}
            </button>
          </div>
          <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'white' }} />
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-50" style={FOOTER_FADE}>
          <div className="max-w-2xl mx-auto px-4 pt-3 pb-3 flex items-center gap-3">
            {cardIndex > 0 ? (
              <button
                type="button"
                aria-label="Previous card"
                onClick={goPrevCard}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-sw-grey-border bg-white hover:bg-sw-grey-light transition-colors shrink-0"
              >
                <BackChevron />
              </button>
            ) : null}
            <button
              type="button"
              onClick={goNextCard}
              className="flex-1 flex items-center justify-center gap-2 bg-sw-blue text-white font-extrabold text-base py-4 rounded-full shadow-lg hover:bg-sw-blue-hover active:scale-[0.98] transition-all duration-200"
            >
              {lastCard ? (
                <>
                  <span>Start Quiz</span>
                  <span>📝</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <NextChevron />
                </>
              )}
            </button>
          </div>
          <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'white' }} />
        </div>
      )}
    </div>
  )
}

function QuizIntro({
  unit,
  day,
  totalDays,
  cardCount,
  questionCount,
  xp,
  onStart,
  onReview,
}: {
  unit: string
  day: number
  totalDays: number
  cardCount: number
  questionCount: number
  xp: number
  onStart: () => void
  onReview: () => void
}) {
  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pt-20 pb-32" style={{ touchAction: 'pan-y' }}>
      <div className="flex flex-col items-center text-center py-8 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-sw-blue-light border border-sw-blue-border flex items-center justify-center text-4xl">📝</div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-sw-grey mb-2">
            Cards complete · {unit} {day} of {totalDays}
          </div>
          <h2 className="text-2xl font-extrabold text-sw-dark leading-snug mb-3">Ready for the quiz?</h2>
          <p className="text-sw-grey text-base leading-relaxed max-w-sm">
            You&apos;ve read all {cardCount} cards for today&apos;s lesson. Answer {questionCount} quick questions to lock in
            what you&apos;ve learned and earn your <strong className="text-sw-dark">⚡{xp} XP</strong>.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1 bg-sw-grey-light rounded-xl px-4 py-3">
            <span className="text-xl">❓</span>
            <span className="text-xs font-semibold text-sw-dark">{questionCount} questions</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-sw-grey-light rounded-xl px-4 py-3">
            <span className="text-xl">⚡</span>
            <span className="text-xs font-semibold text-sw-dark">{xp} XP</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-sw-grey-light rounded-xl px-4 py-3">
            <span className="text-xl">⏱️</span>
            <span className="text-xs font-semibold text-sw-dark">~2 min</span>
          </div>
        </div>
        <div className="w-full space-y-3 max-w-sm">
          <button
            type="button"
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 bg-sw-blue text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-sw-blue-hover active:scale-[0.98] transition-all duration-200"
          >
            <span>Start Quiz</span>
            <span>📝</span>
          </button>
          <button type="button" onClick={onReview} className="w-full text-sm font-semibold text-sw-grey hover:text-sw-dark transition-colors py-2">
            ← Review cards again
          </button>
        </div>
      </div>
    </main>
  )
}

function QuizQuestion({
  question,
  onAnswer,
}: {
  question: { question: string; options: string[]; correctIndex: number; explanation?: string; type?: string }
  onAnswer: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [showWhy, setShowWhy] = useState(false)

  const select = (index: number) => {
    if (status !== 'idle') return
    const correct = index === question.correctIndex
    setPicked(index)
    setStatus(correct ? 'correct' : 'wrong')
    window.setTimeout(() => setShowWhy(true), 350)
    onAnswer(correct)
  }

  const optionClass = (index: number) => {
    const base = 'w-full text-left rounded-2xl border-2 px-5 py-4 text-sw-dark font-semibold text-base transition-all duration-200 '
    if (status === 'idle') return base + 'border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light active:scale-[0.98]'
    if (index === question.correctIndex) return base + 'border-sw-success bg-green-50 text-sw-dark'
    if (index === picked && index !== question.correctIndex) return base + 'border-sw-coral bg-red-50 text-sw-dark'
    return base + 'border-sw-grey-border bg-white opacity-50'
  }

  const trueFalse = question.type === 'true-false'

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pt-20 pb-32" style={{ touchAction: 'pan-y' }}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: trueFalse ? 'hsl(var(--sw-purple) / 0.12)' : 'hsl(var(--sw-blue) / 0.1)',
              color: trueFalse ? 'hsl(var(--sw-purple))' : 'hsl(var(--sw-blue))',
            }}
          >
            {trueFalse ? '✓ True or False' : '⊙ Multiple Choice'}
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-sw-dark leading-snug">{question.question}</h2>
        <div className="flex flex-col gap-3" role="group" aria-label="Answer options">
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index)
            const mark =
              status !== 'idle' && index === question.correctIndex
                ? '✓'
                : status !== 'idle' && index === picked && index !== question.correctIndex
                  ? '✗'
                  : letter
            const letterClass =
              status === 'idle'
                ? 'bg-sw-grey-light text-sw-grey'
                : index === question.correctIndex
                  ? 'bg-sw-success text-white'
                  : index === picked
                    ? 'bg-sw-coral text-white'
                    : 'bg-sw-grey-light text-sw-grey'
            return (
              <button
                key={option}
                type="button"
                disabled={status !== 'idle'}
                aria-pressed={picked === index}
                aria-label={`Option ${letter}: ${option}`}
                onClick={() => select(index)}
                className={optionClass(index)}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 transition-all duration-200 ${letterClass}`}>
                    {mark}
                  </span>
                  {option}
                </span>
              </button>
            )
          })}
        </div>
        {showWhy ? (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-2xl p-5 border"
            style={{
              background: status === 'correct' ? 'hsl(var(--sw-success) / 0.06)' : 'hsl(var(--sw-coral) / 0.06)',
              borderColor: status === 'correct' ? 'hsl(var(--sw-success) / 0.3)' : 'hsl(var(--sw-coral) / 0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{status === 'correct' ? '🎉' : '💡'}</span>
              <span
                className="text-sm font-extrabold"
                style={{ color: status === 'correct' ? 'hsl(var(--sw-success))' : 'hsl(var(--sw-coral))' }}
              >
                {status === 'correct' ? 'Correct!' : "Not quite — here's why:"}
              </span>
            </div>
            {question.explanation ? <p className="text-sm text-sw-dark leading-relaxed">{question.explanation}</p> : null}
          </div>
        ) : null}
      </div>
    </main>
  )
}

function CardView({
  card,
  flipped,
  onFlip,
  lessonTitle,
}: {
  card: LessonCard
  flipped: boolean
  onFlip: () => void
  lessonTitle: string
}) {
  if (isFlashcard(card)) {
    return (
      <button type="button" onClick={onFlip} className="w-full text-left">
        <article className="bg-white border border-sw-grey-border rounded-2xl p-5 sm:p-6">
          <p className="text-[11px] font-bold tracking-[0.14em] text-sw-grey">{flipped ? 'ANSWER' : 'TAP TO FLIP'}</p>
          <h2 className="text-xl font-extrabold text-sw-dark mt-3">{flipped ? card.back : card.front}</h2>
        </article>
      </button>
    )
  }

  if (card.type === 'try-it') {
    const prompt = card.bullets?.[0]
    const notes = card.bullets?.slice(1) ?? []
    return (
      <article className="flex flex-col gap-4" aria-label="Today's task">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: 'hsl(var(--sw-amber) / 0.15)' }}>
            🎯
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-sw-grey">Today&apos;s Task</div>
            <div className="text-xs font-semibold text-sw-dark">Do this before moving on</div>
          </div>
        </div>
        <div className="rounded-2xl p-5 sm:p-6 border" style={{ background: 'hsl(var(--sw-amber) / 0.06)', borderColor: 'hsl(var(--sw-amber) / 0.25)' }}>
          <h2 className="font-extrabold text-xl sm:text-2xl text-sw-dark leading-snug mb-3">{card.headline}</h2>
          {card.body ? <p className="text-sw-dark text-base leading-relaxed whitespace-pre-line">{card.body}</p> : null}
          {prompt || notes.length ? (
            <ul data-testid="lesson-task-notes" className="mt-4 space-y-3">
              {prompt ? (
                <li className="text-sm text-sw-dark leading-relaxed">
                  <PromptCopy text={prompt} />
                </li>
              ) : null}
              {notes.map((item) => (
                <li key={item} className="text-sm text-sw-dark leading-relaxed">
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <WiseTask lessonTitle={card.headline || lessonTitle} body={card.body} prompt={prompt} />
        <div className="flex items-start gap-2 text-sm text-sw-grey">
          <span className="mt-0.5">💡</span>
          <span>Take your time with this. The practice is where the real learning happens.</span>
        </div>
      </article>
    )
  }

  if (card.type === 'hook' && card.stat) {
    return (
      <article className="flex flex-col h-full" aria-label={card.headline}>
        <div className="relative flex-1 flex flex-col justify-end p-6 rounded-2xl overflow-hidden bg-sw-blue min-h-[260px]">
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
            <defs>
              <pattern id="card-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#card-dots)" />
          </svg>
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 70%)', transform: 'translate(20%, -20%)' }}
          />
          <div className="relative z-10 mb-4 self-start">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3 text-center">
              <div className="text-white font-extrabold text-3xl sm:text-4xl leading-none">{card.stat}</div>
              {card.statLabel ? <div className="text-white/70 text-xs font-medium mt-1">{card.statLabel}</div> : null}
            </div>
          </div>
          <h2 className="relative z-10 text-white font-extrabold text-xl sm:text-2xl leading-snug">{card.headline}</h2>
        </div>
        {card.body ? (
          <div className="pt-5 px-1">
            <p className="text-sw-dark text-base leading-relaxed">{card.body}</p>
          </div>
        ) : null}
      </article>
    )
  }

  return (
    <article className="flex flex-col gap-5" aria-label={card.headline}>
      <div className="bg-white border border-sw-grey-border rounded-2xl p-5 sm:p-6">
        <h2 className="text-sw-dark font-extrabold text-xl sm:text-2xl leading-snug mb-3">{card.headline}</h2>
        {card.body ? <p className="text-sw-grey text-base leading-relaxed mb-4">{card.body}</p> : null}
        {card.bullets?.length ? (
          <ul className="space-y-3">
            {card.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-sw-dark leading-relaxed">
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {card.callout ? <p className="mt-4 text-sm font-semibold bg-sw-blue-light rounded-xl p-3">{card.callout}</p> : null}
      </div>
      {card.headline ? <WiseExplore lessonTitle={lessonTitle} card={card} /> : null}
    </article>
  )
}

function PromptCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div data-testid="lesson-prompt" className="bg-white border border-sw-grey-border rounded-xl p-4 flex flex-col gap-3">
      <p data-testid="lesson-prompt-text" className="font-mono text-sm text-sw-dark leading-relaxed whitespace-pre-wrap break-words">
        {text.replace(/^["“]|["”]$/g, '')}
      </p>
      <button
        type="button"
        data-testid="lesson-prompt-copy"
        aria-label="Copy prompt"
        onClick={() => {
          void navigator.clipboard.writeText(text.replace(/^["“]|["”]$/g, ''))
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1600)
        }}
        className="self-end min-h-[40px] px-4 rounded-full text-xs font-bold text-sw-blue bg-sw-blue-light border border-sw-blue-border active:scale-[0.98] transition-transform"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function WiseExplore({ lessonTitle, card }: { lessonTitle: string; card: LessonCard }) {
  const detail = [card.body, ...(card.bullets ?? [])].filter(Boolean).join(' • ')
  const href = `/app/wise?lesson=${encodeURIComponent(lessonTitle)}&concept=${encodeURIComponent(card.headline || '')}&detail=${encodeURIComponent(detail)}`
  return (
    <Link
      to={href}
      className="flex items-center gap-2.5 rounded-xl px-4 py-3 active:scale-[0.98] transition-transform"
      style={{
        background: 'linear-gradient(to right, hsl(var(--sw-blue)/0.05), hsl(var(--sw-purple)/0.05))',
        border: '1px solid hsl(var(--sw-blue)/0.15)',
      }}
    >
      <WiseMark />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-sw-dark">Explore this deeper with Wise</p>
        <p className="text-[10px] text-sw-grey">Ask your AI coach to explain or expand on this</p>
      </div>
      <Chevron />
    </Link>
  )
}

function WiseTask({ lessonTitle, body, prompt }: { lessonTitle: string; body?: string; prompt?: string }) {
  const href = `/app/wise?lesson=${encodeURIComponent(lessonTitle)}&task=${encodeURIComponent(body || '')}&prompt=${encodeURIComponent(prompt || '')}`
  return (
    <Link
      to={href}
      className="flex items-center gap-2.5 bg-gradient-to-r from-[hsl(var(--sw-blue)/0.06)] to-[hsl(var(--sw-purple)/0.06)] border border-[hsl(var(--sw-blue)/0.2)] rounded-xl px-4 py-3 active:scale-[0.98] transition-transform"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--sw-blue))] to-[hsl(var(--sw-purple))] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[9px] font-bold">W</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-sw-dark">Need help? Ask Wise</p>
        <p className="text-[10px] text-sw-grey">Get personalised coaching on this task</p>
      </div>
      <Chevron />
    </Link>
  )
}

function WiseMark() {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)), hsl(var(--sw-purple)))' }}
    >
      <span className="text-white text-[9px] font-bold">W</span>
    </div>
  )
}

function Dots({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-1 shrink-0" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total} aria-label={label}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={`rounded-full transition-all duration-300 ${
            index < current ? 'w-2 h-2 bg-sw-blue' : index === current ? 'w-3 h-2 bg-sw-blue' : 'w-2 h-2 bg-sw-grey-border'
          }`}
        />
      ))}
    </div>
  )
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M3 7.5L9 2.5L15 7.5V15C15 15.28 14.89 15.52 14.7 15.7C14.52 15.89 14.28 16 14 16H4C3.72 16 3.48 15.89 3.3 15.7C3.11 15.52 3 15.28 3 15V7.5Z"
        stroke="hsl(var(--sw-dark))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 16V9.5H11V16" stroke="hsl(var(--sw-dark))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 4l-5 5 5 5" stroke="hsl(var(--sw-dark))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NextChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5 3l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg className="w-4 h-4 text-sw-grey/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ResultView({
  unit,
  day,
  totalDays,
  lessonTitle,
  score,
  total,
  xpValue,
  completion,
  isSaving,
  onReview,
}: {
  unit: string
  day: number
  totalDays: number
  lessonTitle: string
  score: number
  total: number
  xpValue: number
  completion: CompletionData | null
  isSaving: boolean
  onReview: () => void
}) {
  const accuracy = total ? Math.round((score / total) * 100) : 100
  const perfect = score === total
  const great = accuracy >= 75
  const xp = completion?.xpEarned ?? (perfect ? xpValue : Math.round(great ? xpValue * 0.8 : xpValue * 0.5))
  const [shownXp, setShownXp] = useState(0)

  useEffect(() => {
    if (xp === 0) return
    const step = Math.max(1, Math.ceil(xp / 25))
    const timer = window.setInterval(() => {
      setShownXp((value) => {
        const next = value + step
        if (next >= xp) {
          window.clearInterval(timer)
          return xp
        }
        return next
      })
    }, 40)
    return () => window.clearInterval(timer)
  }, [xp])

  const emoji = perfect ? '🏆' : great ? '🎉' : '💪'
  const headline = perfect ? 'Perfect score!' : great ? 'Great work!' : "Keep going — you're building!"
  const body = perfect
    ? `You nailed every question. ${unit} ${day} is complete.`
    : great
      ? `Solid effort on ${unit} ${day}. Review the cards to get to 100%.`
      : `You got this. Re-read ${unit === 'Day' ? "today's" : 'these'} cards and try the quiz again anytime.`
  const gradient = perfect
    ? 'linear-gradient(135deg, hsl(var(--sw-amber)), hsl(var(--sw-amber) / 0.7))'
    : great
      ? 'linear-gradient(135deg, hsl(var(--sw-blue)), hsl(var(--sw-blue) / 0.7))'
      : 'linear-gradient(135deg, hsl(var(--sw-teal)), hsl(var(--sw-teal) / 0.7))'
  const badges = completion?.newBadges ?? []
  const wiseTask = `I just completed ${unit} ${day} "${lessonTitle}" with ${accuracy}% accuracy. Help me reflect on what I learned and how to apply it.`

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pt-20 pb-32" style={{ touchAction: 'pan-y' }}>
      <section className="flex flex-col items-center text-center py-6 gap-6" aria-label="Quiz results">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg" style={{ background: gradient }}>
          {emoji}
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-sw-grey mb-2">
            {unit} {day} of {totalDays} · Quiz complete
          </div>
          <h2 className="text-3xl font-extrabold text-sw-dark leading-tight mb-2">{headline}</h2>
          <p className="text-sw-grey text-base leading-relaxed max-w-sm">{body}</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Score', value: `${score}/${total}` },
            { label: 'XP Earned', value: isSaving ? '…' : `⚡${shownXp}` },
            { label: 'Accuracy', value: `${accuracy}%` },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 bg-sw-grey-light rounded-xl px-4 py-3 min-w-[74px]">
              <span className="text-lg font-extrabold text-sw-dark">{stat.value}</span>
              <span className="text-[10px] font-semibold text-sw-grey uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
        {badges.length > 0 ? (
          <div className="w-full max-w-sm space-y-2">
            {badges.map((id) => {
              const badge = RESULT_BADGES[id]
              return badge ? (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
                  style={{ background: 'hsl(var(--sw-amber) / 0.08)', borderColor: 'hsl(var(--sw-amber) / 0.35)' }}
                >
                  <span className="text-2xl shrink-0">{badge.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-extrabold text-sw-dark">🏅 New badge: {badge.label}</div>
                    <div className="text-[11px] text-sw-grey">{badge.desc}</div>
                  </div>
                </div>
              ) : null
            })}
          </div>
        ) : null}
        {completion && completion.newStreak > 1 ? (
          <div className="flex items-center gap-2 text-sm text-sw-dark font-semibold">
            <span>🔥</span>
            <span>
              {completion.newStreak}-day streak{completion.dailyBonusApplied ? ' · +5 bonus XP' : ''}!
            </span>
          </div>
        ) : null}
        <div className="w-full max-w-sm bg-white border border-sw-grey-border rounded-2xl px-5 py-4 text-left">
          <div className="text-[10px] font-bold uppercase tracking-widest text-sw-grey mb-1">Lesson completed</div>
          <div className="text-sm font-bold text-sw-dark">{lessonTitle}</div>
        </div>
        {completion ? (
          <Link
            to={`/app/wise?lesson=${encodeURIComponent(lessonTitle)}&task=${encodeURIComponent(wiseTask)}`}
            className="w-full max-w-sm flex items-center gap-3 bg-gradient-to-r from-[hsl(var(--sw-blue)/0.05)] to-[hsl(var(--sw-purple)/0.05)] border border-[hsl(var(--sw-blue)/0.2)] rounded-2xl px-4 py-3.5 active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <img src="/assets/wise.png" alt="Wise" className="w-full h-full object-cover" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs font-bold text-sw-dark">Reflect with Wise</p>
              <p className="text-[10px] text-sw-grey leading-snug">Deepen your learning — let&apos;s discuss how to apply this</p>
            </div>
            <Chevron />
          </Link>
        ) : null}
        {perfect ? null : (
          <button type="button" onClick={onReview} className="text-sm font-semibold text-sw-grey hover:text-sw-blue transition-colors py-1">
            ← Review {unit === 'Day' ? "today's" : 'the'} cards
          </button>
        )}
      </section>
    </main>
  )
}
