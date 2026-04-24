import { RefObject, useEffect, useState } from 'react'

/**
 * Returns the parent element for a target ref.
 */
export default function useParentElement(target: RefObject<HTMLElement | null>): HTMLElement | null {
  const [parent, setParent] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setParent(target.current?.parentElement ?? null)
  }, [target])

  return parent
}
