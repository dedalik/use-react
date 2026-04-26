import { useEffect, useRef } from 'react'

type Fn = () => void

/**
 * Runs a callback once after mount. Uses the `fn` from the first render; it is not re-run when the
 * function’s identity changes (unlike `useEffect(..., [fn])`, which re-fires for inline functions).
 * A ref avoids a second `fn()` in React 18 dev StrictMode’s double effect pass.
 */
export default function useOnMount(fn: Fn): void {
  const didRun = useRef(false)
  useEffect(() => {
    if (didRun.current) {
      return
    }
    didRun.current = true
    if (typeof fn === 'function') {
      fn()
    }
    // Mount only - an inline `fn` must not retrigger this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
