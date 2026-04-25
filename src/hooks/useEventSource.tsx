import { useEffect, useRef, useState } from 'react'

export interface UseEventSourceState {
  status: 'CLOSED' | 'CONNECTING' | 'OPEN'
  data: string | null
  error: Event | null
}

/**
 * EventSource helper tracking status and last payload.
 */
export default function useEventSource(url?: string): UseEventSourceState {
  const sourceRef = useRef<EventSource | null>(null)
  const [state, setState] = useState<UseEventSourceState>({ status: 'CLOSED', data: null, error: null })

  useEffect(() => {
    if (!url || typeof EventSource === 'undefined') return

    const source = new EventSource(url)
    sourceRef.current = source
    setState({ status: 'CONNECTING', data: null, error: null })

    source.onopen = () => setState((prev) => ({ ...prev, status: 'OPEN' }))
    source.onmessage = (event) => setState((prev) => ({ ...prev, data: event.data }))
    source.onerror = (event) => setState((prev) => ({ ...prev, error: event }))

    return () => {
      source.close()
      sourceRef.current = null
      setState((prev) => ({ ...prev, status: 'CLOSED' }))
    }
  }, [url])

  return state
}
