import { useEffect, useState } from 'react'
import { loadCourse, type Course } from '@/content/catalog'

export function useCourse(slug: string | undefined) {
  const [course, setCourse] = useState<Course | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) {
      setCourse(null)
      return
    }
    let cancelled = false
    setCourse(undefined)
    void loadCourse(slug).then((loaded) => {
      if (!cancelled) setCourse(loaded ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  return course
}
