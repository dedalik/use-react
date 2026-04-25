import { useCallback, useState } from 'react'

export interface UseRefHistoryOptions {
  capacity?: number
}

export interface UseRefHistoryReturn<T> {
  value: T
  set: (next: T) => void
  history: T[]
  pointer: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  clear: () => void
}

/**
 * State with snapshot history and undo/redo controls.
 */
export default function useRefHistory<T>(initialValue: T, options: UseRefHistoryOptions = {}): UseRefHistoryReturn<T> {
  const { capacity = 10 } = options
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))
  const { history, pointer } = state
  const value = history[pointer] ?? history[history.length - 1]

  const set = useCallback(
    (next: T) => {
      setState((prev) => {
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, next]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
      })
    },
    [capacity],
  )

  const undo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.max(0, prev.pointer - 1) }))
  }, [])

  const redo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.min(prev.history.length - 1, prev.pointer + 1) }))
  }, [])

  const clear = useCallback(() => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }, [])

  return {
    value,
    set,
    history,
    pointer,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    undo,
    redo,
    clear,
  }
}
