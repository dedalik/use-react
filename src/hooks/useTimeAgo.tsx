import { useEffect, useMemo, useState } from 'react'

export interface UseTimeAgoOptions {
  /** BCP 47 locale for `Intl.RelativeTimeFormat`. */
  locale?: string
  /**
   * How often to refresh the label (ms). Set `null` or `0` to disable ticking
   * (still updates when `target` changes).
   */
  updateInterval?: number | null
  /** Options passed to `Intl.RelativeTimeFormat` (defaults include `numeric: 'auto'`). */
  relativeOptions?: Intl.RelativeTimeFormatOptions
}

function formatRelativeTime(
  target: Date,
  now: Date,
  locale: string | undefined,
  relativeOptions: Intl.RelativeTimeFormatOptions | undefined,
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    ...relativeOptions,
  })

  const diffSec = (now.getTime() - target.getTime()) / 1000
  const absSec = Math.abs(diffSec)
  if (absSec < 45) {
    return rtf.format(-Math.round(diffSec), 'second')
  }

  const diffMin = diffSec / 60
  const absMin = Math.abs(diffMin)
  if (absMin < 45) {
    return rtf.format(-Math.round(diffMin), 'minute')
  }

  const diffHr = diffMin / 60
  const absHr = Math.abs(diffHr)
  if (absHr < 22) {
    return rtf.format(-Math.round(diffHr), 'hour')
  }

  const diffDay = diffHr / 24
  const absDay = Math.abs(diffDay)
  if (absDay < 6) {
    return rtf.format(-Math.round(diffDay), 'day')
  }

  const diffWeek = diffDay / 7
  const absWeek = Math.abs(diffWeek)
  if (absWeek < 4.5) {
    return rtf.format(-Math.round(diffWeek), 'week')
  }

  const diffMonth = diffDay / 30
  const absMonth = Math.abs(diffMonth)
  if (absMonth < 11) {
    return rtf.format(-Math.round(diffMonth), 'month')
  }

  const diffYear = diffDay / 365
  return rtf.format(-Math.round(diffYear), 'year')
}

function stableRelativeKey(options: Intl.RelativeTimeFormatOptions | undefined): string {
  if (!options || Object.keys(options).length === 0) return ''
  return JSON.stringify(options, Object.keys(options).sort())
}

/**
 * Human-readable relative time (`Intl.RelativeTimeFormat`) for a past or future instant.
 */
export default function useTimeAgo(target: Date | number | null | undefined, options?: UseTimeAgoOptions): string {
  const { locale, updateInterval = 60_000, relativeOptions } = options ?? {}
  const relativeKey = stableRelativeKey(relativeOptions)

  const [now, setNow] = useState(() => new Date())

  const targetTime =
    target == null
      ? null
      : typeof target === 'number'
        ? target
        : Number.isNaN(target.getTime())
          ? null
          : target.getTime()

  useEffect(() => {
    setNow(new Date())
  }, [targetTime])

  useEffect(() => {
    if (updateInterval == null || updateInterval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => window.clearInterval(id)
  }, [updateInterval])

  return useMemo(() => {
    if (targetTime == null) return ''
    const t = new Date(targetTime)
    return formatRelativeTime(t, now, locale, relativeOptions)
  }, [targetTime, now, locale, relativeKey]) // eslint-disable-line react-hooks/exhaustive-deps -- relativeKey mirrors relativeOptions
}
