import { renderHook } from '@testing-library/react'
import watchArray from '../src/hooks/watchArray'

describe('watchArray', () => {
  it('reports added and removed items', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => watchArray(value, spy), {
      initialProps: { value: [1, 2] },
    })

    rerender({ value: [2, 3] })

    expect(spy).toHaveBeenLastCalledWith([2, 3], [1, 2], [3], [1])
  })
})
