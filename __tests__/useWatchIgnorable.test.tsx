import { act, renderHook } from '@testing-library/react'
import useWatchIgnorable from '../src/hooks/useWatchIgnorable'

describe('useWatchIgnorable', () => {
  it('skips callback while updates are ignored', () => {
    const spy = jest.fn()
    const { result, rerender } = renderHook(({ value }) => useWatchIgnorable(value, spy), {
      initialProps: { value: 1 },
    })

    expect(spy).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.ignoreUpdates(() => {
        rerender({ value: 2 })
      })
    })

    expect(spy).toHaveBeenCalledTimes(1)

    rerender({ value: 3 })
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
