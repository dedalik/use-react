import { renderHook } from '@testing-library/react'
import useMemory from '../src/hooks/useMemory'

describe('useMemory', () => {
  it('reads performance memory snapshot', () => {
    Object.defineProperty(performance, 'memory', {
      configurable: true,
      value: {
        jsHeapSizeLimit: 100,
        totalJSHeapSize: 50,
        usedJSHeapSize: 25,
      },
    })

    const { result } = renderHook(() => useMemory(5000))

    expect(result.current.isSupported).toBe(true)
    expect(result.current.memory?.usedJSHeapSize).toBe(25)
  })
})
