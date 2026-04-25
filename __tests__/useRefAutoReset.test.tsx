import { act, renderHook } from '@testing-library/react'
import useRefAutoReset from '../src/hooks/useRefAutoReset'

describe('useRefAutoReset', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('resets to initial value after timeout', () => {
    const { result } = renderHook(() => useRefAutoReset(1, 100))

    act(() => {
      result.current.set(5)
    })
    expect(result.current.value).toBe(5)

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.value).toBe(1)
  })
})
