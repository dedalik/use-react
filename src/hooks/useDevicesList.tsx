import { useCallback, useEffect, useState } from 'react'

export interface UseDevicesListState {
  isSupported: boolean
  devices: MediaDeviceInfo[]
  loading: boolean
  refresh: () => Promise<MediaDeviceInfo[]>
}

/**
 * Lists media input/output devices and watches for changes.
 */
export default function useDevicesList(): UseDevicesListState {
  const isSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.enumerateDevices
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!isSupported) return []

    setLoading(true)
    try {
      const list = await navigator.mediaDevices.enumerateDevices()
      setDevices(list)
      return list
    } finally {
      setLoading(false)
    }
  }, [isSupported])

  useEffect(() => {
    if (!isSupported || typeof navigator === 'undefined') return

    const handleChange = () => {
      void refresh()
    }

    void refresh()
    navigator.mediaDevices.addEventListener('devicechange', handleChange)
    return () => navigator.mediaDevices.removeEventListener('devicechange', handleChange)
  }, [isSupported, refresh])

  return { isSupported, devices, loading, refresh }
}
