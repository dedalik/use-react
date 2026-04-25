import { act, renderHook } from '@testing-library/react'
import useDisplayMedia from '../src/hooks/useDisplayMedia'

describe('useDisplayMedia', () => {
  it('starts and stops display stream', async () => {
    const stopTrack = jest.fn()
    const fakeStream = {
      getTracks: () => [{ stop: stopTrack }],
    } as unknown as MediaStream

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getDisplayMedia: jest.fn(async () => fakeStream) },
    })

    const { result } = renderHook(() => useDisplayMedia())

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
