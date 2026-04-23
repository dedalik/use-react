import { useEffect } from 'react'

export default function useTitle(title: string, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousTitle = document.title
    document.title = title

    if (!restoreOnUnmount) return

    return () => {
      document.title = previousTitle
    }
  }, [restoreOnUnmount, title])
}
