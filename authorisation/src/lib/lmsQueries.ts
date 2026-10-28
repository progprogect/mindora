import { useI18n } from '@/i18n/I18nProvider'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchHasSavedCard,
  fetchMaterials,
  fetchProgress,
  fetchPromptVaultKey,
  fetchPurchases,
  fetchSubscription,
  fetchUpsellStatus,
  type MaterialListItem,
  type ProgressPayload,
  type SubscriptionDto,
} from '@/lib/api'
import { canAccessCourse, hasFullCatalogAccess } from '@/shared/courseAccess'

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
        lastOpened: null,
      })
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return progress
}

export function useSubscription() {
  const [sub, setSub] = useState<SubscriptionDto | null | undefined>(undefined)

  const reload = useCallback(async () => {
    try {
      setSub(await fetchSubscription())
    } catch (error) {
      console.warn('[api] subscription failed', error)
      setSub(null)
    }
  }, [])

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

  return { sub, reload }
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

/** Course entitlement: live sub → all; else kit allowlists only. */
export function useCourseAccess() {
  const { sub } = useSubscription()
  const purchases = usePurchases()
  const ready = sub !== undefined && purchases !== undefined
  const fullCatalog = hasFullCatalogAccess(sub?.status)
  const canAccess = useCallback(
    (slug: string) => {
      if (!ready) return false
      return canAccessCourse(slug, { subscriptionStatus: sub?.status, purchases })
    },
    [ready, sub?.status, purchases],
  )
  return { ready, fullCatalog, canAccess, subscription: sub, purchases }
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

export function useMaterials() {
  const { locale } = useI18n()
  const [items, setItems] = useState<MaterialListItem[] | undefined>(undefined)
  useEffect(() => {
    let cancelled = false
    fetchMaterials(locale === 'ru' ? 'ru' : 'en')
      .then((data) => {
        if (!cancelled) setItems(data.materials)
      })
      .catch((error) => {
        console.warn('[api] materials failed', error)
        if (!cancelled) setItems([])
      })
    return () => {
      cancelled = true
    }
  }, [locale])
  return items
}
