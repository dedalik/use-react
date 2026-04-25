import { DependencyList, useEffect, useRef } from 'react'

export type WatchImmediateCallback<T> = (value: T, previous: T | undefined) => void

/**
 * Runs callback on mount and whenever value changes.
 */
export default function useWatchImmediate<T>(
  value: T,
  callback: WatchImmediateCallback<T>,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
