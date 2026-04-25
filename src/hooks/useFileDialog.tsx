import { useCallback, useMemo, useRef, useState } from 'react'

export interface UseFileDialogOptions {
  accept?: string
  multiple?: boolean
  capture?: string
}

export interface UseFileDialogReturn {
  files: File[]
  open: () => void
  reset: () => void
}

/**
 * Opens a hidden file input and exposes selected files.
 */
export default function useFileDialog(options: UseFileDialogOptions = {}): UseFileDialogReturn {
  const { accept, multiple = false, capture } = options
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const ensureInput = useCallback(() => {
    if (inputRef.current) return inputRef.current

    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    input.multiple = multiple
    if (capture) input.setAttribute('capture', capture)
    input.style.display = 'none'

    input.addEventListener('change', () => {
      setFiles(Array.from(input.files ?? []))
    })

    document.body.appendChild(input)
    inputRef.current = input
    return input
  }, [accept, capture, multiple])

  const open = useCallback(() => {
    if (typeof document === 'undefined') return
    ensureInput().click()
  }, [ensureInput])

  const reset = useCallback(() => {
    const input = inputRef.current
    if (!input) return
    input.value = ''
    setFiles([])
  }, [])

  return useMemo(() => ({ files, open, reset }), [files, open, reset])
}
