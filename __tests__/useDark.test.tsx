import { act, renderHook } from '@testing-library/react'
import useDark from '../src/hooks/useDark'

describe('useDark', () => {
  it('toggles dark state and classes', () => {
    const { result } = renderHook(() => useDark({ storageKey: 'test-dark-mode' }))

    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1](false)
    })
    expect(result.current[0]).toBe(false)
  })
})
