import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { initialsFromName } from '@/app/mockUser'
import { PROFILE_FOCUS, PROFILE_PACES } from '@/content/lms'
import { useCurrentUser, useSession } from '@/auth/session'
import {
  cancelSubscription,
  openBillingPortal,
  updateName,
  updatePreferences,
} from '@/lib/api'
import { useProgress, useSubscription } from '@/lib/lmsQueries'

const PAST_DUE = new Set(['past_due', 'unpaid', 'incomplete'])

function formatRenew(unix: number | null) {
  if (!unix) return null
  return new Date(unix * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function memberSince(joinDate?: number) {
  if (!joinDate) return null
  return new Date(joinDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function statusLabel(status: string) {
  if (status === 'trialing') return 'Trial'
  if (status === 'active') return 'Active'
  if (status === 'canceled') return 'Cancelled'
  if (PAST_DUE.has(status)) return 'Past Due'
  return status
}

export default function ProfilePage() {
  const user = useCurrentUser()
  const { refresh, signOut } = useSession()
  const navigate = useNavigate()
  const progress = useProgress()
  const sub = useSubscription()
  const [editing, setEditing] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [cancelMsg, setCancelMsg] = useState<string | null>(null)

  if (user === undefined || progress === undefined || sub === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const name = user?.name || 'Friend'
  const initials = initialsFromName(name)
  const status = sub?.status || 'trialing'
  const pastDue = PAST_DUE.has(status)
  const renew = formatRenew(sub?.currentPeriodEnd ?? null)
  const xp = progress.user.xp
  const streak = progress.user.streakCount

  const saveName = async () => {
    const next = nameDraft.trim()
    if (!next) return
    setBusy(true)
    try {
      await updateName(next)
      await refresh({ silent: true })
      setEditing(false)
    } finally {
      setBusy(false)
    }
  }

  const setPace = async (pacePreference: string) => {
    await updatePreferences({ pacePreference })
    await refresh({ silent: true })
  }

  const setFocus = async (focusCategory: string) => {
    await updatePreferences({ focusCategory })
    await refresh({ silent: true })
  }

  const manage = async () => {
    setBusy(true)
    try {
      const { url } = await openBillingPortal()
      window.location.href = url
    } catch {
      setBusy(false)
    }
  }

  const confirmCancel = async () => {
    setBusy(true)
    try {
      await cancelSubscription()
      setCancelOpen(false)
      setCancelMsg(
        "You'll retain full access until the end of your current billing period. A confirmation email is on its way.",
      )
      await refresh({ silent: true })
    } catch {
      setBusy(false)
    } finally {
      setBusy(false)
    }
  }

  const statusClass = pastDue
    ? 'text-sw-amber'
    : status === 'trialing'
      ? 'text-sw-blue'
      : status === 'active'
        ? 'text-sw-success'
        : 'text-sw-grey'

  return (
    <div className="min-h-screen bg-sw-grey-light pb-28">
      <div className="bg-white border-b border-sw-grey-border px-4 pt-4 pb-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-sw-dark">My Profile</h1>
        <p className="text-xs text-sw-grey mt-0.5">Manage your account &amp; preferences</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sw-blue flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="flex gap-2">
                  <input
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    className="flex-1 border border-sw-grey-border rounded-xl px-3 py-2 text-sm font-bold"
                  />
                  <button type="button" onClick={() => void saveName()} className="text-xs font-semibold text-sw-blue">
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-sw-dark truncate">{name}</p>
                  <button
                    type="button"
                    className="text-xs text-sw-blue font-semibold"
                    onClick={() => {
                      setNameDraft(name)
                      setEditing(true)
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
              <p className="text-sm text-sw-grey truncate mt-0.5">{user?.email}</p>
              {user?.joinDate ? (
                <p className="text-xs text-sw-grey mt-1">Member since {memberSince(user.joinDate)}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <h2 className="text-sm font-bold text-sw-dark mb-3">My Subscription</h2>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-sw-dark">SuccessWise Pro</p>
              <p className={`text-xs font-bold mt-0.5 ${statusClass}`}>
                {statusLabel(status)}
                {renew ? <span className="text-sw-grey font-medium"> · renews {renew}</span> : null}
              </p>
            </div>
            <div className="text-2xl">💎</div>
          </div>
          {sub?.cancelAtPeriodEnd ? (
            <p className="mb-3 text-sm text-sw-grey" data-testid="cancel-scheduled">
              Cancellation scheduled. You&apos;ll keep access until {renew ?? 'the end of the period'}.
            </p>
          ) : null}
          {cancelMsg ? (
            <div className="mb-3 rounded-xl bg-sw-success-light p-3">
              <p className="text-sm font-bold text-sw-dark">Subscription cancelled</p>
              <p className="text-xs text-sw-grey mt-1">{cancelMsg}</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => void manage()}
            disabled={busy}
            className="w-full bg-sw-blue text-white text-sm font-bold rounded-xl py-3 hover:bg-sw-blue-hover transition-colors disabled:opacity-50"
          >
            Manage Subscription
          </button>
          <p className="text-[11px] text-sw-grey text-center mt-2">Update payment method or view invoices</p>
          {!sub?.cancelAtPeriodEnd && status !== 'canceled' ? (
            <button
              type="button"
              data-testid="cancel-start"
              onClick={() => setCancelOpen(true)}
              className="w-full mt-3 border-2 border-sw-grey-border text-sm font-semibold text-sw-grey rounded-xl py-2.5 hover:border-red-300 hover:text-red-500 transition-colors"
            >
              Cancel Subscription
            </button>
          ) : null}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <h2 className="text-sm font-bold text-sw-dark mb-4">Learning Preferences</h2>
          <div className="mb-5">
            <label className="text-xs font-semibold text-sw-grey uppercase tracking-wide mb-2 block">Daily Pace</label>
            <div className="grid grid-cols-3 gap-2">
              {PROFILE_PACES.map((pace) => {
                const on = user?.pacePreference === pace.value
                return (
                  <button
                    key={pace.value}
                    type="button"
                    onClick={() => void setPace(pace.value)}
                    className={`rounded-xl py-2.5 px-2 text-center border-2 transition-all ${
                      on ? 'border-sw-blue bg-sw-blue-light' : 'border-sw-grey-border bg-white hover:border-sw-blue/30'
                    }`}
                  >
                    <p className={`text-xs font-bold ${on ? 'text-sw-blue' : 'text-sw-dark'}`}>{pace.label}</p>
                    <p className="text-[10px] text-sw-grey mt-0.5">{pace.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-sw-grey uppercase tracking-wide mb-2 block">Focus Category</label>
            <div className="grid grid-cols-2 gap-2">
              {PROFILE_FOCUS.map((item) => {
                const on = user?.focusCategory === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => void setFocus(item.value)}
                    className={`rounded-xl py-2.5 px-3 text-left border-2 transition-all ${
                      on ? 'border-sw-blue bg-sw-blue-light' : 'border-sw-grey-border bg-white hover:border-sw-blue/30'
                    }`}
                  >
                    <p className={`text-xs font-bold ${on ? 'text-sw-blue' : 'text-sw-dark'}`}>{item.label}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <h2 className="text-sm font-bold text-sw-dark mb-3">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sw-grey-light rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold text-sw-blue">{xp}</div>
              <div className="text-[10px] text-sw-grey font-semibold">Total XP</div>
            </div>
            <div className="bg-sw-grey-light rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold text-sw-amber">{streak}</div>
              <div className="text-[10px] text-sw-grey font-semibold">Day Streak 🔥</div>
            </div>
          </div>
        </div>

        <Link to="/app/purchases" className="block w-full bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border">
          <div className="flex items-center gap-3">
            <span className="text-lg">🛍️</span>
            <span className="text-sm font-bold text-sw-dark">My Purchases</span>
            <svg className="w-4 h-4 text-sw-grey ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <button
          type="button"
          onClick={async () => {
            await signOut()
            navigate('/login', { replace: true })
          }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border text-center"
        >
          <span className="text-sm font-bold text-red-500">Sign Out</span>
        </button>

        <a
          href="/support?chat=open"
          className="block w-full bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border text-center"
        >
          <span className="text-sm font-semibold text-sw-grey">Need help? Ask Maya — answers in minutes</span>
        </a>
      </div>

      {cancelOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-extrabold text-sw-dark">Cancel your subscription?</h2>
            <p className="text-sm text-sw-grey mt-2">
              {pastDue
                ? "Your subscription will be cancelled straight away and you won't be charged again. Any outstanding payment attempt will be stopped, so you can ignore any payment reminders."
                : `You'll keep full access until ${renew ?? 'the end of your current billing period'}. You won't be charged again.`}
            </p>
            <button
              type="button"
              onClick={() => setCancelOpen(false)}
              className="mt-4 w-full rounded-full bg-sw-blue text-white font-bold py-3"
            >
              Keep my plan
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void confirmCancel()}
              className="mt-2 w-full rounded-full py-3 font-bold text-sw-coral"
            >
              {busy ? 'Cancelling…' : 'Yes, cancel'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
