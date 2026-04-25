import { act, renderHook } from '@testing-library/react'
import useTextSelection from '../src/hooks/useTextSelection'

describe('useTextSelection', () => {
  it('updates selection state on selectionchange', () => {
    const getSelectionSpy = jest.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'hello',
      isCollapsed: false,
    } as unknown as Selection)

    const { result } = renderHook(() => useTextSelection())

    act(() => {
      document.dispatchEvent(new Event('selectionchange'))
    })

    expect(result.current.text).toBe('hello')
    expect(result.current.isCollapsed).toBe(false)

    getSelectionSpy.mockRestore()
  })
})
