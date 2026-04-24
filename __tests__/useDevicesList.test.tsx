import { act, renderHook } from '@testing-library/react'
import useDevicesList from '../src/hooks/useDevicesList'

describe('useDevicesList', () => {
  it('loads and refreshes media devices', async () => {
    const enumerateDevices = jest.fn(async () => [{ deviceId: '1', kind: 'audioinput', label: 'Mic' }])

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        enumerateDevices,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    })

    const { result } = renderHook(() => useDevicesList())

    await act(async () => {
      await result.current.refresh()
    })

    expect(result.current.devices).toHaveLength(1)
    expect(result.current.devices[0].label).toBe('Mic')
  })
})
