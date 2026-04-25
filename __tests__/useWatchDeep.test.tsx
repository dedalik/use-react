import { renderHook } from '@testing-library/react'
import useWatchDeep from '../src/hooks/useWatchDeep'

describe('useWatchDeep', () => {
  it('reacts to deep structural changes', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchDeep(value, spy), {
      initialProps: { value: { a: 1, nested: { b: 2 } } },
    })

    rerender({ value: { a: 1, nested: { b: 2 } } })
    rerender({ value: { a: 1, nested: { b: 3 } } })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
