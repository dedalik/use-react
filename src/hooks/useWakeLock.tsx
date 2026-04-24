import { useCallback, useEffect, useRef, useState } from 'react'

interface WakeLockSentinelLike {
  released: boolean
  release: () => Promise<void>
}

interface WakeLockLike {
  request: (type: 'screen') => Promise<WakeLockSentinelLike>
}

export interface UseWakeLockReturn {
  isSupported: boolean
  isActive: boolean
  request: () => Promise<boolean>
  release: () => Promise<void>
}

/**
 * Manages screen wake lock with request/release helpers.
 */
export default function useWakeLock(): UseWakeLockReturn {
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null)
  const [isActive, setIsActive] = useState(false)

  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const release = useCallback(async () => {
    if (!sentinelRef.current) return
    await sentinelRef.current.release()
    sentinelRef.current = null
    setIsActive(false)
  }, [])

  const request = useCallback(async () => {
    if (!isSupported) return false

    try {
      const wakeLock = (navigator as Navigator & { wakeLock: WakeLockLike }).wakeLock
      sentinelRef.current = await wakeLock.request('screen')
      setIsActive(true)
      return true
    } catch {
      sentinelRef.current = null
      setIsActive(false)
      return false
    }
  }, [isSupported])

  useEffect(() => {
    return () => {
      void release()
    }
  }, [release])

  return { isSupported, isActive, request, release }
}
