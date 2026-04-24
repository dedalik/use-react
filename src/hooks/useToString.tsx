import { useMemo } from 'react'

/**
 * Converts any value to string with stable memoization.
 */
export default function useToString(value: unknown): string {
  return useMemo(() => String(value), [value])
}
