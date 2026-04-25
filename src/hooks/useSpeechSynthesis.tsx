import { useCallback, useEffect, useState } from 'react'

export interface UseSpeechSynthesisOptions {
  lang?: string
  pitch?: number
  rate?: number
  volume?: number
}

export interface UseSpeechSynthesisReturn {
  isSupported: boolean
  speaking: boolean
  speak: (text: string) => boolean
  cancel: () => void
}

/**
 * Speech synthesis wrapper with speaking state.
 */
export default function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}): UseSpeechSynthesisReturn {
  const { lang = 'en-US', pitch = 1, rate = 1, volume = 1 } = options
  const [speaking, setSpeaking] = useState(false)

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

  useEffect(() => {
    if (!isSupported) return

    const update = () => setSpeaking(window.speechSynthesis.speaking)
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [isSupported])

  const speak = useCallback(
    (text: string): boolean => {
      if (!isSupported || !text.trim()) return false

      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.pitch = pitch
        utterance.rate = rate
        utterance.volume = volume
        utterance.onstart = () => setSpeaking(true)
        utterance.onend = () => setSpeaking(false)
        utterance.onerror = () => setSpeaking(false)

        window.speechSynthesis.speak(utterance)
        return true
      } catch {
        return false
      }
    },
    [isSupported, lang, pitch, rate, volume],
  )

  const cancel = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [isSupported])

  return { isSupported, speaking, speak, cancel }
}
