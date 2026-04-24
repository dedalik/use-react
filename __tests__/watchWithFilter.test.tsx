import { renderHook } from '@testing-library/react'
import watchWithFilter from '../src/hooks/watchWithFilter'

describe('watchWithFilter', () => {
  it('runs callback only when filter passes', () => {
    const spy = jest.fn()
    const filter = (next: number) => next % 2 === 0
    const { rerender } = renderHook(({ value }) => watchWithFilter(value, spy, filter), {
      initialProps: { value: 1 },
    })

    rerender({ value: 2 })
    rerender({ value: 3 })
    rerender({ value: 4 })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenLastCalledWith(4, 3)
  })
})
