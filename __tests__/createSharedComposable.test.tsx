import createSharedComposable from '../src/hooks/factories/createSharedComposable'

describe('createSharedComposable', () => {
  it('returns singleton factory result', () => {
    let calls = 0
    const useShared = createSharedComposable((seed: number) => {
      calls += 1
      return { seed }
    })

    const first = useShared(1)
    const second = useShared(2)

    expect(calls).toBe(1)
    expect(first).toBe(second)
    expect(second.seed).toBe(1)
  })
})
