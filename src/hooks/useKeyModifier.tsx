import { useEffect, useState } from 'react'

export interface UseKeyModifierState {
  alt: boolean
  ctrl: boolean
  meta: boolean
  shift: boolean
}

function fromEvent(event: KeyboardEvent): UseKeyModifierState {
  return {
    alt: event.altKey,
    ctrl: event.ctrlKey,
    meta: event.metaKey,
    shift: event.shiftKey,
  }
}

/**
 * Tracks active keyboard modifier keys.
 */
export default function useKeyModifier(): UseKeyModifierState {
  const [state, setState] = useState<UseKeyModifierState>({ alt: false, ctrl: false, meta: false, shift: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onKeyDown = (event: KeyboardEvent) => setState(fromEvent(event))
    const onKeyUp = (event: KeyboardEvent) => setState(fromEvent(event))
    const onBlur = () => setState({ alt: false, ctrl: false, meta: false, shift: false })

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return state
}
