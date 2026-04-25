import { useEffect, useState } from 'react'

export interface UseStyleTagReturn {
  id: string | null
  loaded: boolean
  error: boolean
}

/**
 * Injects a style tag into document head.
 */
export default function useStyleTag(css?: string): UseStyleTagReturn {
  const [state, setState] = useState<UseStyleTagReturn>({ id: null, loaded: false, error: false })

  useEffect(() => {
    if (!css || typeof document === 'undefined') {
      setState({ id: null, loaded: false, error: false })
      return undefined
    }

    try {
      const id = `use-react-style-${Math.random().toString(36).slice(2, 10)}`
      const style = document.createElement('style')
      style.id = id
      style.textContent = css
      document.head.appendChild(style)
      setState({ id, loaded: true, error: false })

      return () => {
        style.remove()
      }
    } catch {
      setState({ id: null, loaded: false, error: true })
      return undefined
    }
  }, [css])

  return state
}
