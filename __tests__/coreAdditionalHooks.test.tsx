import React, { useRef } from 'react'
import { act, render, renderHook, screen } from '@testing-library/react'
import {
  useAsync,
  useClickOutside,
  useCopyToClipboard,
  useEventCallback,
  useIdle,
  useInterval,
  useLatest,
  useLockBodyScroll,
  useMountedState,
  usePageVisibility,
  useRafState,
  useSessionStorage,
  useThrottle,
  useTimeout,
  useTitle,
  useToggle,
  useWindowSize,
} from '../src'

describe('additional hooks', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    window.sessionStorage.clear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('useToggle toggles and sets values', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    act(() => result.current[2](false))
    expect(result.current[0]).toBe(false)
  })

  it('useLatest stores current value in ref', () => {
    const { result, rerender } = renderHook(({ value }) => useLatest(value), {
      initialProps: { value: 'one' },
    })
    rerender({ value: 'two' })
    expect(result.current.current).toBe('two')
  })

  it('useEventCallback keeps stable function with latest logic', () => {
    const { result, rerender } = renderHook(({ step }) => useEventCallback((value: number) => value + step), {
      initialProps: { step: 1 },
    })

    const stableFn = result.current
    expect(stableFn(1)).toBe(2)
    rerender({ step: 3 })
    expect(stableFn(1)).toBe(4)
    expect(result.current).toBe(stableFn)
  })

  it('useTimeout executes after delay', () => {
    const fn = jest.fn()
    renderHook(() => useTimeout(fn, 100))

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('useInterval executes repeatedly', () => {
    const fn = jest.fn()
    renderHook(() => useInterval(fn, 50))

    act(() => {
      jest.advanceTimersByTime(160)
    })

    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('useMountedState reports mounted lifecycle', () => {
    const { result, unmount } = renderHook(() => useMountedState())
    expect(result.current()).toBe(true)
    unmount()
    expect(result.current()).toBe(false)
  })

  it('useWindowSize returns current viewport size', () => {
    const { result } = renderHook(() => useWindowSize())
    expect(result.current.width).toBe(window.innerWidth)
    expect(result.current.height).toBe(window.innerHeight)
  })

  it('useCopyToClipboard returns false when clipboard unavailable', async () => {
    const originalClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })

    const { result } = renderHook(() => useCopyToClipboard())
    let copied = false
    await act(async () => {
      copied = await result.current[1]('text')
    })

    expect(copied).toBe(false)
    Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true })
  })

  it('useTitle updates document title', () => {
    renderHook(() => useTitle('New title'))
    expect(document.title).toBe('New title')
  })

  it('useLockBodyScroll sets overflow hidden while mounted', () => {
    const originalOverflow = document.body.style.overflow
    const { unmount } = renderHook(() => useLockBodyScroll(true))
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe(originalOverflow)
  })

  it('useThrottle updates value no faster than delay', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 100), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current).toBe('b')
  })

  it('useSessionStorage persists value in sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('token', 'initial'))

    act(() => {
      result.current[1]('next')
    })

    expect(result.current[0]).toBe('next')
    expect(window.sessionStorage.getItem('token')).toBe(JSON.stringify('next'))
  })

  it('usePageVisibility tracks visibility state', () => {
    const { result } = renderHook(() => usePageVisibility())
    expect(typeof result.current).toBe('boolean')
  })

  it('useIdle flips to idle after timeout', () => {
    const { result } = renderHook(() => useIdle(100))
    expect(result.current).toBe(false)

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current).toBe(true)
  })

  it('useRafState updates in animation frame', () => {
    const requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0)
        return 1
      })

    const { result } = renderHook(() => useRafState(0))
    act(() => {
      result.current[1](2)
    })

    expect(result.current[0]).toBe(2)
    requestAnimationFrameSpy.mockRestore()
  })

  it('useAsync exposes loading and data lifecycle', async () => {
    const { result } = renderHook(() => useAsync(async (value: number) => value + 1))

    await act(async () => {
      const response = await result.current.execute(1)
      expect(response).toBe(2)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(2)
    expect(result.current.error).toBeNull()
  })

  it('useClickOutside triggers callback outside tracked ref', () => {
    const onOutside = jest.fn()

    const Demo = () => {
      const boxRef = useRef<HTMLDivElement>(null)
      useClickOutside(boxRef, onOutside)
      return (
        <div>
          <div data-testid='inside' ref={boxRef}>
            inside
          </div>
          <button data-testid='outside'>outside</button>
        </div>
      )
    }

    render(<Demo />)
    act(() => {
      screen.getByTestId('outside').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(onOutside).toHaveBeenCalledTimes(1)
  })
})
