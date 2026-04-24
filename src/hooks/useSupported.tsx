import { useMemo } from 'react'

/**
 * Checks whether a feature test passes in the current runtime.
 */
export default function useSupported(test: () => unknown): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      return Boolean(test())
    } catch {
      return false
    }
  }, [test])
}
