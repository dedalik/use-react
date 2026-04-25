/**
 * Merges object shape with iterable tuple destructuring support.
 */
export default function makeDestructurable<T extends object, A extends readonly unknown[]>(obj: T, arr: A): T & A {
  const clone = { ...obj } as T & Partial<A>

  ;(clone as T & { [Symbol.iterator]: () => Iterator<unknown> })[Symbol.iterator] = function* iterator() {
    for (const item of arr) yield item
  }

  return clone as T & A
}
