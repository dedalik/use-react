import { act, renderHook } from '@testing-library/react'
import useWindowFocus from '../src/hooks/useWindowFocus'

describe('useWindowFocus', () => {
  it('updates focus state on focus and blur events', () => {
    const { result } = renderHook(() => useWindowFocus())

    act(() => {
      window.dispatchEvent(new Event('blur'))
    })
    expect(result.current).toBe(false)

    act(() => {
      window.dispatchEvent(new Event('focus'))
    })
    expect(result.current).toBe(true)
  })
})
