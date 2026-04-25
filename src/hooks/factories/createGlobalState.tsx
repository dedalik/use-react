import { useSyncExternalStore } from 'react'

/**
 * Creates a shared global state hook.
 */
export default function createGlobalState<T>(initialState: T | (() => T)) {
  let state = typeof initialState === 'function' ? (initialState as () => T)() : initialState
  const listeners = new Set<() => void>()

  const getSnapshot = () => state
  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const setState = (next: T | ((prev: T) => T)) => {
    state = typeof next === 'function' ? (next as (prev: T) => T)(state) : next
    listeners.forEach((listener) => listener())
  }

  return function useGlobalState() {
    const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    return [value, setState] as const
  }
}
