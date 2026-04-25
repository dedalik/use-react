import { renderHook } from '@testing-library/react'
import useWatchAtMost from '../src/hooks/useWatchAtMost'

describe('useWatchAtMost', () => {
  it('runs callback only up to limit', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchAtMost(value, spy, 2), { initialProps: { value: 1 } })

    rerender({ value: 2 })
    rerender({ value: 3 })
    rerender({ value: 4 })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
