import { useCallback, useEffect, useState } from 'react'
import {
  fetchHasSavedCard,
  fetchProgress,
  fetchPromptVaultKey,
  fetchPurchases,
  fetchSubscription,
  fetchUpsellStatus,
  type ProgressPayload,
  type SubscriptionDto,
} from '@/lib/api'

export function useUpsellStatus(offerSlug: string) {
  const [status, setStatus] = useState<{ status: string } | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetchUpsellStatus(offerSlug)
      .then((data) => {
        if (!cancelled) setStatus(data)
      })
      .catch((error) => {
        console.warn('[api] upsell status failed', error)
        if (!cancelled) setStatus({ status: 'none' })
      })
    return () => {
      cancelled = true
    }
  }, [offerSlug])

  return status
}

export function useHasSavedCard() {
  const [hasCard, setHasCard] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetchHasSavedCard()
      .then((data) => {
        if (!cancelled) setHasCard(Boolean(data))
      })
      .catch((error) => {
        console.warn('[api] upsell has-card failed', error)
        if (!cancelled) setHasCard(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return hasCard
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressPayload | undefined>(undefined)

  const reload = useCallback(async () => {
    try {
      setProgress(await fetchProgress())
    } catch (error) {
      console.warn('[api] progress failed', error)
      setProgress({
        lessons: [],
        badges: [],
        user: { xp: 0, streakCount: 0, lastActivityDate: null },
      })
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return progress
}

export function useSubscription() {
  const [sub, setSub] = useState<SubscriptionDto | undefined>(undefined)
  useEffect(() => {
    let cancelled = false
    fetchSubscription()
      .then((data) => {
        if (!cancelled) setSub(data)
      })
      .catch((error) => {
        console.warn('[api] subscription failed', error)
        if (!cancelled) setSub(null)
      })
    return () => {
      cancelled = true
    }
  }, [])
  return sub
}

export type PurchaseRecord = { sku: string; createdAt: number; amountCents: number | null }

export function usePurchases() {
  const [skus, setSkus] = useState<Set<string> | undefined>(undefined)
  useEffect(() => {
    let cancelled = false
    fetchPurchases()
      .then((data) => {
        if (!cancelled) setSkus(new Set(data.purchases.map((row) => row.sku)))
      })
      .catch((error) => {
        console.warn('[api] purchases failed', error)
        if (!cancelled) setSkus(new Set())
      })
    return () => {
      cancelled = true
    }
  }, [])
  return skus
}

export function usePurchaseRecords() {
  const [rows, setRows] = useState<PurchaseRecord[] | undefined>(undefined)
  useEffect(() => {
    let cancelled = false
    fetchPurchases()
      .then((data) => {
        if (!cancelled) setRows(data.purchases)
      })
      .catch((error) => {
        console.warn('[api] purchases failed', error)
        if (!cancelled) setRows([])
      })
    return () => {
      cancelled = true
    }
  }, [])
  return rows
}

export function usePromptVaultKey() {
  const [key, setKey] = useState<'prompt-vault' | null | undefined>(undefined)
  useEffect(() => {
    let cancelled = false
    fetchPromptVaultKey()
      .then((data) => {
        if (!cancelled) setKey(data.key)
      })
      .catch((error) => {
        console.warn('[api] prompt vault key failed', error)
        if (!cancelled) setKey(null)
      })
    return () => {
      cancelled = true
    }
  }, [])
  return key
}
