import { useMemo } from 'react'

/**
 * Memoized Array.reduce for derived aggregate values.
 */
export default function useArrayReduce<T, R>(
  source: T[],
  reducer: (previousValue: R, currentValue: T, currentIndex: number, array: T[]) => R,
  initialValue: R,
): R {
  return useMemo(() => source.reduce(reducer, initialValue), [source, reducer, initialValue])
}
