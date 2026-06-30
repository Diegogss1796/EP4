import { useState, useEffect, useCallback } from 'react'
import courseService from '../services/courseService'

export function useCourseDetail(id) {
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCourse = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await courseService.getCourseById(id)
      setCourse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCourse()
  }, [fetchCourse])

  return { course, loading, error, refetch: fetchCourse }
}
