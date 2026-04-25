import { useEffect, useMemo, useState } from 'react'

export interface UseImageOptions {
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  referrerPolicy?: ReferrerPolicy
}

export interface UseImageReturn {
  isLoading: boolean
  error: string | null
  image: HTMLImageElement | null
}

/**
 * Loads an image source and tracks loading/error state.
 */
export default function useImage(src: string, options: UseImageOptions = {}): UseImageReturn {
  const { crossOrigin, referrerPolicy } = options
  const [isLoading, setIsLoading] = useState(Boolean(src))
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      setError(null)
      setImage(null)
      return
    }

    let cancelled = false
    const img = new Image()
    if (crossOrigin !== undefined) img.crossOrigin = crossOrigin
    if (referrerPolicy !== undefined) img.referrerPolicy = referrerPolicy

    setIsLoading(true)
    setError(null)

    img.onload = () => {
      if (cancelled) return
      setImage(img)
      setIsLoading(false)
    }

    img.onerror = () => {
      if (cancelled) return
      setError(`Failed to load image: ${src}`)
      setIsLoading(false)
      setImage(null)
    }

    img.src = src

    return () => {
      cancelled = true
    }
  }, [crossOrigin, referrerPolicy, src])

  return useMemo(() => ({ isLoading, error, image }), [error, image, isLoading])
}
