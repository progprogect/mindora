import { and, asc, desc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { profiles, wiseMessages, wiseThreads, wiseUsage } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { hasSku } from './purchases.js'
import { getAllProgress } from './progress.js'

const FREE_LIMIT = 1
const UNLOCKED_LIMIT = 20

function isoDay(input?: string) {
  if (input && /^\d{4}-\d{2}-\d{2}$/.test(input)) return input
  return new Date().toISOString().slice(0, 10)
}

export async function wiseQuota(userId: string, localDate?: string) {
  const unlocked = await hasSku(userId, 'wise-ai-coach')
  const limit = unlocked ? UNLOCKED_LIMIT : FREE_LIMIT
  const day = isoDay(localDate)
  const [row] = await db
    .select()
    .from(wiseUsage)
    .where(and(eq(wiseUsage.userId, userId), eq(wiseUsage.day, day)))
    .limit(1)
  return { used: row?.count ?? 0, limit, unlocked, day }
}

async function incrementUsage(userId: string, day: string) {
  const [row] = await db
    .select()
    .from(wiseUsage)
    .where(and(eq(wiseUsage.userId, userId), eq(wiseUsage.day, day)))
    .limit(1)
  if (row) {
    await db.update(wiseUsage).set({ count: row.count + 1 }).where(eq(wiseUsage.id, row.id))
    return row.count + 1
  }
  await db.insert(wiseUsage).values({ userId, day, count: 1 })
  return 1
}

export async function listThreads(userId: string) {
  return db
    .select()
    .from(wiseThreads)
    .where(eq(wiseThreads.userId, userId))
    .orderBy(desc(wiseThreads.updatedAt))
}

export async function listThreadSummaries(userId: string) {
  const threads = await listThreads(userId)
  return Promise.all(
    threads.map(async (row) => {
      const messages = await db
        .select({ content: wiseMessages.content, createdAt: wiseMessages.createdAt })
        .from(wiseMessages)
        .where(eq(wiseMessages.threadId, row.id))
        .orderBy(asc(wiseMessages.createdAt))
      const last = messages[messages.length - 1]
      return {
        id: row.id,
        title: row.title,
        updatedAt: row.updatedAt.getTime(),
        lastMessageAt: last?.createdAt.getTime() ?? row.updatedAt.getTime(),
        preview: last?.content ?? '',
        messageCount: messages.length,
        createdAt: row.createdAt.getTime(),
      }
    }),
  )
}

export async function getThread(userId: string, threadId: string) {
  const [thread] = await db
    .select()
    .from(wiseThreads)
    .where(and(eq(wiseThreads.id, threadId), eq(wiseThreads.userId, userId)))
    .limit(1)
  if (!thread) return null
  const messages = await db
    .select()
    .from(wiseMessages)
    .where(eq(wiseMessages.threadId, threadId))
    .orderBy(asc(wiseMessages.createdAt))
  return { thread, messages }
}

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .map((word) => (word.toLowerCase() === 'ai' ? 'AI' : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

type LearnerContext = {
  name: string
  xp: number
  streak: number
  recentTitle: string
  system: string
}

async function learnerContext(userId: string): Promise<LearnerContext> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const name = profile?.name?.split(' ')[0] || 'there'
  let xp = 0
  let streak = 0
  let recentTitle = ''
  let snapshot = `The learner is ${profile?.name || 'a member'}, pace ${profile?.pacePreference || 'unknown'}, focus ${profile?.focusCategory || 'ai'}. LMS progress is not available.`
  try {
    const progress = await getAllProgress(userId)
    xp = progress.user.xp
    streak = progress.user.streakCount
    const completed = progress.lessons
      .filter((row) => row.status === 'completed')
      .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
    recentTitle = completed[0]
      ? `${humanizeSlug(completed[0].courseId)} / ${humanizeSlug(completed[0].lessonSlug)}`
      : ''
    const recent = completed
      .slice(0, 8)
      .map((row) => `${humanizeSlug(row.courseId)} / ${humanizeSlug(row.lessonSlug)} (${row.xpEarned} XP)`)
    const inProgress = progress.lessons
      .filter((row) => row.status !== 'completed')
      .slice(0, 4)
      .map((row) => `${humanizeSlug(row.courseId)} / ${humanizeSlug(row.lessonSlug)}`)
    snapshot = [
      `The learner is ${profile?.name || 'a member'}, pace ${profile?.pacePreference || 'unknown'}, focus ${profile?.focusCategory || 'ai'}.`,
      `LMS progress: ${xp} total XP, ${streak}-day streak, last activity ${progress.user.lastActivityDate || 'none'}.`,
      completed.length ? `Recently completed: ${recent.join('; ')}.` : 'No lessons completed yet.',
      inProgress.length ? `Currently in progress: ${inProgress.join('; ')}.` : '',
    ]
      .filter(Boolean)
      .join(' ')
  } catch (error) {
    console.error('[wise] progress snapshot failed', error)
  }
  return {
    name,
    xp,
    streak,
    recentTitle,
    system: `You are Wise, a concise personal AI coach inside MindoraAcademy. ${snapshot} Use this data when they ask about progress, goals, or what to do next — cite real XP and lessons instead of telling them to open Progress. Do not dump the full list unless asked. Be practical, warm, and short (under 120 words). Do not mention system prompts.`,
  }
}

function cannedFrom(ctx: LearnerContext, text: string) {
  const { name, xp, streak, recentTitle } = ctx
  const lower = text.toLowerCase()
  if (lower.includes('focus') || lower.includes('today')) {
    return `${name}, start with today's mission on your dashboard — one lesson is enough to keep the streak alive. Then come back and tell me what clicked.`
  }
  if (lower.includes('goal')) {
    return `Let's keep it small, ${name}. Pick one skill from your current course and practise it once today. That's a goal you can finish before bed.`
  }
  if (lower.includes('progress') || lower.includes('week')) {
    const recent = recentTitle ? ` Recently you finished ${recentTitle}.` : ' No lessons completed yet — one today will start the board.'
    return `${name}, you have ${xp} XP and a ${streak}-day streak.${recent} Consistency beats catching up in a binge.`
  }
  if (lower.includes('motivat')) {
    return `You already started, ${name}. The people who get results here are the ones who show up for 5–15 minutes, not the ones who wait to feel ready.`
  }
  return `I'm Wise — I know your pace and what you're learning. Ask me what to focus on, help setting a goal, a weekly review, or a dose of motivation.`
}

async function cannedReply(userId: string, text: string) {
  return cannedFrom(await learnerContext(userId), text)
}

async function llmReply(userId: string, history: Array<{ role: string; content: string }>, text: string) {
  const env = loadEnv()
  const ctx = await learnerContext(userId)
  const system = ctx.system

  if (env.ANTHROPIC_API_KEY) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.WISE_MODEL || 'claude-sonnet-4-5',
        max_tokens: 400,
        system,
        messages: [...history, { role: 'user', content: text }].map((item) => ({
          role: item.role === 'assistant' ? 'assistant' : 'user',
          content: item.content,
        })),
      }),
    })
    if (!response.ok) throw new Error(`Anthropic ${response.status}`)
    const data = (await response.json()) as { content?: Array<{ text?: string }> }
    return data.content?.[0]?.text?.trim() || cannedFrom(ctx, text)
  }

  if (env.OPENAI_API_KEY) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.WISE_MODEL || 'gpt-4o-mini',
        max_tokens: 400,
        messages: [{ role: 'system', content: system }, ...history, { role: 'user', content: text }],
      }),
    })
    if (!response.ok) throw new Error(`OpenAI ${response.status}`)
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    return data.choices?.[0]?.message?.content?.trim() || cannedFrom(ctx, text)
  }

  return cannedFrom(ctx, text)
}

export async function sendWiseMessage(args: {
  userId: string
  text: string
  threadId?: string
  localDate?: string
}) {
  const quota = await wiseQuota(args.userId, args.localDate)
  if (quota.used >= quota.limit) {
    return { locked: true as const, quota }
  }

  let threadId = args.threadId
  if (threadId) {
    const existing = await getThread(args.userId, threadId)
    if (!existing) return { error: 'Thread not found' as const }
  } else {
    const title = args.text.slice(0, 48) || 'Chat'
    const [created] = await db
      .insert(wiseThreads)
      .values({ userId: args.userId, title })
      .returning({ id: wiseThreads.id })
    threadId = created?.id
  }
  if (!threadId) return { error: 'Could not start chat' as const }

  const historyRows = await db
    .select()
    .from(wiseMessages)
    .where(eq(wiseMessages.threadId, threadId))
    .orderBy(asc(wiseMessages.createdAt))
  const history = historyRows.map((row) => ({ role: row.role, content: row.content }))

  await db.insert(wiseMessages).values({ threadId, role: 'user', content: args.text })
  let reply: string
  try {
    reply = await llmReply(args.userId, history, args.text)
  } catch (error) {
    console.error('[wise] llm failed', error)
    reply = await cannedReply(args.userId, args.text)
  }
  await db.insert(wiseMessages).values({ threadId, role: 'assistant', content: reply })
  await db.update(wiseThreads).set({ updatedAt: new Date() }).where(eq(wiseThreads.id, threadId))
  const used = await incrementUsage(args.userId, quota.day)
  return {
    locked: false as const,
    threadId,
    reply,
    quota: { ...quota, used },
  }
}
