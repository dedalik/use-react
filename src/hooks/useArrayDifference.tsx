import { useMemo } from 'react'

/**
 * Memoized difference between source and values arrays.
 */
export default function useArrayDifference<T>(source: T[], values: T[]): T[] {
  return useMemo(() => source.filter((item) => !values.includes(item)), [source, values])
}
