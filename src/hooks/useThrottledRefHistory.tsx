import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseThrottledRefHistoryOptions {
  delay?: number
  capacity?: number
}

export interface UseThrottledRefHistoryReturn<T> {
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
 * Records history snapshots at most once per throttle window.
 */
export default function useThrottledRefHistory<T>(
  initialValue: T,
  options: UseThrottledRefHistoryOptions = {},
): UseThrottledRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [b, setB] = useState<Bundle<T>>(() => ({
    value: initialValue,
    history: [initialValue] as T[],
    pointer: 0,
  }))
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const apply = () => {
      setB((prev) => {
        const current = prev.history[prev.pointer]
        if (Object.is(current, prev.value)) return prev
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, prev.value]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { ...prev, history: trimmed, pointer: trimmed.length - 1 }
      })
      lastRunRef.current = Date.now()
    }

    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))
    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      apply()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        apply()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
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
