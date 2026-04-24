import { act, renderHook } from '@testing-library/react'
import createGlobalState from '../src/hooks/createGlobalState'

describe('createGlobalState', () => {
  it('shares state across hook consumers', () => {
    const useCounter = createGlobalState(0)

    const first = renderHook(() => useCounter())
    const second = renderHook(() => useCounter())

    expect(first.result.current[0]).toBe(0)
    expect(second.result.current[0]).toBe(0)

    act(() => {
      first.result.current[1]((prev) => prev + 1)
    })

    expect(first.result.current[0]).toBe(1)
    expect(second.result.current[0]).toBe(1)
  })
})
