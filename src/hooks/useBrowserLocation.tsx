import { useEffect, useState } from 'react'

export interface BrowserLocationState {
  href: string
  pathname: string
  search: string
  hash: string
}

const emptyLocation: BrowserLocationState = {
  href: '',
  pathname: '',
  search: '',
  hash: '',
}

function readLocation(): BrowserLocationState {
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

/**
 * Tracks browser location changes from history and hash events.
 */
export default function useBrowserLocation(): BrowserLocationState {
  const [state, setState] = useState<BrowserLocationState>(() =>
    typeof window === 'undefined' ? emptyLocation : readLocation(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readLocation())
    update()

    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [])

  return state
}
