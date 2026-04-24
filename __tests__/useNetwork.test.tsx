import { act, renderHook } from '@testing-library/react'
import useNetwork from '../src/hooks/useNetwork'

describe('useNetwork', () => {
  it('reflects online status changes', () => {
    const { result } = renderHook(() => useNetwork())

    Object.defineProperty(navigator, 'onLine', { configurable: true, value: false })
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(result.current.online).toBe(false)

    Object.defineProperty(navigator, 'onLine', { configurable: true, value: true })
    act(() => {
      window.dispatchEvent(new Event('online'))
    })
    expect(result.current.online).toBe(true)
  })
})
