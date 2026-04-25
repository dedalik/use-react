import { act, renderHook } from '@testing-library/react'
import useMagicKeys from '../src/hooks/useMagicKeys'

describe('useMagicKeys', () => {
  it('tracks key down and up states', () => {
    const { result } = renderHook(() => useMagicKeys())

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    })
    expect(result.current.a).toBe(true)

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }))
    })
    expect(result.current.a).toBe(false)
  })
})
