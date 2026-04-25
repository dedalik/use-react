import { act, renderHook } from '@testing-library/react'
import useWatchTriggerable from '../src/hooks/useWatchTriggerable'

describe('useWatchTriggerable', () => {
  it('supports manual trigger with override value', () => {
    const spy = jest.fn()
    const { result } = renderHook(({ value }) => useWatchTriggerable(value, spy), { initialProps: { value: 1 } })

    act(() => {
      result.current.trigger(5)
    })

    expect(spy.mock.calls.some((call) => call[0] === 5)).toBe(true)
  })
})
