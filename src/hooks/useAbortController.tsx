import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseAbortControllerReturn {
  controller: AbortController | null
  signal: AbortSignal | null
  renew: () => AbortController | null
  abort: () => void
}

const hasAbortController = typeof AbortController !== 'undefined'

function createController(): AbortController | null {
  return hasAbortController ? new AbortController() : null
}

/**
 * Provides an AbortController lifecycle that auto-aborts on unmount.
 */
export default function useAbortController(): UseAbortControllerReturn {
  const [controller, setController] = useState<AbortController | null>(() => createController())

  const renew = useCallback((): AbortController | null => {
    const nextController = createController()

    setController((currentController) => {
      currentController?.abort()
      return nextController
    })

    return nextController
  }, [])

  const abort = useCallback(() => {
    setController((currentController) => {
      currentController?.abort()
      return createController()
    })
  }, [])

  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return useMemo(
    () => ({
      controller,
      signal: controller?.signal ?? null,
      renew,
      abort,
    }),
    [abort, controller, renew],
  )
}
