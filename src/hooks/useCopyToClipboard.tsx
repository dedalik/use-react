import { useCallback, useState } from 'react'

type CopyFn = (value: string) => Promise<boolean>

export default function useCopyToClipboard(): [string, CopyFn] {
  const [copiedText, setCopiedText] = useState('')

  const copy: CopyFn = useCallback(async (value) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedText(value)
      return true
    } catch {
      return false
    }
  }, [])

  return [copiedText, copy]
}
