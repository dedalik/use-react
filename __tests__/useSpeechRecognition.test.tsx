import { renderHook } from '@testing-library/react'
import useSpeechRecognition from '../src/hooks/useSpeechRecognition'

describe('useSpeechRecognition', () => {
  it('exposes unsupported state when api is missing', () => {
    const speechWindow = window as Window & { webkitSpeechRecognition?: unknown }
    const original = speechWindow.webkitSpeechRecognition
    speechWindow.webkitSpeechRecognition = undefined

    const { result } = renderHook(() => useSpeechRecognition())
    expect(result.current.isSupported).toBe(false)
    expect(result.current.transcript).toBe('')

    speechWindow.webkitSpeechRecognition = original
  })
})
