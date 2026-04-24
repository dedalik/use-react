import { useCallback, useMemo } from 'react'
import useWebWorker from './useWebWorker'

export interface UseWebWorkerFnReturn<TInput = unknown, TOutput = unknown> {
  isSupported: boolean
  data: TOutput | null
  error: string | null
  call: (payload: TInput) => boolean
  terminate: () => void
}

/**
 * Runs a function in a worker by stringifying its body.
 */
export default function useWebWorkerFn<TInput = unknown, TOutput = unknown>(
  fn: (payload: TInput) => TOutput,
): UseWebWorkerFnReturn<TInput, TOutput> {
  const script = useMemo(
    () => `self.onmessage = (event) => { const fn = ${fn.toString()}; self.postMessage(fn(event.data)); };`,
    [fn],
  )

  const worker = useWebWorker<TInput, TOutput>(script)

  const call = useCallback((payload: TInput) => worker.post(payload), [worker])

  return {
    isSupported: worker.isSupported,
    data: worker.data,
    error: worker.error,
    call,
    terminate: worker.terminate,
  }
}
