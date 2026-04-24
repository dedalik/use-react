import { useMemo } from 'react'

/**
 * Checks CSS.supports for a property/value pair or raw condition.
 */
export default function useCssSupports(property: string, value?: string): boolean {
  return useMemo(() => {
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false
    try {
      return value === undefined ? CSS.supports(property) : CSS.supports(property, value)
    } catch {
      return false
    }
  }, [property, value])
}
