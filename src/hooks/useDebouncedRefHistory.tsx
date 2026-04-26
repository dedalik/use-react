import { useCallback, useEffect, useState } from 'react'

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

type Bundle<T> = { value: T; history: T[]; pointer: number }

/**
 * Records history snapshots after debounced state changes.
 */
export default function useDebouncedRefHistory<T>(
  initialValue: T,
  options: UseDebouncedRefHistoryOptions = {},
): UseDebouncedRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [b, setB] = useState<Bundle<T>>(() => ({
    value: initialValue,
    history: [initialValue] as T[],
    pointer: 0,
  }))

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        setB((prev) => {
          const current = prev.history[prev.pointer]
          if (Object.is(current, prev.value)) return prev
          const base = prev.history.slice(0, prev.pointer + 1)
          const nextHistory = [...base, prev.value]
          const max = Math.max(1, capacity)
          const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
          return { ...prev, history: trimmed, pointer: trimmed.length - 1 }
        })
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
  }, [b.value, capacity, delay])

  const set = useCallback((next: T) => {
    setB((prev) => ({ ...prev, value: next }))
  }, [])

  const undo = useCallback(() => {
    setB((prev) => {
      if (prev.pointer === 0) return prev
      const pointer = prev.pointer - 1
      return { ...prev, pointer, value: prev.history[pointer] }
    })
  }, [])

  const redo = useCallback(() => {
    setB((prev) => {
      if (prev.pointer >= prev.history.length - 1) return prev
      const pointer = prev.pointer + 1
      return { ...prev, pointer, value: prev.history[pointer] }
    })
  }, [])

  const clear = useCallback(() => {
    setB((prev) => {
      const v = prev.history[prev.pointer]
      return { ...prev, history: [v], pointer: 0, value: v }
    })
  }, [])

  return {
    value: b.value,
    set,
    history: b.history,
    pointer: b.pointer,
    canUndo: b.pointer > 0,
    canRedo: b.pointer < b.history.length - 1,
    undo,
    redo,
    clear,
  }
}
