import { useCallback, useEffect, useState } from 'react'

export interface UseUserMediaState {
  stream: MediaStream | null
  error: Error | null
  loading: boolean
  supported: boolean
  start: () => Promise<MediaStream | null>
  stop: () => void
}

/**
 * Manages `getUserMedia` stream lifecycle.
 */
export default function useUserMedia(
  constraints: MediaStreamConstraints = { audio: true, video: true },
): UseUserMediaState {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(async () => {
    if (!supported) return null

    setLoading(true)
    setError(null)

    try {
      const media = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(media)
      return media
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }, [constraints, supported])

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
