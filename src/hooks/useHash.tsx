import { useCallback, useEffect, useState } from 'react'

/**
 * Reads and writes `window.location.hash`, keeping React state in sync via the `hashchange` event.
 */
export default function useHash(): [string, (newHash: string) => void] {
  const [hash, setLocalHash] = useState<string>(() => (typeof window === 'undefined' ? '' : window.location.hash))

  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [onHashChange])

  const setHash = useCallback((newHash: string) => {
    if (typeof window === 'undefined') return
    if (newHash !== window.location.hash) {
      window.location.hash = newHash
    }
  }, [])

  return [hash, setHash]
}
