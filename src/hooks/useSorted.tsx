import { useMemo } from 'react'

/**
 * Returns a memoized sorted copy of the input array.
 * Never mutates the original array.
 */
export default function useSorted<T>(values: readonly T[], compareFn?: (a: T, b: T) => number): T[] {
  return useMemo(() => {
    const copy = [...values]
    if (compareFn) {
      copy.sort(compareFn)
    } else {
      // Default JS sort behavior (string conversion), matching Array.prototype.sort
      copy.sort()
    }
    return copy
  }, [values, compareFn])
}
