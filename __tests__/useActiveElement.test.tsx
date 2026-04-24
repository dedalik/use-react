import { act, renderHook } from '@testing-library/react'
import useActiveElement from '../src/hooks/useActiveElement'

describe('useActiveElement', () => {
  it('tracks active element changes', () => {
    const input = document.createElement('input')
    document.body.appendChild(input)

    const { result } = renderHook(() => useActiveElement())

    act(() => {
      input.focus()
      document.dispatchEvent(new Event('focusin'))
    })

    expect(result.current).toBe(input)
  })
})
