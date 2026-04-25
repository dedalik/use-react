import makeDestructurable from '../src/hooks/utils/makeDestructurable'

describe('makeDestructurable', () => {
  it('supports object fields and tuple destructuring', () => {
    const value = makeDestructurable({ ok: true, count: 2 }, [true, 2] as const)
    const [ok, count] = value

    expect(value.ok).toBe(true)
    expect(value.count).toBe(2)
    expect(ok).toBe(true)
    expect(count).toBe(2)
  })
})
