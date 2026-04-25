import { useEffect, useState } from 'react'

/**
 * Debounced mirror of any input value.
 */
export default function useRefDebounced<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), Math.max(0, delay))
    return () => window.clearTimeout(id)
  }, [delay, value])

  return debounced
}
