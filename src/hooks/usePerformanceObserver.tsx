import { useEffect, useMemo, useState } from 'react'

export interface UsePerformanceObserverOptions {
  entryTypes: string[]
  buffered?: boolean
}

export interface UsePerformanceObserverReturn {
  isSupported: boolean
  entries: PerformanceEntry[]
}

/**
 * Subscribes to PerformanceObserver and stores emitted entries.
 */
export default function usePerformanceObserver(options: UsePerformanceObserverOptions): UsePerformanceObserverReturn {
  const [entries, setEntries] = useState<PerformanceEntry[]>([])
  const isSupported = typeof PerformanceObserver !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const observer = new PerformanceObserver((list) => {
      const next = list.getEntries()
      setEntries((prev) => [...prev, ...next])
    })

    observer.observe({ entryTypes: options.entryTypes, buffered: options.buffered })

    return () => observer.disconnect()
  }, [isSupported, options.buffered, options.entryTypes])

  return useMemo(() => ({ isSupported, entries }), [entries, isSupported])
}
