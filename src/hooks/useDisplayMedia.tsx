import { useCallback, useEffect, useState } from 'react'

export interface UseDisplayMediaState {
  stream: MediaStream | null
  error: Error | null
  loading: boolean
  supported: boolean
  start: (options?: DisplayMediaStreamOptions) => Promise<MediaStream | null>
  stop: () => void
}

/**
 * Manages `getDisplayMedia` screen sharing stream lifecycle.
 */
export default function useDisplayMedia(): UseDisplayMediaState {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getDisplayMedia)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(
    async (options: DisplayMediaStreamOptions = { video: true, audio: false }) => {
      if (!supported) return null

      setLoading(true)
      setError(null)

      try {
        const media = await navigator.mediaDevices.getDisplayMedia(options)
        setStream(media)
        return media
      } catch (err) {
        setError(err as Error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [supported],
  )

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
