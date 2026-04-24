import onKeyStroke from '../src/hooks/onKeyStroke'

describe('onKeyStroke', () => {
  it('listens for matching key and cleans up', () => {
    const spy = jest.fn()
    const cleanup = onKeyStroke('Enter', spy)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(spy).toHaveBeenCalledTimes(1)

    cleanup()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
