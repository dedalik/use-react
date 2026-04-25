import { renderHook } from '@testing-library/react'
import useWatchArray from '../src/hooks/useWatchArray'

describe('useWatchArray', () => {
  it('reports added and removed items', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchArray(value, spy), {
      initialProps: { value: [1, 2] },
    })

    rerender({ value: [2, 3] })

    expect(spy).toHaveBeenLastCalledWith([2, 3], [1, 2], [3], [1])
  })
})
