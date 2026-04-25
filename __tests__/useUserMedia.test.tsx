import { act, renderHook } from '@testing-library/react'
import useUserMedia from '../src/hooks/useUserMedia'

describe('useUserMedia', () => {
  it('starts and stops media stream', async () => {
    const stopTrack = jest.fn()
    const fakeStream = {
      getTracks: () => [{ stop: stopTrack }],
    } as unknown as MediaStream

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia: jest.fn(async () => fakeStream) },
    })

    const { result } = renderHook(() => useUserMedia({ audio: true }))

    await act(async () => {
      const stream = await result.current.start()
      expect(stream).toBe(fakeStream)
    })

    act(() => {
      result.current.stop()
    })

    expect(stopTrack).toHaveBeenCalledTimes(1)
  })
})
