import { useMemo } from 'react'

/**
 * Memoized Array.findIndex for derived index lookup.
 */
export default function useArrayFindIndex<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): number {
  return useMemo(() => source.findIndex(predicate), [source, predicate])
}
