import { act, renderHook } from '@testing-library/react'
import useImage from '../src/hooks/useImage'

class MockImage {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  crossOrigin = ''
  referrerPolicy = ''

  set src(value: string) {
    if (value.includes('ok')) this.onload?.()
    else this.onerror?.()
  }
}

describe('useImage', () => {
  it('loads image successfully', async () => {
    const browserGlobal = globalThis as any
    browserGlobal.Image = MockImage

    const { result } = renderHook(() => useImage('https://site/ok.png'))

    await act(async () => Promise.resolve())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.image).not.toBeNull()
  })

  it('sets error for failed image', async () => {
    const browserGlobal = globalThis as any
    browserGlobal.Image = MockImage

    const { result } = renderHook(() => useImage('https://site/fail.png'))

    await act(async () => Promise.resolve())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toContain('Failed to load image')
  })
})
