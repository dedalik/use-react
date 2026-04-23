import { useEffect, useState } from 'react'

/**
 * Delays value updates until changes stop for the provided delay.
 */
export default function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      globalThis.clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

export type UseDebounceType = ReturnType<typeof useDebounce>
