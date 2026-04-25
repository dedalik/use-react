import { useMemo } from 'react'

/**
 * Memoized Array.join for derived string output.
 */
export default function useArrayJoin<T>(source: T[], separator = ','): string {
  return useMemo(() => source.join(separator), [separator, source])
}
