import { useEffect, useRef, useState } from 'react'

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

/**
 * Records history snapshots at most once per throttle window.
 */
export default function useThrottledRefHistory<T>(
  initialValue: T,
  options: UseThrottledRefHistoryOptions = {},
): UseThrottledRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const apply = () => {
      setState((prev) => {
        const current = prev.history[prev.pointer]
        if (Object.is(current, value)) return prev
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, value]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
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
