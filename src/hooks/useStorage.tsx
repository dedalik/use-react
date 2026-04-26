import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseStorageOptions<T> {
  serializer?: (value: T) => string
  parser?: (raw: string) => T
  storage?: Storage
}

/**
 * Persists state in storage under a key.
 */
export default function useStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (next: T) => void, () => void] {
  const { serializer = JSON.stringify, parser = JSON.parse, storage = window.localStorage } = options
  /** >0: skip the next N persist `useEffect` runs after `remove()`. Set to 2 so both React 18 StrictMode effect invocations skip; `set()` clears the counter before persisting user changes. */
  const skipPersistCountRef = useRef(0)
  /** Bumps on every `remove` so we re-render and run the skip-persist effect even when `setValue(initialValue)` bails. */
  const [removeVersion, setRemoveVersion] = useState(0)

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = storage.getItem(key)
      if (raw == null || raw === '') return initialValue
      return parser(raw)
    } catch {
      return initialValue
    }
  })

  const didKeySyncOnMount = useRef(false)
  // When `key` (or `storage` / `initialValue`) changes without a full remount, re-read; initial mount is handled by `useState` above.
  useEffect(() => {
    if (!didKeySyncOnMount.current) {
      didKeySyncOnMount.current = true
      return
    }
    try {
      const raw = storage.getItem(key)
      if (raw == null || raw === '') setValue(initialValue)
      else setValue(parser(raw))
    } catch {
      setValue(initialValue)
    }
  }, [key, initialValue, parser, storage])

  useEffect(() => {
    if (skipPersistCountRef.current > 0) {
      skipPersistCountRef.current -= 1
      return
    }
    try {
      storage.setItem(key, serializer(value))
    } catch {
      // ignore storage write failures
    }
  }, [key, removeVersion, serializer, storage, value])

  const set = useCallback((next: T) => {
    skipPersistCountRef.current = 0
    setValue(next)
  }, [])

  const remove = useCallback(() => {
    try {
      storage.removeItem(key)
    } catch {
      // ignore storage remove failures
    }
    skipPersistCountRef.current = 2
    setValue(initialValue)
    setRemoveVersion((n) => n + 1)
  }, [initialValue, key, storage])

  return [value, set, remove]
}
