import createEventHook from '../src/hooks/factories/createEventHook'

describe('createEventHook', () => {
  it('subscribes, triggers and unsubscribes', () => {
    const event = createEventHook<string>()
    const handler = jest.fn()

    const off = event.on(handler)
    event.trigger('hello')

    expect(handler).toHaveBeenCalledWith('hello')
    expect(handler).toHaveBeenCalledTimes(1)

    off()
    event.trigger('again')
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
