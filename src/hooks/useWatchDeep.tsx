import { DependencyList, useEffect, useRef } from 'react'

/**
 * Watches deep changes using serialized value snapshots.
 */
export default function useWatchDeep<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const previousSerializedRef = useRef<string>('')

  useEffect(() => {
    const serialized = JSON.stringify(value)
    if (serialized !== previousSerializedRef.current) {
      callback(value, previousRef.current)
      previousRef.current = value
      previousSerializedRef.current = serialized
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
