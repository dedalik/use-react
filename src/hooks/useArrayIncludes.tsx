import { useMemo } from 'react'

/**
 * Memoized Array.includes for membership checks.
 */
export default function useArrayIncludes<T>(source: T[], searchElement: T): boolean {
  return useMemo(() => source.includes(searchElement), [searchElement, source])
}
