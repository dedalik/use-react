import { act, renderHook } from '@testing-library/react'
import useBroadcastChannel from '../src/hooks/useBroadcastChannel'

class MockBroadcastChannel {
  static channels: MockBroadcastChannel[] = []
  name: string
  onmessage: ((event: MessageEvent) => void) | null = null

  constructor(name: string) {
    this.name = name
    MockBroadcastChannel.channels.push(this)
  }

  postMessage(data: unknown) {
    MockBroadcastChannel.channels
      .filter((channel) => channel.name === this.name && channel !== this)
      .forEach((channel) => channel.onmessage?.({ data } as MessageEvent))
  }

  close() {}
}

describe('useBroadcastChannel', () => {
  it('posts and receives messages through channel', () => {
    const browserGlobal = globalThis as any
    browserGlobal.BroadcastChannel = MockBroadcastChannel

    const first = renderHook(() => useBroadcastChannel<number>('numbers'))
    const second = renderHook(() => useBroadcastChannel<number>('numbers'))

    act(() => {
      first.result.current.post(7)
    })

    expect(second.result.current.data).toBe(7)
  })
})
