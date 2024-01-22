import { useEffect } from 'react'

type Fn = () => void

export default function useOnMount(fn: Fn): void {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    }
  }, [fn])
}
