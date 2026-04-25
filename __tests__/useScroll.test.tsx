import { act, renderHook } from '@testing-library/react'
import useScroll from '../src/hooks/useScroll'

describe('useScroll', () => {
  it('updates scroll position on scroll event', () => {
    Object.defineProperty(window, 'scrollX', { configurable: true, value: 10 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 20 })

    const { result } = renderHook(() => useScroll())
    expect(result.current).toEqual({ x: 10, y: 20 })

    Object.defineProperty(window, 'scrollX', { configurable: true, value: 70 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 140 })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toEqual({ x: 70, y: 140 })
  })
})
