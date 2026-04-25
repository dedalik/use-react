import { RefObject, useEffect, useState } from 'react'

export interface ElementBounding {
  x: number
  y: number
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

const initialBounding: ElementBounding = {
  x: 0,
  y: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
}

/**
 * Tracks element bounding client rect values.
 */
export default function useElementBounding(target: RefObject<HTMLElement | null>): ElementBounding {
  const [rect, setRect] = useState<ElementBounding>(initialBounding)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const update = () => {
      const r = node.getBoundingClientRect()
      setRect({
        x: r.x,
        y: r.y,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
        left: r.left,
        width: r.width,
        height: r.height,
      })
    }

    update()

    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update)
      observer.observe(node)
    }

    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [target])

  return rect
}
