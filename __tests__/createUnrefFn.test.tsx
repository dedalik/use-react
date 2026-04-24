import createUnrefFn from '../src/hooks/createUnrefFn'

describe('createUnrefFn', () => {
  it('returns getter for raw value', () => {
    const getter = createUnrefFn(42)
    expect(getter()).toBe(42)
  })

  it('returns original getter for function source', () => {
    const getter = createUnrefFn(() => 99)
    expect(getter()).toBe(99)
  })
})
