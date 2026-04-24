import { act, renderHook } from '@testing-library/react'
import useFetch from '../src/hooks/useFetch'

describe('useFetch', () => {
  it('fetches json payload', async () => {
    const fetchMock = jest.fn(async () => ({ ok: true, json: async () => ({ ok: 1 }) }))
    ;(globalThis as { fetch?: typeof fetch }).fetch = fetchMock as unknown as typeof fetch

    const { result } = renderHook(() => useFetch<{ ok: number }>('/api'))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toEqual({ ok: 1 })
    expect(result.current.error).toBeNull()
  })
})
