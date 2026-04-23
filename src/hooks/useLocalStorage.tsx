import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

type InitialValue<T> = T | (() => T)
type SetValue<T> = Dispatch<SetStateAction<T>>

export interface UseLocalStorageOptions<T> {
  initializeWithValue?: boolean
  enabled?: boolean
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  storage?: Storage
}

type UseLocalStorageReturn<T> = [T, SetValue<T>, () => void]

const isBrowser = typeof window !== 'undefined'

export default function useLocalStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  options: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> {
  const {
    initializeWithValue = true,
    enabled = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse as (value: string) => T,
    storage = isBrowser ? window.localStorage : undefined,
  } = options

  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback((): T => {
    const fallback = getInitialValue()

    if (!isBrowser || !enabled || !storage) {
      return fallback
    }

    try {
      const rawValue = storage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, enabled, getInitialValue, key, storage])

  const [storedValue, setStoredValue] = useState<T>(() => (initializeWithValue ? readValue() : getInitialValue()))

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue())
    }
  }, [initializeWithValue, readValue])

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value

        if (!isBrowser || !enabled || !storage) {
          return valueToStore
        }

        try {
          storage.setItem(key, serializer(valueToStore))
        } catch {
          // Ignore quota and privacy mode errors and keep state in memory.
        }

        return valueToStore
      })
    },
    [enabled, key, serializer, storage],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser || !enabled || !storage) {
      return
    }

    try {
      storage.removeItem(key)
    } catch {
      // Ignore privacy mode errors and keep state in memory.
    }
  }, [enabled, getInitialValue, key, storage])

  useEffect(() => {
    if (!isBrowser || !enabled || !storage) {
      return
    }

    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== storage || event.key !== key) {
        return
      }

      if (event.newValue == null) {
        setStoredValue(getInitialValue())
        return
      }

      try {
        setStoredValue(deserializer(event.newValue))
      } catch {
        setStoredValue(getInitialValue())
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [deserializer, enabled, getInitialValue, key, storage])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}

export type UseLocalStorageType = ReturnType<typeof useLocalStorage>
