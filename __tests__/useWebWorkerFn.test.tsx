import { act, renderHook } from '@testing-library/react'
import useWebWorkerFn from '../src/hooks/useWebWorkerFn'

class MockWorker {
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: ErrorEvent) => void) | null = null
  postMessage = jest.fn((value: number) => this.onmessage?.({ data: value * 2 } as MessageEvent))
  terminate = jest.fn()
}

describe('useWebWorkerFn', () => {
  it('calls worker-backed function and returns data', () => {
    const browserGlobal = globalThis as any
    browserGlobal.Worker = MockWorker
    browserGlobal.URL.createObjectURL = jest.fn(() => 'blob:worker-fn')
    browserGlobal.URL.revokeObjectURL = jest.fn()

    const { result } = renderHook(() => useWebWorkerFn<number, number>((value) => value * 2))

    act(() => {
      result.current.call(4)
    })

    expect(result.current.data).toBe(8)
  })
})
