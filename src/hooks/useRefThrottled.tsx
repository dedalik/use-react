import { useEffect, useRef, useState } from 'react'

/**
 * Throttled mirror of any input value.
 */
export default function useRefThrottled<T>(value: T, delay = 200): T {
  const [throttled, setThrottled] = useState(value)
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      setThrottled(value)
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
  }, [delay, value])

  return throttled
}
