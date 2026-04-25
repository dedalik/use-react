import { act, renderHook } from '@testing-library/react'
import useDevicePixelRatio from '../src/hooks/useDevicePixelRatio'

describe('useDevicePixelRatio', () => {
  it('reads and updates ratio on resize', () => {
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 })
    const { result } = renderHook(() => useDevicePixelRatio())
    expect(result.current).toBe(2)

    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1.5 })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(1.5)
  })
})
