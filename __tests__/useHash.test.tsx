import { act, renderHook } from '@testing-library/react'
import { useHash } from '../src'

describe('useHash', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('initializes with the current window location hash', () => {
    // Simulating hash change
    window.location.hash = 'initial-hash'
    const { result } = renderHook(() => useHash())

    expect(result.current[0]).toBe('#initial-hash')
  })

  it('updates the hash state when window location hash changes', async () => {
    const { result } = renderHook(() => useHash())

    act(() => {
      window.location.hash = 'new-hash'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current[0]).toBe('#new-hash')
  })

  it('sets the new hash correctly', () => {
    const { result } = renderHook(() => useHash())

    // Calling the hash setting function
    act(() => {
      result.current[1]('#updated-hash')
    })

    expect(window.location.hash).toBe('#updated-hash')
  })

  it('does not change the hash if the new hash is the same as current', () => {
    window.location.hash = 'same-hash'
    const { result } = renderHook(() => useHash())

    act(() => {
      result.current[1]('#same-hash')
    })

    expect(window.location.hash).toBe('#same-hash')
  })

  it('cleans up the hashchange event listener on unmount', () => {
    // Create a spy on the global removeEventListener method.
    const remover = jest.spyOn(global, 'removeEventListener').mockImplementation(() => {})

    const { unmount } = renderHook(() => useHash())

    // Unmount the hook.
    unmount()

    // Assert that the removeEventListener method has been called.
    expect(remover).toHaveBeenCalled()
  })
})
