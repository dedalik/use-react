import { act, renderHook } from '@testing-library/react'
import { useAbortController } from '../src'

describe('useAbortController', () => {
  it('creates an AbortController with signal', () => {
    const { result } = renderHook(() => useAbortController())

    expect(result.current.controller).toBeInstanceOf(AbortController)
    expect(result.current.signal).toBeTruthy()
    expect(result.current.signal?.aborted).toBe(false)
  })

  it('aborts current controller and renews it', () => {
    const { result } = renderHook(() => useAbortController())
    const firstSignal = result.current.signal

    act(() => {
      result.current.abort()
    })

    expect(firstSignal?.aborted).toBe(true)
    expect(result.current.signal?.aborted).toBe(false)
  })

  it('aborts previous signal when renew is called', () => {
    const { result } = renderHook(() => useAbortController())
    const firstSignal = result.current.signal

    act(() => {
      result.current.renew()
    })

    expect(firstSignal?.aborted).toBe(true)
    expect(result.current.signal?.aborted).toBe(false)
  })
})
