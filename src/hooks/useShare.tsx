import { useCallback } from 'react'

export interface UseShareData {
  title?: string
  text?: string
  url?: string
}

export interface UseShareReturn {
  isSupported: boolean
  share: (data: UseShareData) => Promise<boolean>
}

/**
 * Wrapper around Web Share API with safe fallback.
 */
export default function useShare(): UseShareReturn {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const share = useCallback(
    async (data: UseShareData) => {
      if (!isSupported) return false

      try {
        await navigator.share(data)
        return true
      } catch {
        return false
      }
    },
    [isSupported],
  )

  return { isSupported, share }
}
