import { useEffect, useState } from 'react'

function readLanguages(): string[] {
  if (typeof navigator === 'undefined') return ['en']
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) return [...navigator.languages]
  return [navigator.language || 'en']
}

/**
 * Returns preferred browser languages and reacts to languagechange.
 */
export default function usePreferredLanguages(): string[] {
  const [languages, setLanguages] = useState<string[]>(() => readLanguages())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguages(readLanguages())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return languages
}
