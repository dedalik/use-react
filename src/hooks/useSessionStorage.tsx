import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

type InitialValue<T> = T | (() => T)
type SetValue<T> = Dispatch<SetStateAction<T>>

export interface UseSessionStorageOptions<T> {
  initializeWithValue?: boolean
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

const isBrowser = typeof window !== 'undefined'

export default function useSessionStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  options: UseSessionStorageOptions<T> = {},
): [T, SetValue<T>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse as (value: string) => T,
  } = options

  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback((): T => {
    const fallback = getInitialValue()
    if (!isBrowser) return fallback

    try {
      const rawValue = window.sessionStorage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, getInitialValue, key])

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

        if (isBrowser) {
          try {
            window.sessionStorage.setItem(key, serializer(valueToStore))
          } catch {
            // Keep in-memory state when storage write fails.
          }
        }

        return valueToStore
      })
    },
    [key, serializer],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser) return

    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // Keep in-memory fallback when storage removal fails.
    }
  }, [getInitialValue, key])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}
