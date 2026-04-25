import { renderHook } from '@testing-library/react'
import useStyleTag from '../src/hooks/useStyleTag'

describe('useStyleTag', () => {
  it('injects and removes style tag', () => {
    const { result, unmount } = renderHook(() => useStyleTag('body{background:red;}'))
    expect(result.current.loaded).toBe(true)
    expect(result.current.id).toBeTruthy()

    const id = result.current.id!
    expect(document.getElementById(id)).toBeTruthy()

    unmount()
    expect(document.getElementById(id)).toBeNull()
  })
})
