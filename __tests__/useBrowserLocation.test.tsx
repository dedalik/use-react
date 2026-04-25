import { act, renderHook } from '@testing-library/react'
import useBrowserLocation from '../src/hooks/useBrowserLocation'

describe('useBrowserLocation', () => {
  it('updates when hash changes', () => {
    const { result } = renderHook(() => useBrowserLocation())

    act(() => {
      window.location.hash = '#section'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current.hash).toBe('#section')
  })
})
