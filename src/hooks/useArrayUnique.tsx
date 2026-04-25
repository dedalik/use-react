import { useMemo } from 'react'

/**
 * Memoized unique list preserving first-seen order.
 */
export default function useArrayUnique<T>(source: T[]): T[] {
  return useMemo(() => Array.from(new Set(source)), [source])
}
