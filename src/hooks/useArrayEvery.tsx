import { useMemo } from 'react'

/**
 * Memoized Array.every for all-match checks.
 */
export default function useArrayEvery<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): boolean {
  return useMemo(() => source.every(predicate), [source, predicate])
}
