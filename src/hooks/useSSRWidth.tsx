import { useMemo } from 'react'

/**
 * Returns viewport width on client and fallback width on server.
 */
export default function useSSRWidth(fallback = 1024): number {
  return useMemo(() => {
    if (typeof window === 'undefined') return fallback
    return window.innerWidth
  }, [fallback])
}
