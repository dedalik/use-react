import { useCallback, useRef, useState } from 'react'

export interface UseFetchState<T> {
  loading: boolean
  data: T | null
  error: Error | null
}

export interface UseFetchReturn<T> extends UseFetchState<T> {
  execute: (input?: RequestInfo | URL, init?: RequestInit) => Promise<T | null>
  abort: () => void
}

/**
 * Fetch wrapper with loading/data/error state and abort support.
 */
export default function useFetch<T = unknown>(
  defaultInput?: RequestInfo | URL,
  defaultInit?: RequestInit,
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({ loading: false, data: null, error: null })
  const controllerRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  const execute = useCallback(
    async (input?: RequestInfo | URL, init?: RequestInit): Promise<T | null> => {
      if (typeof fetch === 'undefined') return null

      abort()
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
      controllerRef.current = controller

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const res = await fetch(input ?? defaultInput!, { ...defaultInit, ...init, signal: controller?.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = (await res.json()) as T
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          setState((prev) => ({ ...prev, loading: false }))
          return null
        }
        setState({ loading: false, data: null, error: error as Error })
        return null
      }
    },
    [abort, defaultInit, defaultInput],
  )

  return { ...state, execute, abort }
}
