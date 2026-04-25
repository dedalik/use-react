import { useCallback } from 'react'

export type VibratePattern = number | number[]

/**
 * Returns a helper to trigger vibration when supported.
 */
export default function useVibrate(): (pattern: VibratePattern) => boolean {
  return useCallback((pattern: VibratePattern) => {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false

    try {
      return navigator.vibrate(pattern)
    } catch {
      return false
    }
  }, [])
}
