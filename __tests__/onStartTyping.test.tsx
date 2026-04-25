import onStartTyping from '../src/hooks/events/onStartTyping'

describe('onStartTyping', () => {
  it('fires once per typing burst', () => {
    jest.useFakeTimers()
    const spy = jest.fn()
    const cleanup = onStartTyping(spy, { timeout: 300 })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))

    expect(spy).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(301)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }))
    expect(spy).toHaveBeenCalledTimes(2)

    cleanup()
    jest.useRealTimers()
  })
})
