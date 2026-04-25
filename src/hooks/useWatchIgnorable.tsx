import { DependencyList, useCallback, useEffect, useRef } from 'react'

export interface WatchIgnorableControls {
  ignoreUpdates: (fn: () => void) => void
}

/**
 * Watcher that can temporarily ignore source updates.
 */
export default function useWatchIgnorable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchIgnorableControls {
  const previousRef = useRef<T | undefined>(undefined)
  const ignoreNextRef = useRef(0)

  const ignoreUpdates = useCallback((fn: () => void) => {
    ignoreNextRef.current += 1
    fn()
  }, [])

  useEffect(() => {
    if (ignoreNextRef.current > 0) {
      ignoreNextRef.current -= 1
      previousRef.current = value
      return
    }
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])

  return { ignoreUpdates }
}
