import { RefObject, useCallback, useEffect, useState } from 'react'

export interface UseDropZoneOptions {
  onDrop?: (files: File[]) => void
}

export interface UseDropZoneReturn {
  isOverDropZone: boolean
  files: File[]
}

/**
 * Tracks drag-over/drop state and files for a target element.
 */
export default function useDropZone(
  target: RefObject<HTMLElement | null>,
  options: UseDropZoneOptions = {},
): UseDropZoneReturn {
  const { onDrop } = options
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragOver = useCallback((event: Event) => {
    const dragEvent = event as unknown as DragEvent
    dragEvent.preventDefault()
    setIsOverDropZone(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsOverDropZone(false)
  }, [])

  const handleDrop = useCallback(
    (event: Event) => {
      const dragEvent = event as unknown as DragEvent
      dragEvent.preventDefault()
      setIsOverDropZone(false)

      const dropped = Array.from(dragEvent.dataTransfer?.files ?? [])
      setFiles(dropped)
      onDrop?.(dropped)
    },
    [onDrop],
  )

  useEffect(() => {
    const node = target.current
    if (!node) return

    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('dragleave', handleDragLeave)
    node.addEventListener('drop', handleDrop)

    return () => {
      node.removeEventListener('dragover', handleDragOver)
      node.removeEventListener('dragleave', handleDragLeave)
      node.removeEventListener('drop', handleDrop)
    }
  }, [handleDragLeave, handleDragOver, handleDrop, target])

  return { isOverDropZone, files }
}
