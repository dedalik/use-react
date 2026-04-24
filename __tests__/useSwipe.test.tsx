import { act, renderHook } from '@testing-library/react'
import useSwipe from '../src/hooks/useSwipe'

describe('useSwipe', () => {
  it('detects horizontal swipe direction', () => {
    const { result } = renderHook(() => useSwipe(20))
    const touchStart = new Event('touchstart') as TouchEvent
    Object.defineProperty(touchStart, 'touches', {
      value: [{ clientX: 10, clientY: 10 }],
    })

    act(() => {
      window.dispatchEvent(touchStart)
    })

    const touchEnd = new Event('touchend') as TouchEvent
    Object.defineProperty(touchEnd, 'changedTouches', {
      value: [{ clientX: 100, clientY: 10 }],
    })

    act(() => {
      window.dispatchEvent(touchEnd)
    })

    expect(result.current.direction).toBe('right')
    expect(result.current.isSwiping).toBe(false)
  })
})
