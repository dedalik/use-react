import { useEffect, useState } from 'react'

export interface UseDebouncedRefHistoryOptions {
  delay?: number
  capacity?: number
}

export interface UseDebouncedRefHistoryReturn<T> {
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
 * Records history snapshots after debounced state changes.
 */
export default function useDebouncedRefHistory<T>(
  initialValue: T,
  options: UseDebouncedRefHistoryOptions = {},
): UseDebouncedRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        setState((prev) => {
          const current = prev.history[prev.pointer]
          if (Object.is(current, value)) return prev
          const base = prev.history.slice(0, prev.pointer + 1)
          const nextHistory = [...base, value]
          const max = Math.max(1, capacity)
          const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
          return { history: trimmed, pointer: trimmed.length - 1 }
        })
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
  }, [capacity, delay, value])

  const undo = () => {
    setState((prev) => {
      const pointer = Math.max(0, prev.pointer - 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const redo = () => {
    setState((prev) => {
      const pointer = Math.min(prev.history.length - 1, prev.pointer + 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const clear = () => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }

  return {
    value,
    set: setValue,
    history: state.history,
    pointer: state.pointer,
    canUndo: state.pointer > 0,
    canRedo: state.pointer < state.history.length - 1,
    undo,
    redo,
    clear,
  }
}
