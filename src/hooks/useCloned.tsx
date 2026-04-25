import { useMemo } from 'react'

function cloneValue<T>(value: T): T {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value)
  }

  // Fallback for environments without structuredClone support
  return JSON.parse(JSON.stringify(value)) as T
}

/**
 * Returns a memoized deep clone of the provided value.
 */
export default function useCloned<T>(value: T): T {
  return useMemo(() => cloneValue(value), [value])
}
