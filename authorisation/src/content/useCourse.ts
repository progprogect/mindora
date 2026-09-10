import { useEffect, useState } from 'react'
import { getCachedCourse, loadCourse, type Course } from '@/content/catalog'

function courseFromSlug(slug: string | undefined): Course | null | undefined {
  if (!slug) return null
  return getCachedCourse(slug) ?? undefined
}

export function useCourse(slug: string | undefined) {
  const [course, setCourse] = useState<Course | null | undefined>(() => courseFromSlug(slug))
  const [loadedSlug, setLoadedSlug] = useState(slug)

  if (slug !== loadedSlug) {
    setLoadedSlug(slug)
    setCourse(courseFromSlug(slug))
  }

  useEffect(() => {
    if (!slug || getCachedCourse(slug)) return
    let cancelled = false
    void loadCourse(slug)
      .then((loaded) => {
        if (!cancelled) setCourse(loaded ?? null)
      })
      .catch(() => {
        if (!cancelled) setCourse(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return course
}
