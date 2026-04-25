import { DependencyList, useEffect, useRef } from 'react'

export interface WatchOnceOptions {
  immediate?: boolean
}

/**
 * Runs callback once, then ignores subsequent changes.
 */
export default function useWatchOnce<T>(
  value: T,
  callback: (value: T) => void,
  options: WatchOnceOptions = {},
  deps: DependencyList = [],
): void {
  const firedRef = useRef(false)
  const initialRef = useRef(value)

  useEffect(() => {
    if (firedRef.current) return

    const shouldFire = options.immediate ? true : value !== initialRef.current
    if (!shouldFire) return

    firedRef.current = true
    callback(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.immediate, value, ...deps])
}
