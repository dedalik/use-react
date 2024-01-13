import { useEffect, useRef, useState, useCallback } from 'react'

interface UseTextareaAutosizeOptions {
  /** Textarea element to autosize. */
  element?: HTMLTextAreaElement | undefined
  /** Textarea content. */
  input?: string | undefined
  /** Function called when the textarea size changes. */
  onResize?: () => void
  /** Specify style target to apply the height based on textarea content. If not provided it will use textarea itself.  */
  styleTarget?: HTMLElement
}

export function useTextareaAutoSize(options?: UseTextareaAutosizeOptions) {
  const [input, setInput] = useState<string | undefined>(options?.input)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const triggerResize = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    let height = ''

    textarea.style.height = '1px'
    const textareaScrollHeight = textarea.scrollHeight

    // If style target is provided update its height
    if (options?.styleTarget) {
      options.styleTarget.style.height = `${textareaScrollHeight}px`
    }
    // else update textarea's height by updating height variable
    else {
      height = `${textareaScrollHeight}px`
    }

    textarea.style.height = height

    options?.onResize?.()
  }, [options])

  useEffect(() => {
    triggerResize()
  }, [input, triggerResize])

  // Updating the local state when the input prop changes
  useEffect(() => {
    setInput(options?.input)
  }, [options?.input])

  // You may need to implement or import a useResizeObserver hook if required
  // useResizeObserver(textareaRef, () => triggerResize());

  return {
    textarea: textareaRef,
    input,
    setInput, // To allow updating the input externally
    triggerResize,
  }
}

export type UseTextareaAutosizeReturn = ReturnType<typeof useTextareaAutoSize>
