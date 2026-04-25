import onLongPress from '../src/hooks/events/onLongPress'

describe('onLongPress', () => {
  it('calls callback after delay', () => {
    jest.useFakeTimers()
    const spy = jest.fn()
    const handlers = onLongPress(spy, 300)

    handlers.onMouseDown()
    jest.advanceTimersByTime(299)
    expect(spy).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(1)
    expect(spy).toHaveBeenCalledTimes(1)

    jest.useRealTimers()
  })
})
