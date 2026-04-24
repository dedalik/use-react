import { renderHook } from '@testing-library/react'
import usePerformanceObserver from '../src/hooks/usePerformanceObserver'

class MockPerformanceObserver {
  callback: (list: { getEntries: () => PerformanceEntry[] }) => void

  constructor(callback: (list: { getEntries: () => PerformanceEntry[] }) => void) {
    this.callback = callback
  }

  observe() {
    this.callback({ getEntries: () => [{ name: 'mark-a' } as PerformanceEntry] })
  }

  disconnect() {}
}

describe('usePerformanceObserver', () => {
  it('collects emitted performance entries', () => {
    const globalObj = globalThis as typeof globalThis & { PerformanceObserver: typeof PerformanceObserver }
    globalObj.PerformanceObserver = MockPerformanceObserver as unknown as typeof PerformanceObserver

    const options = { entryTypes: ['mark'] }
    const { result } = renderHook(() => usePerformanceObserver(options))

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].name).toBe('mark-a')
  })
})
