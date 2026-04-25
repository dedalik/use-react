import { useMemo } from 'react'

/**
 * Memoized Array.find for derived item lookup.
 */
export default function useArrayFind<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T | undefined {
  return useMemo(() => source.find(predicate), [source, predicate])
}
