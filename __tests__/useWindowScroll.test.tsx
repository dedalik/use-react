import { act, renderHook } from '@testing-library/react'
import useWindowScroll from '../src/hooks/useWindowScroll'

describe('useWindowScroll', () => {
  it('tracks window scroll offsets', () => {
    const { result } = renderHook(() => useWindowScroll())

    Object.defineProperty(window, 'scrollX', { value: 25, configurable: true })
    Object.defineProperty(window, 'scrollY', { value: 40, configurable: true })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toEqual({ x: 25, y: 40 })
  })
})
