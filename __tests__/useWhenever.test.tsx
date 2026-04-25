import { renderHook } from '@testing-library/react'
import useWhenever from '../src/hooks/useWhenever'

describe('useWhenever', () => {
  it('fires only on false -> true transitions', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ condition }) => useWhenever(condition, spy), {
      initialProps: { condition: false },
    })

    rerender({ condition: true })
    rerender({ condition: true })
    rerender({ condition: false })
    rerender({ condition: true })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
