import { act, renderHook } from '@testing-library/react'
import usePreferredLanguages from '../src/hooks/usePreferredLanguages'

describe('usePreferredLanguages', () => {
  it('reads and updates browser language list', () => {
    const originalLanguages = navigator.languages
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['en-US', 'en'] })

    const { result } = renderHook(() => usePreferredLanguages())
    expect(result.current).toEqual(['en-US', 'en'])

    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['fr-FR'] })
    act(() => {
      window.dispatchEvent(new Event('languagechange'))
    })

    expect(result.current).toEqual(['fr-FR'])
    Object.defineProperty(navigator, 'languages', { configurable: true, value: originalLanguages })
  })
})
