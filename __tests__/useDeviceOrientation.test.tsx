import { act, renderHook } from '@testing-library/react'
import useDeviceOrientation from '../src/hooks/useDeviceOrientation'

describe('useDeviceOrientation', () => {
  it('updates state on deviceorientation event', () => {
    const win = window as Window & { DeviceOrientationEvent?: unknown }
    win.DeviceOrientationEvent = function DeviceOrientationEventStub() {}

    const { result } = renderHook(() => useDeviceOrientation())

    act(() => {
      const event = new Event('deviceorientation') as DeviceOrientationEvent
      Object.defineProperty(event, 'alpha', { value: 11, configurable: true })
      Object.defineProperty(event, 'beta', { value: 22, configurable: true })
      Object.defineProperty(event, 'gamma', { value: 33, configurable: true })
      Object.defineProperty(event, 'absolute', { value: true, configurable: true })
      window.dispatchEvent(event)
    })

    expect(result.current.alpha).toBe(11)
    expect(result.current.beta).toBe(22)
    expect(result.current.gamma).toBe(33)
    expect(result.current.absolute).toBe(true)
  })
})
