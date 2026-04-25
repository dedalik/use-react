import { DependencyList, useEffect, useRef } from 'react'

/**
 * Limits callback execution frequency for changing values.
 */
export default function useWatchThrottled<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  delay = 200,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      callback(value, previousRef.current)
      previousRef.current = value
      lastRunRef.current = Date.now()
    }

    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      run()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        run()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
