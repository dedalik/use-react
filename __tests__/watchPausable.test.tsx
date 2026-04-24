import { act, renderHook } from '@testing-library/react'
import watchPausable from '../src/hooks/watchPausable'

describe('watchPausable', () => {
  it('can pause and resume callback execution', () => {
    const spy = jest.fn()
    const { result, rerender } = renderHook(({ value }) => watchPausable(value, spy), { initialProps: { value: 1 } })

    expect(spy).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.pause()
    })
    rerender({ value: 2 })
    expect(spy).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.resume()
    })
    rerender({ value: 3 })
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenLastCalledWith(3, 2)
  })
})
