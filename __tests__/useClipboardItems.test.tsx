import { act, renderHook } from '@testing-library/react'
import useClipboardItems from '../src/hooks/useClipboardItems'

describe('useClipboardItems', () => {
  it('reads clipboard items', async () => {
    const items = [{ types: ['text/plain'] }] as unknown as ClipboardItem[]
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { read: jest.fn(async () => items) },
    })

    const { result } = renderHook(() => useClipboardItems())

    await act(async () => {
      const next = await result.current.read()
      expect(next).toHaveLength(1)
    })

    expect(result.current.items).toHaveLength(1)
  })
})
