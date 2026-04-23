import { useCallback, useState } from 'react'

export interface UseAsyncState<T> {
  loading: boolean
  data: T | null
  error: unknown
}

export interface UseAsyncResult<T, Args extends unknown[]> extends UseAsyncState<T> {
  execute: (...args: Args) => Promise<T>
}

export default function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
): UseAsyncResult<T, Args> {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setState((currentState) => ({ ...currentState, loading: true, error: null }))

      try {
        const data = await asyncFunction(...args)
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        setState({ loading: false, data: null, error })
        throw error
      }
    },
    [asyncFunction],
  )

  return {
    ...state,
    execute,
  }
}
