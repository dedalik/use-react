import { useMemo } from 'react'

export interface UseToNumberOptions {
  fallback?: number
}

/**
 * Converts value to number with stable memoization.
 */
export default function useToNumber(value: unknown, options: UseToNumberOptions = {}): number {
  const { fallback = 0 } = options

  return useMemo(() => {
    const next = Number(value)
    return Number.isNaN(next) ? fallback : next
  }, [value, fallback])
}
