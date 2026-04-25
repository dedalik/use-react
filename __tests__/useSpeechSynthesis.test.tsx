import { act, renderHook } from '@testing-library/react'
import useSpeechSynthesis from '../src/hooks/useSpeechSynthesis'

describe('useSpeechSynthesis', () => {
  it('speaks and cancels when supported', () => {
    const speak = jest.fn()
    const cancel = jest.fn()
    const synthWindow = window as Window & {
      speechSynthesis: SpeechSynthesis
      SpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance
    }

    synthWindow.speechSynthesis = {
      speaking: false,
      speak,
      cancel,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as unknown as SpeechSynthesis

    synthWindow.SpeechSynthesisUtterance = class {
      text: string
      lang = ''
      pitch = 1
      rate = 1
      volume = 1
      onstart: (() => void) | null = null
      onend: (() => void) | null = null
      onerror: (() => void) | null = null
      constructor(text: string) {
        this.text = text
      }
    } as unknown as typeof SpeechSynthesisUtterance

    const { result } = renderHook(() => useSpeechSynthesis())
    expect(result.current.isSupported).toBe(true)

    act(() => {
      const ok = result.current.speak('hello')
      expect(ok).toBe(true)
    })

    act(() => {
      result.current.cancel()
    })

    expect(speak).toHaveBeenCalledTimes(1)
    expect(cancel).toHaveBeenCalledTimes(1)
  })
})
