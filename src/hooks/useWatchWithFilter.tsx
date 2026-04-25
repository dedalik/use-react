import { DependencyList, useEffect, useRef } from 'react'

export type WatchFilter<T> = (next: T, previous: T | undefined) => boolean

/**
 * Runs watcher callback only when filter returns true.
 */
export default function useWatchWithFilter<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  filter: WatchFilter<T>,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    if (filter(value, previousRef.current)) {
      callback(value, previousRef.current)
    }
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filter, ...deps])
}
