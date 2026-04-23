import { useEffect, useState } from 'react'

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

export default function useScript(src?: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!src) return 'idle'
    if (typeof document === 'undefined') return 'loading'
    const existingScript = document.querySelector(`script[src="${src}"]`)
    return existingScript ? 'ready' : 'loading'
  })

  useEffect(() => {
    if (!src || typeof document === 'undefined') return

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    let created = false

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      created = true
      document.body.appendChild(script)
    }

    const onLoad = () => setStatus('ready')
    const onError = () => setStatus('error')

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    setStatus('loading')

    return () => {
      script?.removeEventListener('load', onLoad)
      script?.removeEventListener('error', onError)

      if (created) {
        script?.remove()
      }
    }
  }, [src])

  return status
}
