import { act, renderHook } from '@testing-library/react'
import useWebSocket from '../src/hooks/useWebSocket'

describe('useWebSocket', () => {
  it('opens and sends when ready', () => {
    const send = jest.fn()
    const close = jest.fn()
    const wsInstance: any = {
      readyState: 1,
      send,
      close,
      onopen: null,
      onclose: null,
      onmessage: null,
    }

    ;(globalThis as any).WebSocket = jest.fn(() => wsInstance)
    ;(globalThis as any).WebSocket.OPEN = 1

    const { result } = renderHook(() => useWebSocket('ws://localhost'))

    act(() => {
      wsInstance.onopen?.()
    })
    expect(result.current.status).toBe('OPEN')

    act(() => {
      const ok = result.current.send('hello')
      expect(ok).toBe(true)
    })

    expect(send).toHaveBeenCalledWith('hello')
  })
})
