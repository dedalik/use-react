import { useCallback, useState } from 'react'

export interface UseClipboardItemsReturn {
  isSupported: boolean
  items: ClipboardItem[]
  error: string | null
  read: () => Promise<ClipboardItem[]>
}

/**
 * Reads ClipboardItem entries from the async Clipboard API.
 */
export default function useClipboardItems(): UseClipboardItemsReturn {
  const [items, setItems] = useState<ClipboardItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard?.read

  const read = useCallback(async () => {
    if (!isSupported) return []

    try {
      const next = await navigator.clipboard.read()
      setItems(next)
      setError(null)
      return next
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to read clipboard items'
      setError(message)
      return []
    }
  }, [isSupported])

  return { isSupported, items, error, read }
}
