import { useEffect, useState } from 'react'

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
}

export interface UseNetworkState {
  online: boolean
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

function readNetworkState(): UseNetworkState {
  if (typeof navigator === 'undefined') return { online: true }

  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  }
}

/**
 * Tracks connection data and online status.
 */
export default function useNetwork(): UseNetworkState {
  const [state, setState] = useState<UseNetworkState>(() => readNetworkState())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    const update = () => setState(readNetworkState())
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection

    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    connection?.addEventListener('change', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      connection?.removeEventListener('change', update)
    }
  }, [])

  return state
}
