import { RefObject, useEffect, useRef, useState } from 'react'

export interface UseFocusReturn<T extends HTMLElement> {
  focused: boolean
  ref: RefObject<T | null>
}

/**
 * Tracks focus state of a single element via returned ref.
 */
export default function useFocus<T extends HTMLElement = HTMLElement>(): UseFocusReturn<T> {
  const ref = useRef<T | null>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    node.addEventListener('focus', onFocus)
    node.addEventListener('blur', onBlur)

    return () => {
      node.removeEventListener('focus', onFocus)
      node.removeEventListener('blur', onBlur)
    }
  })

  return { focused, ref }
}
