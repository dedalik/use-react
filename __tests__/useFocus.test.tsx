import { act, renderHook } from '@testing-library/react'
import useFocus from '../src/hooks/useFocus'

describe('useFocus', () => {
  it('tracks focus state for bound element', () => {
    const { result, rerender } = renderHook(() => useFocus<HTMLInputElement>())
    const input = document.createElement('input')
    ;(result.current.ref as { current: HTMLInputElement | null }).current = input
    rerender()

    act(() => {
      input.dispatchEvent(new FocusEvent('focus'))
    })
    expect(result.current.focused).toBe(true)

    act(() => {
      input.dispatchEvent(new FocusEvent('blur'))
    })
    expect(result.current.focused).toBe(false)
  })
})
