import { act, renderHook } from '@testing-library/react'
import useKeyModifier from '../src/hooks/useKeyModifier'

describe('useKeyModifier', () => {
  it('tracks modifier keys from keyboard events', () => {
    const { result } = renderHook(() => useKeyModifier())

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true }))
    })

    expect(result.current.ctrl).toBe(true)
    expect(result.current.shift).toBe(true)

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup'))
    })

    expect(result.current.ctrl).toBe(false)
    expect(result.current.shift).toBe(false)
  })
})
