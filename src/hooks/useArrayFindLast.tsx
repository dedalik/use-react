import { useMemo } from 'react'

/**
 * Memoized Array.findLast fallback-safe lookup.
 */
export default function useArrayFindLast<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T | undefined {
  return useMemo(() => {
    for (let i = source.length - 1; i >= 0; i -= 1) {
      const item = source[i]
      if (predicate(item, i, source)) return item
    }
    return undefined
  }, [source, predicate])
}
