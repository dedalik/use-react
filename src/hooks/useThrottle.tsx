import { useEffect, useRef, useState } from 'react'

export default function useThrottle<T>(value: T, delay = 500): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecuted.current)

    if (remaining <= 0) {
      lastExecuted.current = now
      setThrottledValue(value)
      return
    }

    const timeoutId = globalThis.setTimeout(() => {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }, remaining)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay, value])

  return throttledValue
}
