import { useCallback, useRef, useState } from 'react'

export interface UseConfirmDialogReturn<T = unknown> {
  isOpen: boolean
  payload: T | null
  reveal: (payload?: T) => Promise<boolean>
  confirm: () => void
  cancel: () => void
}

/**
 * Promise-based confirm dialog state manager.
 */
export default function useConfirmDialog<T = unknown>(): UseConfirmDialogReturn<T> {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<T | null>(null)
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  const closeWith = useCallback((value: boolean) => {
    setIsOpen(false)
    setPayload(null)
    if (resolverRef.current) {
      resolverRef.current(value)
      resolverRef.current = null
    }
  }, [])

  const reveal = useCallback((nextPayload?: T) => {
    setPayload(nextPayload ?? null)
    setIsOpen(true)
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const confirm = useCallback(() => {
    closeWith(true)
  }, [closeWith])

  const cancel = useCallback(() => {
    closeWith(false)
  }, [closeWith])

  return { isOpen, payload, reveal, confirm, cancel }
}
