/**
 * Creates a shared singleton result for plain composable factories.
 */
export default function createSharedComposable<A extends unknown[], R>(factory: (...args: A) => R) {
  let initialized = false
  let sharedValue: R

  return (...args: A): R => {
    if (!initialized) {
      sharedValue = factory(...args)
      initialized = true
    }
    return sharedValue
  }
}
