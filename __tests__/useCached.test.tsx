import { renderHook } from '@testing-library/react'
import useCached from '../src/hooks/useCached'

describe('useCached', () => {
  it('memoizes factory result by deps', () => {
    const factory = jest.fn((value: number) => value * 2)
    const { result, rerender } = renderHook(({ value }) => useCached(() => factory(value), [value]), {
      initialProps: { value: 2 },
    })

    expect(result.current).toBe(4)
    expect(factory).toHaveBeenCalledTimes(1)

    rerender({ value: 2 })
    expect(factory).toHaveBeenCalledTimes(1)

    rerender({ value: 3 })
    expect(result.current).toBe(6)
    expect(factory).toHaveBeenCalledTimes(2)
  })
})
