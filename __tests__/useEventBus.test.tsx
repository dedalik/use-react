import { act, renderHook } from '@testing-library/react'
import useEventBus from '../src/hooks/useEventBus'

describe('useEventBus', () => {
  it('subscribes and emits payloads', () => {
    const { result } = renderHook(() => useEventBus<string>('topic-a'))
    const handler = jest.fn()

    const unsubscribe = result.current.on(handler)

    act(() => {
      result.current.emit('hello')
    })

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenLastCalledWith('hello')

    unsubscribe()
    act(() => {
      result.current.emit('again')
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
