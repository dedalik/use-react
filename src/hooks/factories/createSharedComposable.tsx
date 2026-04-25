/**
 * Returns a singleton wrapper around `factory`.
 *
 * **Rules of Hooks:** `factory` must **not** call React hooks (`useState`, `useEffect`, …).
 * It runs only on the **first** invocation; later calls reuse the cached return value, so a
 * hook-based `factory` would only execute hooks once and would **not** be valid React.
 * Use this only for **plain** singletons (objects, module-style services, caches) or
 * hook-free composables.
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
