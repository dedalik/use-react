import { act, renderHook } from '@testing-library/react'
import useBluetooth from '../src/hooks/useBluetooth'

describe('useBluetooth', () => {
  it('requests device and stores name', async () => {
    const requestDevice = jest.fn(async () => ({ name: 'Pad' }))
    Object.defineProperty(navigator, 'bluetooth', {
      configurable: true,
      value: { requestDevice },
    })

    const { result } = renderHook(() => useBluetooth())

    await act(async () => {
      const device = await result.current.requestDevice()
      expect(device).not.toBeNull()
    })

    expect(result.current.deviceName).toBe('Pad')
  })
})
