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
  const skipPersistRef = useRef(false)

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = storage.getItem(key)
      return raw == null ? initialValue : parser(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false
      return
    }
    try {
      storage.setItem(key, serializer(value))
    } catch {
      // ignore storage write failures
    }
  }, [key, serializer, storage, value])

  const set = useCallback((next: T) => {
    setValue(next)
  }, [])

  const remove = useCallback(() => {
    try {
      storage.removeItem(key)
    } catch {
      // ignore storage remove failures
    }
    skipPersistRef.current = true
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, set, remove]
}
