import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseWebSocketState {
  status: 'CLOSED' | 'CONNECTING' | 'OPEN'
  lastMessage: string | null
  send: (message: string) => boolean
  close: () => void
}

/**
 * WebSocket lifecycle helper with last message tracking.
 */
export default function useWebSocket(url?: string): UseWebSocketState {
  const socketRef = useRef<WebSocket | null>(null)
  const [status, setStatus] = useState<'CLOSED' | 'CONNECTING' | 'OPEN'>('CLOSED')
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!url || typeof WebSocket === 'undefined') return

    const ws = new WebSocket(url)
    socketRef.current = ws
    setStatus('CONNECTING')

    ws.onopen = () => setStatus('OPEN')
    ws.onclose = () => setStatus('CLOSED')
    ws.onmessage = (event) => setLastMessage(String(event.data))

    return () => {
      ws.close()
      socketRef.current = null
      setStatus('CLOSED')
    }
  }, [url])

  const send = useCallback((message: string) => {
    const ws = socketRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return false
    ws.send(message)
    return true
  }, [])

  const close = useCallback(() => {
    socketRef.current?.close()
    setStatus('CLOSED')
  }, [])

  return { status, lastMessage, send, close }
}
