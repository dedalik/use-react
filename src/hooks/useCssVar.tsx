import { RefObject, useEffect, useState } from 'react'

/**
 * Reads and updates a CSS custom property on a target element.
 */
export default function useCssVar(
  name: string,
  target?: RefObject<HTMLElement | null>,
): [string, (next: string) => void] {
  const [value, setValue] = useState('')

  useEffect(() => {
    const node = target?.current ?? document.documentElement
    const next = getComputedStyle(node).getPropertyValue(name).trim()
    setValue(next)
  }, [name, target])

  const update = (next: string) => {
    const node = target?.current ?? document.documentElement
    node.style.setProperty(name, next)
    setValue(next)
  }

  return [value, update]
}
