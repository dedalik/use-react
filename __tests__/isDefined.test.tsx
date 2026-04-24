import isDefined from '../src/hooks/isDefined'

describe('isDefined', () => {
  it('returns true only for non-nullish values', () => {
    expect(isDefined(0)).toBe(true)
    expect(isDefined('')).toBe(true)
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })
})
