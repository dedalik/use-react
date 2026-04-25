import { useMemo } from 'react'

/**
 * Memoized Array.some for derived existence checks.
 */
export default function useArraySome<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): boolean {
  return useMemo(() => source.some(predicate), [source, predicate])
}
