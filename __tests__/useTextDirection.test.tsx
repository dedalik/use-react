import { act, renderHook } from '@testing-library/react'
import useTextDirection from '../src/hooks/useTextDirection'

describe('useTextDirection', () => {
  it('reads direction from document root', async () => {
    document.documentElement.setAttribute('dir', 'rtl')
    const { result } = renderHook(() => useTextDirection())
    expect(result.current).toBe('rtl')

    await act(async () => {
      document.documentElement.setAttribute('dir', 'ltr')
      await Promise.resolve()
    })
  })
})
