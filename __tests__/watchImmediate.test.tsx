import { renderHook } from '@testing-library/react'
import watchImmediate from '../src/hooks/watchImmediate'

describe('watchImmediate', () => {
  it('runs on mount and updates with previous value', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => watchImmediate(value, spy), { initialProps: { value: 1 } })

    expect(spy).toHaveBeenCalledWith(1, undefined)

    rerender({ value: 2 })
    expect(spy).toHaveBeenLastCalledWith(2, 1)
  })
})
