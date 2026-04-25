import { act, renderHook } from '@testing-library/react'
import useBattery from '../src/hooks/useBattery'

describe('useBattery', () => {
  it('reads battery manager state', async () => {
    const battery = {
      charging: true,
      chargingTime: 10,
      dischargingTime: 20,
      level: 0.7,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }

    Object.defineProperty(navigator, 'getBattery', {
      configurable: true,
      value: async () => battery,
    })

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.isSupported).toBe(true)
    expect(result.current.level).toBe(0.7)
  })
})
