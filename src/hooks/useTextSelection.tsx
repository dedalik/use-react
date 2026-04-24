import { useEffect, useState } from 'react'

export interface UseTextSelectionState {
  text: string
  isCollapsed: boolean
}

function readSelection(): UseTextSelectionState {
  if (typeof window === 'undefined') return { text: '', isCollapsed: true }

  const selection = window.getSelection()
  if (!selection) return { text: '', isCollapsed: true }

  return {
    text: selection.toString(),
    isCollapsed: selection.isCollapsed,
  }
}

/**
 * Tracks current document text selection.
 */
export default function useTextSelection(): UseTextSelectionState {
  const [state, setState] = useState<UseTextSelectionState>(() => readSelection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const update = () => setState(readSelection())
    document.addEventListener('selectionchange', update)

    return () => {
      document.removeEventListener('selectionchange', update)
    }
  }, [])

  return state
}
