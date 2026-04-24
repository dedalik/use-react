import { act, renderHook } from '@testing-library/react'
import useEventSource from '../src/hooks/useEventSource'

describe('useEventSource', () => {
  it('tracks open and message states', () => {
    const close = jest.fn()
    const sourceInstance: any = {
      onopen: null,
      onmessage: null,
      onerror: null,
      close,
    }

    ;(globalThis as any).EventSource = jest.fn(() => sourceInstance)

    const { result } = renderHook(() => useEventSource('/events'))

    act(() => {
      sourceInstance.onopen?.()
      sourceInstance.onmessage?.({ data: 'ping' })
    })

    expect(result.current.status).toBe('OPEN')
    expect(result.current.data).toBe('ping')
  })
})
