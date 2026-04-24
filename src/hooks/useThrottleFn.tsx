import { useCallback, useEffect, useRef } from 'react'

export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export default function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay = 500): ThrottledFunction<T> {
  const fnRef = useRef(fn)
  const lastRunRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = delay - (now - lastRunRef.current)

      if (remaining <= 0) {
        cancel()
        lastRunRef.current = now
        fnRef.current(...args)
        return
      }

      if (timeoutRef.current != null) return

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        lastRunRef.current = Date.now()
        fnRef.current(...args)
      }, remaining)
    },
    [cancel, delay],
  ) as ThrottledFunction<T>

  throttled.cancel = cancel
  return throttled
}
