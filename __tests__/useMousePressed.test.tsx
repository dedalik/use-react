import { act, renderHook } from '@testing-library/react'
import useMousePressed from '../src/hooks/useMousePressed'

describe('useMousePressed', () => {
  it('toggles on pointer down/up', () => {
    const { result } = renderHook(() => useMousePressed())

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'))
    })
    expect(result.current).toBe(false)
  })
})
