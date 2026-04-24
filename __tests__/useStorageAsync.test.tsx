import { act, renderHook } from '@testing-library/react'
import useStorageAsync from '../src/hooks/useStorageAsync'

describe('useStorageAsync', () => {
  it('loads and updates async storage state', async () => {
    let raw: string | null = '2'
    const storage = {
      getItem: jest.fn(async () => raw),
      setItem: jest.fn(async (_key: string, value: string) => {
        raw = value
      }),
      removeItem: jest.fn(async () => {
        raw = null
      }),
    }

    const { result } = renderHook(() => useStorageAsync<number>(storage, 'k', 1))

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current[0]).toBe(2)
    expect(result.current[1]).toBe(false)

    await act(async () => {
      await result.current[2](7)
    })
    expect(raw).toBe('7')

    await act(async () => {
      await result.current[3]()
    })
    expect(result.current[0]).toBe(1)
  })
})
