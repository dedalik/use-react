import { act, renderHook } from '@testing-library/react'
import useNavigatorLanguage from '../src/hooks/useNavigatorLanguage'

describe('useNavigatorLanguage', () => {
  it('reads and updates navigator language', () => {
    const original = navigator.language
    Object.defineProperty(navigator, 'language', { configurable: true, value: 'en-US' })

    const { result } = renderHook(() => useNavigatorLanguage())
    expect(result.current).toBe('en-US')

    Object.defineProperty(navigator, 'language', { configurable: true, value: 'fr-FR' })
    act(() => {
      window.dispatchEvent(new Event('languagechange'))
    })

    expect(result.current).toBe('fr-FR')
    Object.defineProperty(navigator, 'language', { configurable: true, value: original })
  })
})
