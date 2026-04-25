import { renderHook } from '@testing-library/react'
import useBase64 from '../src/hooks/useBase64'

describe('useBase64', () => {
  it('encodes plain strings', () => {
    const { result } = renderHook(() => useBase64('hello'))
    expect(result.current).toBe('aGVsbG8=')
  })

  it('encodes JSON payload when json option is enabled', () => {
    const { result } = renderHook(() => useBase64({ a: 1 }, { json: true }))
    expect(result.current).toBe('eyJhIjoxfQ==')
  })
})
