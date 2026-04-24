import set from '../src/hooks/set'

describe('set', () => {
  it('sets nested value in-place', () => {
    const source: Record<string, unknown> = {}
    const result = set(source, 'a.b.c', 42)

    expect(result).toBe(source)
    expect(source).toEqual({ a: { b: { c: 42 } } })
  })
})
