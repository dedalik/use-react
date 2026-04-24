import { act, renderHook } from '@testing-library/react'
import useAsyncState from '../src/hooks/useAsyncState'

describe('useAsyncState', () => {
  it('resolves async producer and updates state', async () => {
    const producer = jest.fn(async () => 42)
    const { result } = renderHook(() => useAsyncState(producer, { immediate: false }))

    expect(result.current.loading).toBe(false)

    await act(async () => {
      const value = await result.current.execute()
      expect(value).toBe(42)
    })

    expect(result.current.state).toBe(42)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })
})
