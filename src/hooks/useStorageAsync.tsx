import { useCallback, useEffect, useState } from 'react'

export interface AsyncStorageLike {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
}

export interface UseStorageAsyncOptions<T> {
  serializer?: (value: T) => string
  parser?: (raw: string) => T
}

/**
 * Async storage-backed state with loading flag.
 */
export default function useStorageAsync<T>(
  storage: AsyncStorageLike,
  key: string,
  initialValue: T,
  options: UseStorageAsyncOptions<T> = {},
): [T, boolean, (next: T) => Promise<void>, () => Promise<void>] {
  const { serializer = JSON.stringify, parser = JSON.parse } = options
  const [value, setValue] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const raw = await storage.getItem(key)
        if (!active) return
        setValue(raw == null ? initialValue : parser(raw))
      } catch {
        if (active) setValue(initialValue)
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [initialValue, key, parser, storage])

  const set = useCallback(
    async (next: T) => {
      setValue(next)
      await storage.setItem(key, serializer(next))
    },
    [key, serializer, storage],
  )

  const remove = useCallback(async () => {
    await storage.removeItem(key)
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, loading, set, remove]
}
