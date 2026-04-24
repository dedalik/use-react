import { useCallback, useState } from 'react'

export interface UseManualRefHistoryOptions {
  capacity?: number
}

export interface UseManualRefHistoryReturn<T> {
  value: T
  set: (next: T) => void
  commit: () => void
  history: T[]
  pointer: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  clear: () => void
}

/**
 * State history that records snapshots only when commit is called.
 */
export default function useManualRefHistory<T>(
  initialValue: T,
  options: UseManualRefHistoryOptions = {},
): UseManualRefHistoryReturn<T> {
  const { capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [history, setHistory] = useState<T[]>([initialValue])
  const [pointer, setPointer] = useState(0)

  const commit = useCallback(() => {
    setHistory((prev) => {
      const base = prev.slice(0, pointer + 1)
      const nextHistory = [...base, value]
      const max = Math.max(1, capacity)
      const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
      setPointer(trimmed.length - 1)
      return trimmed
    })
  }, [capacity, pointer, value])

  const undo = useCallback(() => {
    setPointer((p) => {
      const next = Math.max(0, p - 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const redo = useCallback(() => {
    setPointer((p) => {
      const next = Math.min(history.length - 1, p + 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const clear = useCallback(() => {
    setHistory([value])
    setPointer(0)
  }, [value])

  return {
    value,
    set: setValue,
    commit,
    history,
    pointer,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    undo,
    redo,
    clear,
  }
}
