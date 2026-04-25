import { useEffect, useState } from 'react'

export interface UseAsyncStateOptions<T> {
  immediate?: boolean
  resetOnExecute?: boolean
  initialState?: T
}

/**
 * Resolves async producer into managed loading/data/error state.
 */
export default function useAsyncState<T>(
  producer: () => Promise<T>,
  options: UseAsyncStateOptions<T> = {},
): {
  state: T | undefined
  loading: boolean
  error: unknown
  execute: () => Promise<T>
} {
  const { immediate = true, resetOnExecute = false, initialState } = options
  const [state, setState] = useState<T | undefined>(initialState)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState<unknown>(undefined)

  const execute = async () => {
    if (resetOnExecute) setState(initialState)
    setLoading(true)
    setError(undefined)
    try {
      const result = await producer()
      setState(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) void execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return { state, loading, error, execute }
}
