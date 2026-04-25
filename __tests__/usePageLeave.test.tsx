import { act, renderHook } from '@testing-library/react'
import usePageLeave from '../src/hooks/usePageLeave'

describe('usePageLeave', () => {
  it('calls callback when cursor leaves from top edge', () => {
    const handler = jest.fn()
    renderHook(() => usePageLeave(handler))

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseout', { clientY: 0 }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
