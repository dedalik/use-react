import { act, renderHook } from '@testing-library/react'
import usePermission from '../src/hooks/usePermission'

describe('usePermission', () => {
  it('reads permission state when permissions API is available', async () => {
    const listeners: Array<() => void> = []
    const status = {
      state: 'granted' as PermissionState,
      addEventListener: (_event: string, cb: () => void) => listeners.push(cb),
      removeEventListener: jest.fn(),
    }

    const permissions = {
      query: jest.fn(async () => status),
    }
    ;(navigator as Navigator & { permissions: any }).permissions = permissions as any

    const { result } = renderHook(() => usePermission('geolocation'))

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current).toBe('granted')
  })
})
