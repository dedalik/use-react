import { act, renderHook } from '@testing-library/react'
import useShare from '../src/hooks/useShare'

describe('useShare', () => {
  it('shares data when api exists', async () => {
    const share = jest.fn(async () => {})
    Object.defineProperty(navigator, 'share', { configurable: true, value: share })

    const { result } = renderHook(() => useShare())
    expect(result.current.isSupported).toBe(true)

    await act(async () => {
      const ok = await result.current.share({ title: 'Hi' })
      expect(ok).toBe(true)
    })

    expect(share).toHaveBeenCalledWith({ title: 'Hi' })
  })
})
