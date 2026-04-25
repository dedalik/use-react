import { act, renderHook } from '@testing-library/react'
import useWakeLock from '../src/hooks/useWakeLock'

describe('useWakeLock', () => {
  it('requests and releases wake lock when supported', async () => {
    const release = jest.fn(async () => {})
    const request = jest.fn(async () => ({ released: false, release })) as any
    ;(navigator as any).wakeLock = { request }

    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isSupported).toBe(true)

    await act(async () => {
      const ok = await result.current.request()
      expect(ok).toBe(true)
    })
    expect(result.current.isActive).toBe(true)

    await act(async () => {
      await result.current.release()
    })
    expect(result.current.isActive).toBe(false)
  })
})
