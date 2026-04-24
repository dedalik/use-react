import { useMemo } from 'react'

/**
 * Memoized Array.map for derived list values.
 */
export default function useArrayMap<T, R>(source: T[], mapper: (item: T, index: number, array: T[]) => R): R[] {
  return useMemo(() => source.map(mapper), [source, mapper])
}
