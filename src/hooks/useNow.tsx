import { useEffect, useState } from 'react'

export interface UseNowOptions {
  /**
   * Tick interval in milliseconds. Set `null` or `0` to freeze at mount value
   * (no interval updates).
   */
  interval?: number | null
}

/**
 * Live `Date` refreshed on an interval (client only).
 */
export default function useNow(options: UseNowOptions = {}): Date {
  const { interval = 1000 } = options
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return now
}
