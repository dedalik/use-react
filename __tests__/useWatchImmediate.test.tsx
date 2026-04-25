import { renderHook } from '@testing-library/react'
import useWatchImmediate from '../src/hooks/useWatchImmediate'

describe('useWatchImmediate', () => {
  it('runs on mount and updates with previous value', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchImmediate(value, spy), { initialProps: { value: 1 } })

    expect(spy).toHaveBeenCalledWith(1, undefined)

    rerender({ value: 2 })
    expect(spy).toHaveBeenLastCalledWith(2, 1)
  })
})
