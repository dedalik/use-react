import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'

export interface WatchTriggerableControls<T> {
  trigger: (valueOverride?: T) => void
}

/**
 * Watcher that also supports manual triggering.
 */
export default function useWatchTriggerable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchTriggerableControls<T> {
  const previousRef = useRef<T | undefined>(undefined)
  const [manualTick, setManualTick] = useState(0)
  const manualValueRef = useRef<T | undefined>(undefined)

  const trigger = useCallback((valueOverride?: T) => {
    manualValueRef.current = valueOverride
    setManualTick((v) => v + 1)
  }, [])

  useEffect(() => {
    const next = manualValueRef.current === undefined ? value : manualValueRef.current
    callback(next, previousRef.current)
    previousRef.current = next
    manualValueRef.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, manualTick, ...deps])

  return { trigger }
}
