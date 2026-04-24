import { renderHook } from '@testing-library/react'
import whenever from '../src/hooks/whenever'

describe('whenever', () => {
  it('fires only on false -> true transitions', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ condition }) => whenever(condition, spy), {
      initialProps: { condition: false },
    })

    rerender({ condition: true })
    rerender({ condition: true })
    rerender({ condition: false })
    rerender({ condition: true })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
