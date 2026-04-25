import { RefObject, useEffect, useState } from 'react'

/**
 * Tracks hover state for a target element ref.
 */
export default function useElementHover(target: RefObject<HTMLElement | null>): boolean {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)

    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [target])

  return hovered
}
