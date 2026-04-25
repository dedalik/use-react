import { useMemo } from 'react'

/**
 * Memoized Array.filter for derived subset values.
 */
export default function useArrayFilter<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  return useMemo(() => source.filter(predicate), [source, predicate])
}
