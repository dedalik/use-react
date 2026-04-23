import { useEffect, useState } from 'react'

export interface WindowSize {
  width: number
  height: number
}

const isBrowser = typeof window !== 'undefined'

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }))

  useEffect(() => {
    if (!isBrowser) return

    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
