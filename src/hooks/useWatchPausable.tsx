import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'

export interface WatchPausableControls {
  isActive: boolean
  pause: () => void
  resume: () => void
}

/**
 * Watcher that can be paused/resumed.
 */
export default function useWatchPausable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchPausableControls {
  const previousRef = useRef<T | undefined>(undefined)
  const [isActive, setIsActive] = useState(true)

  const pause = useCallback(() => setIsActive(false), [])
  const resume = useCallback(() => setIsActive(true), [])

  useEffect(() => {
    if (!isActive) return

    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, value, ...deps])

  return { isActive, pause, resume }
}
