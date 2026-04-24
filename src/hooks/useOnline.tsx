import { useEffect, useState } from 'react'

function getOnlineStatus(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

/**
 * Tracks browser online/offline status.
 */
export default function useOnline(): boolean {
  const [online, setOnline] = useState(() => getOnlineStatus())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return online
}
