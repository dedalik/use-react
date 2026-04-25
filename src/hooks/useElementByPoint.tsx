import { useCallback } from 'react'

/**
 * Returns helper to resolve element at viewport coordinates.
 */
export default function useElementByPoint(): (x: number, y: number) => Element | null {
  return useCallback((x: number, y: number) => {
    if (typeof document === 'undefined') return null
    return document.elementFromPoint(x, y)
  }, [])
}
