import { act, renderHook } from '@testing-library/react'
import useWebWorker from '../src/hooks/useWebWorker'

class MockWorker {
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: ErrorEvent) => void) | null = null
  postMessage = jest.fn((value: unknown) => this.onmessage?.({ data: value } as MessageEvent))
  terminate = jest.fn()
}

describe('useWebWorker', () => {
  it('posts and receives messages', () => {
    const browserGlobal = globalThis as any
    browserGlobal.Worker = MockWorker
    browserGlobal.URL.createObjectURL = jest.fn(() => 'blob:worker')
    browserGlobal.URL.revokeObjectURL = jest.fn()

    const { result } = renderHook(() => useWebWorker<number, number>('self.onmessage = () => {}'))

    act(() => {
      result.current.post(10)
    })

    expect(result.current.data).toBe(10)
    expect(result.current.error).toBeNull()
  })
})
