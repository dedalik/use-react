import { useCallback, useState } from 'react'

export interface UseFileSystemAccessReturn {
  isSupported: boolean
  fileName: string | null
  content: string | null
  error: string | null
  open: () => Promise<boolean>
  saveAs: (name: string, data: string) => Promise<boolean>
}

/**
 * Minimal File System Access API helper for reading/saving text files.
 */
export default function useFileSystemAccess(): UseFileSystemAccessReturn {
  const [fileName, setFileName] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const browserWindow =
    typeof window !== 'undefined'
      ? (window as unknown as Window & {
          showOpenFilePicker?: () => Promise<Array<{ getFile: () => Promise<File> }>>
          showSaveFilePicker?: (options: { suggestedName: string }) => Promise<{
            createWritable: () => Promise<{ write: (value: string) => Promise<void>; close: () => Promise<void> }>
          }>
        })
      : undefined
  const isSupported = !!browserWindow?.showOpenFilePicker && !!browserWindow?.showSaveFilePicker

  const open = useCallback(async () => {
    if (!isSupported) return false

    try {
      const picker = browserWindow?.showOpenFilePicker
      if (!picker) return false
      const [handle] = await picker()
      const file = await handle.getFile()
      setFileName(file.name)
      setContent(await file.text())
      setError(null)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open file'
      setError(message)
      return false
    }
  }, [browserWindow, isSupported])

  const saveAs = useCallback(
    async (name: string, data: string) => {
      if (!isSupported) return false

      try {
        const picker = browserWindow?.showSaveFilePicker
        if (!picker) return false
        const handle = await picker({ suggestedName: name })
        const writable = await handle.createWritable()
        await writable.write(data)
        await writable.close()
        setFileName(name)
        setContent(data)
        setError(null)
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save file'
        setError(message)
        return false
      }
    },
    [browserWindow, isSupported],
  )

  return { isSupported, fileName, content, error, open, saveAs }
}
