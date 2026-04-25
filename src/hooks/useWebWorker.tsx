import { useEffect, useRef, useState } from 'react'

export interface UseWebWorkerReturn<TInput = unknown, TOutput = unknown> {
  isSupported: boolean
  data: TOutput | null
  error: string | null
  post: (payload: TInput) => boolean
  terminate: () => void
}

/**
 * Creates a worker from source string and tracks latest message/error.
 */
export default function useWebWorker<TInput = unknown, TOutput = unknown>(
  script: string,
): UseWebWorkerReturn<TInput, TOutput> {
  const workerRef = useRef<Worker | null>(null)
  const [data, setData] = useState<TOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof Worker !== 'undefined' && typeof URL !== 'undefined'

  useEffect(() => {
    if (!isSupported || !script) return

    const blob = new Blob([script], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    workerRef.current = worker

    worker.onmessage = (event) => setData(event.data as TOutput)
    worker.onerror = (event) => setError(event.message || 'Worker execution failed')

    return () => {
      worker.terminate()
      workerRef.current = null
      URL.revokeObjectURL(url)
    }
  }, [isSupported, script])

  const post = (payload: TInput) => {
    const worker = workerRef.current
    if (!worker) return false
    worker.postMessage(payload)
    return true
  }

  const terminate = () => {
    workerRef.current?.terminate()
    workerRef.current = null
  }

  return { isSupported, data, error, post, terminate }
}
