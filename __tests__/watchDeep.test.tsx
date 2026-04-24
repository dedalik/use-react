import { renderHook } from '@testing-library/react'
import watchDeep from '../src/hooks/watchDeep'

describe('watchDeep', () => {
  it('reacts to deep structural changes', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => watchDeep(value, spy), {
      initialProps: { value: { a: 1, nested: { b: 2 } } },
    })

    rerender({ value: { a: 1, nested: { b: 2 } } })
    rerender({ value: { a: 1, nested: { b: 3 } } })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
