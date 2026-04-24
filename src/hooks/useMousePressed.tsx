import { useEffect, useState } from 'react'

/**
 * Tracks whether primary pointer is currently pressed.
 */
export default function useMousePressed(): boolean {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('blur', onUp)

    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('blur', onUp)
    }
  }, [])

  return pressed
}
