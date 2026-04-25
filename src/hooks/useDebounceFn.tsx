import { useCallback, useEffect, useRef } from 'react'

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export default function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay = 500): DebouncedFunction<T> {
  const fnRef = useRef(fn)
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

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      cancel()
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        fnRef.current(...args)
      }, delay)
    },
    [cancel, delay],
  ) as DebouncedFunction<T>

  debounced.cancel = cancel
  return debounced
}
