import { useEffect, useMemo, useRef, useState } from 'react'

export interface UseBroadcastChannelReturn<T> {
  isSupported: boolean
  data: T | null
  post: (value: T) => void
  close: () => void
}

/**
 * Small BroadcastChannel wrapper with reactive last message.
 */
export default function useBroadcastChannel<T = unknown>(name: string): UseBroadcastChannelReturn<T> {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const [data, setData] = useState<T | null>(null)

  const isSupported = typeof BroadcastChannel !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const channel = new BroadcastChannel(name)
    channelRef.current = channel
    channel.onmessage = (event) => setData(event.data as T)

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [isSupported, name])

  const post = useMemo(() => (value: T) => channelRef.current?.postMessage(value), [])
  const close = useMemo(() => () => channelRef.current?.close(), [])

  return { isSupported, data, post, close }
}
