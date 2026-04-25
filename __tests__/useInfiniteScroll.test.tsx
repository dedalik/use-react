import { act, renderHook } from '@testing-library/react'
import useInfiniteScroll from '../src/hooks/useInfiniteScroll'

describe('useInfiniteScroll', () => {
  it('calls callback near page bottom', () => {
    const onLoadMore = jest.fn()
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 900 })
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 })

    renderHook(() => useInfiniteScroll(onLoadMore, { offset: 200 }))

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })
})
