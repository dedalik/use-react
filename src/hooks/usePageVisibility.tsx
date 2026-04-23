import { useEffect, useState } from 'react'

const getVisibility = (): boolean => {
  if (typeof document === 'undefined') return true
  return !document.hidden
}

export default function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(() => getVisibility())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onVisibilityChange = () => {
      setIsVisible(getVisibility())
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}
