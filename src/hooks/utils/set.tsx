/**
 * Sets nested property value by dot-separated path on target object.
 */
export default function set(target: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.').filter(Boolean)
  if (keys.length == 0) return target

  let cursor: Record<string, unknown> = target

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const next = cursor[key]
    if (typeof next === 'object' && next !== null) {
      cursor = next as Record<string, unknown>
      continue
    }

    const created: Record<string, unknown> = {}
    cursor[key] = created
    cursor = created
  }

  cursor[keys[keys.length - 1]] = value
  return target
}
