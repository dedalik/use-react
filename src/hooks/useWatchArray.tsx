import { DependencyList, useEffect, useRef } from 'react'

/**
 * Watches array changes and reports added/removed items.
 */
export default function useWatchArray<T>(
  value: T[],
  callback: (value: T[], previous: T[], added: T[], removed: T[]) => void,
  deps: DependencyList = [],
): void {
  const prevRef = useRef<T[]>(value)

  useEffect(() => {
    const previous = prevRef.current
    const added = value.filter((item) => !previous.includes(item))
    const removed = previous.filter((item) => !value.includes(item))

    callback(value, previous, added, removed)
    prevRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
