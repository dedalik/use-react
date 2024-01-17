import { renderHook } from '@testing-library/react'
import { useOnMount } from '../src'

describe('useOnMount', () => {
  it('calls function once after component mount', () => {
    const fn = jest.fn()

    renderHook(() => useOnMount(fn))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does not call function again after component updates', () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => useOnMount(fn))

    rerender()

    expect(fn).toHaveBeenCalledTimes(1)
  })
})
