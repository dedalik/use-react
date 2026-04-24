import { useCallback, useMemo, useRef, useState } from 'react'

interface SpeechRecognitionLike extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

export interface UseSpeechRecognitionReturn {
  isSupported: boolean
  listening: boolean
  transcript: string
  error: string | null
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * Speech recognition wrapper with transcript state.
 */
export default function useSpeechRecognition(lang = 'en-US'): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  const RecognitionCtor = useMemo(() => {
    if (typeof window === 'undefined') return null
    return (
      (
        window as Window & {
          SpeechRecognition?: new () => SpeechRecognitionLike
          webkitSpeechRecognition?: new () => SpeechRecognitionLike
        }
      ).SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition ||
      null
    )
  }, [])

  const isSupported = Boolean(RecognitionCtor)

  const ensureInstance = useCallback(() => {
    if (!RecognitionCtor) return null
    if (recognitionRef.current) return recognitionRef.current

    const instance = new RecognitionCtor()
    instance.lang = lang
    instance.continuous = true
    instance.interimResults = true

    instance.onresult = (event) => {
      const parts: string[] = []
      for (let i = 0; i < event.results.length; i += 1) {
        const alt = event.results[i]
        if (alt && alt[0]) parts.push(alt[0].transcript)
      }
      setTranscript(parts.join(' ').trim())
    }

    instance.onerror = (event) => {
      setError(event.error)
    }

    instance.onend = () => setListening(false)

    recognitionRef.current = instance
    return instance
  }, [RecognitionCtor, lang])

  const start = useCallback(() => {
    const instance = ensureInstance()
    if (!instance) return
    setError(null)
    instance.start()
    setListening(true)
  }, [ensureInstance])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return { isSupported, listening, transcript, error, start, stop, reset }
}
