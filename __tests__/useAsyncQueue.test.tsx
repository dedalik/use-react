import { act, renderHook } from '@testing-library/react'
import useAsyncQueue from '../src/hooks/useAsyncQueue'

describe('useAsyncQueue', () => {
  it('runs tasks sequentially and stores results', async () => {
    const calls: number[] = []
    const tasks = [
      async () => {
        calls.push(1)
        return 1
      },
      async () => {
        calls.push(2)
        return 2
      },
    ]

    const { result } = renderHook(() => useAsyncQueue<number>(tasks))

    await act(async () => {
      await result.current.start()
    })

    expect(calls).toEqual([1, 2])
    expect(result.current.results).toEqual([1, 2])
    expect(result.current.errors).toEqual([null, null])
    expect(result.current.pending).toBe(false)
  })
})
