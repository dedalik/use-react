import { act } from '@testing-library/react'
import onElementRemoval from '../src/hooks/events/onElementRemoval'

describe('onElementRemoval', () => {
  it('fires callback when element is removed', async () => {
    const container = document.createElement('div')
    const child = document.createElement('span')
    container.appendChild(child)
    document.body.appendChild(container)

    const spy = jest.fn()
    const cleanup = onElementRemoval(child, spy, { root: container })

    await act(async () => {
      container.removeChild(child)
      await Promise.resolve()
    })

    expect(spy).toHaveBeenCalledTimes(1)
    cleanup()
  })
})
