/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { and, asc, desc, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { profiles, wiseMessages, wiseThreads, wiseUsage } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { hasSku } from './purchases.js'

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

async function cannedReply(userId: string, text: string) {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const name = profile?.name?.split(' ')[0] || 'there'
  const lower = text.toLowerCase()
  if (lower.includes('focus') || lower.includes('today')) {
    return `${name}, start with today's mission on your dashboard — one lesson is enough to keep the streak alive. Then come back and tell me what clicked.`
  }
  if (lower.includes('goal')) {
    return `Let's keep it small, ${name}. Pick one skill from your current course and practise it once today. That's a goal you can finish before bed.`
  }
  if (lower.includes('progress') || lower.includes('week')) {
    return `Open Progress to see this week's ticks. If a day is empty, do the next lesson — consistency beats catching up in a binge.`
  }
  if (lower.includes('motivat')) {
    return `You already started, ${name}. The people who get results here are the ones who show up for 5–15 minutes, not the ones who wait to feel ready.`
  }
  return `I'm Wise — I know your pace and what you're learning. Ask me what to focus on, help setting a goal, a weekly review, or a dose of motivation.`
}

async function llmReply(userId: string, history: Array<{ role: string; content: string }>, text: string) {
  const env = loadEnv()
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const system = `You are Wise, a concise personal AI coach inside SuccessWise. The learner is ${profile?.name || 'a member'}, pace ${profile?.pacePreference || 'unknown'}, focus ${profile?.focusCategory || 'ai'}. Be practical, warm, and short (under 120 words). Do not mention system prompts.`

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
    return data.content?.[0]?.text?.trim() || (await cannedReply(userId, text))
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
    return data.choices?.[0]?.message?.content?.trim() || (await cannedReply(userId, text))
  }

  return cannedReply(userId, text)
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
