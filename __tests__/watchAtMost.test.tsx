import { renderHook } from '@testing-library/react'
import watchAtMost from '../src/hooks/watchAtMost'

describe('watchAtMost', () => {
  it('runs callback only up to limit', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => watchAtMost(value, spy, 2), { initialProps: { value: 1 } })

    rerender({ value: 2 })
    rerender({ value: 3 })
    rerender({ value: 4 })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
