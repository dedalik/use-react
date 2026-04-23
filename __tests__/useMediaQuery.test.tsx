import { act, renderHook } from '@testing-library/react'
import { useMediaQuery } from '../src'

const listeners = new Set<(event: MediaQueryListEvent) => void>()

function createMatchMedia(matches: boolean) {
  let current = matches

  return {
    matchMedia: jest.fn().mockImplementation(() => ({
      get matches() {
        return current
      },
      media: '(min-width: 768px)',
      onchange: null,
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener)
      },
      removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener)
      },
      dispatchEvent: () => true,
      _setMatches(nextValue: boolean) {
        current = nextValue
        listeners.forEach((listener) => listener({ matches: nextValue } as MediaQueryListEvent))
      },
    })),
    setMatches: (nextValue: boolean) => {
      current = nextValue
      listeners.forEach((listener) => listener({ matches: nextValue } as MediaQueryListEvent))
    },
  }
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    listeners.clear()
  })

  it('returns current media query status', () => {
    const media = createMatchMedia(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: media.matchMedia,
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('reacts to media query changes', () => {
    const media = createMatchMedia(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: media.matchMedia,
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    act(() => {
      media.setMatches(true)
    })

    expect(result.current).toBe(true)
  })
})
