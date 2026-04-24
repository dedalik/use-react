import { act, renderHook } from '@testing-library/react'
import useDeviceMotion from '../src/hooks/useDeviceMotion'

describe('useDeviceMotion', () => {
  it('updates state on devicemotion event', () => {
    const win = window as Window & { DeviceMotionEvent?: unknown }
    win.DeviceMotionEvent = function DeviceMotionEventStub() {}

    const { result } = renderHook(() => useDeviceMotion())

    act(() => {
      const event = new Event('devicemotion') as DeviceMotionEvent
      Object.defineProperty(event, 'acceleration', { value: { x: 1, y: 2, z: 3 }, configurable: true })
      Object.defineProperty(event, 'accelerationIncludingGravity', { value: { x: 4, y: 5, z: 6 }, configurable: true })
      Object.defineProperty(event, 'rotationRate', { value: { alpha: 7, beta: 8, gamma: 9 }, configurable: true })
      Object.defineProperty(event, 'interval', { value: 16, configurable: true })
      window.dispatchEvent(event)
    })

    expect(result.current.acceleration?.x).toBe(1)
    expect(result.current.rotationRate?.alpha).toBe(7)
    expect(result.current.interval).toBe(16)
  })
})
