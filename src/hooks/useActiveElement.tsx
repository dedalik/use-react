import { useEffect, useState } from 'react'

/**
 * Tracks current document.activeElement.
 */
export default function useActiveElement(): Element | null {
  const [activeElement, setActiveElement] = useState<Element | null>(() =>
    typeof document !== 'undefined' ? document.activeElement : null,
  )

  useEffect(() => {
    const update = () => setActiveElement(document.activeElement)

    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)

    return () => {
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
    }
  }, [])

  return activeElement
}
