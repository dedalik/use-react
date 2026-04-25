import { useEffect, useState } from 'react'

function readLanguage(): string {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language || 'en'
}

/**
 * Returns current navigator language and reacts to languagechange.
 */
export default function useNavigatorLanguage(): string {
  const [language, setLanguage] = useState(() => readLanguage())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguage(readLanguage())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return language
}
