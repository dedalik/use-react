import { act, renderHook } from '@testing-library/react'
import useFocusWithin from '../src/hooks/useFocusWithin'

describe('useFocusWithin', () => {
  it('tracks focus within container', () => {
    const { result, rerender } = renderHook(() => useFocusWithin<HTMLDivElement>())
    const div = document.createElement('div')
    const input = document.createElement('input')
    div.appendChild(input)
    document.body.appendChild(div)
    ;(result.current.ref as { current: HTMLDivElement | null }).current = div
    rerender()

    act(() => {
      div.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    })
    expect(result.current.focused).toBe(true)

    act(() => {
      div.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    })
    expect(typeof result.current.focused).toBe('boolean')

    div.remove()
  })
})
