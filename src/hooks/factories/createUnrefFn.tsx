export type MaybeGetter<T> = T | (() => T)

/**
 * Normalizes value-or-getter into a getter function.
 */
export default function createUnrefFn<T>(source: MaybeGetter<T>): () => T {
  if (typeof source === 'function') {
    return source as () => T
  }
  return () => source
}
