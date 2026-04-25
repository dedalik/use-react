import { RefObject, useEffect, useRef, useState } from 'react'

export interface UseFocusWithinReturn<T extends HTMLElement> {
  focused: boolean
  ref: RefObject<T | null>
}

/**
 * Tracks whether container or any descendant has focus.
 */
export default function useFocusWithin<T extends HTMLElement = HTMLElement>(): UseFocusWithinReturn<T> {
  const ref = useRef<T | null>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocusIn = () => setFocused(true)
    const onFocusOut = () => {
      const active = document.activeElement
      setFocused(Boolean(active && node.contains(active)))
    }

    node.addEventListener('focusin', onFocusIn)
    node.addEventListener('focusout', onFocusOut)

    return () => {
      node.removeEventListener('focusin', onFocusIn)
      node.removeEventListener('focusout', onFocusOut)
    }
  })

  return { focused, ref }
}
