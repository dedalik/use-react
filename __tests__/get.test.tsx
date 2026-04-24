import get from '../src/hooks/get'

describe('get', () => {
  it('returns nested values and fallback', () => {
    const source = { a: { b: { c: 10 } } }
    expect(get(source, 'a.b.c')).toBe(10)
    expect(get(source, 'a.x.c', 'n/a')).toBe('n/a')
  })
})
