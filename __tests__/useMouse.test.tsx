import { act, renderHook } from '@testing-library/react'
import useMouse from '../src/hooks/useMouse'

describe('useMouse', () => {
  it('updates pointer coordinates on mousemove', () => {
    const { result } = renderHook(() => useMouse())

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 45 }))
    })

    expect(result.current).toEqual({ x: 120, y: 45 })
  })
})
