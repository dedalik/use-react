import { act, renderHook } from '@testing-library/react'
import { useDebounce } from '../src'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: 'a' },
    })

    expect(result.current).toBe('a')
  })

  it('updates value only after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(result.current).toBe('ab')
  })
})
