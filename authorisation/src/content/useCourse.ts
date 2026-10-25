import { useEffect, useState } from 'react'
import { getCachedCourse, loadCourse, type Course } from '@/content/catalog'
import { useI18n } from '@/i18n/I18nProvider'

function courseFromSlug(slug: string | undefined, locale: 'en' | 'ru'): Course | null | undefined {
  if (!slug) return null
  return getCachedCourse(slug, locale) ?? undefined
}

export function useCourse(slug: string | undefined) {
  const { locale } = useI18n()
  const [course, setCourse] = useState<Course | null | undefined>(() => courseFromSlug(slug, locale))
  const [loadedKey, setLoadedKey] = useState(`${locale}:${slug}`)

  const key = `${locale}:${slug}`
  if (key !== loadedKey) {
    setLoadedKey(key)
    setCourse(courseFromSlug(slug, locale))
  }

  useEffect(() => {
    if (!slug || getCachedCourse(slug, locale)) return
    let cancelled = false
    void loadCourse(slug, locale)
      .then((loaded) => {
        if (!cancelled) setCourse(loaded ?? null)
      })
      .catch(() => {
        if (!cancelled) setCourse(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug, locale])

  return course
}
