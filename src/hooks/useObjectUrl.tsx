import { useEffect, useState } from 'react'

/**
 * Creates and revokes an object URL for Blob/File-like input.
 */
export default function useObjectUrl(object: Blob | MediaSource | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!object) {
      setUrl(null)
      return
    }

    const nextUrl = URL.createObjectURL(object)
    setUrl(nextUrl)

    return () => {
      URL.revokeObjectURL(nextUrl)
    }
  }, [object])

  return url
}
