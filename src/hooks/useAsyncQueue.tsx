import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAsyncQueueOptions {
  autoStart?: boolean
}

export interface UseAsyncQueueReturn<T> {
  results: Array<T | null>
  errors: Array<unknown | null>
  pending: boolean
  currentIndex: number
  start: () => Promise<void>
  reset: () => void
}

/**
 * Runs async tasks one-by-one and stores per-step outcomes.
 */
export default function useAsyncQueue<T>(
  tasks: Array<() => Promise<T>>,
  options: UseAsyncQueueOptions = {},
): UseAsyncQueueReturn<T> {
  const { autoStart = false } = options
  const [results, setResults] = useState<Array<T | null>>(() => tasks.map(() => null))
  const [errors, setErrors] = useState<Array<unknown | null>>(() => tasks.map(() => null))
  const [pending, setPending] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const runningRef = useRef(false)

  const reset = useCallback(() => {
    setResults(tasks.map(() => null))
    setErrors(tasks.map(() => null))
    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  const start = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true
    setPending(true)

    for (let i = 0; i < tasks.length; i += 1) {
      setCurrentIndex(i)
      try {
        const value = await tasks[i]()
        setResults((prev) => {
          const next = [...prev]
          next[i] = value
          return next
        })
      } catch (error) {
        setErrors((prev) => {
          const next = [...prev]
          next[i] = error
          return next
        })
      }
    }

    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  useEffect(() => {
    if (autoStart) void start()
  }, [autoStart, start])

  return { results, errors, pending, currentIndex, start, reset }
}
