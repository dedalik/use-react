import { renderHook } from '@testing-library/react'
import useWatchOnce from '../src/hooks/useWatchOnce'

describe('useWatchOnce', () => {
  it('fires only once after first change', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchOnce(value, spy), { initialProps: { value: 1 } })

    expect(spy).not.toHaveBeenCalled()

    rerender({ value: 2 })
    rerender({ value: 3 })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)
  })
})
