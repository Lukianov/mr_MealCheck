import { StatsRange } from '@/shared/types/stats'

export const useISODate = () => {
  function toLocalIsoWithOffset(date: Date): string {
    const pad = (n: number, len = 2) => String(n).padStart(len, '0')
    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())
    const hh = pad(date.getHours())
    const mm = pad(date.getMinutes())
    const ss = pad(date.getSeconds())
    const ms = pad(date.getMilliseconds(), 3)
    const tz = -date.getTimezoneOffset() // minutes east of UTC
    const sign = tz >= 0 ? '+' : '-'
    const tzAbs = Math.abs(tz)
    const tzh = pad(Math.floor(tzAbs / 60))
    const tzm = pad(tzAbs % 60)
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}.${ms}${sign}${tzh}:${tzm}`
  }

  function daysInMonth(y: number, mZeroBased: number) {
    return new Date(y, mZeroBased + 1, 0).getDate()
  }

  function subMonthsClamped(d: Date, months: number) {
    const y = d.getFullYear()
    const m = d.getMonth()
    const target = new Date(y, m - months, 1) // 1-е число целевого месяца
    const day = Math.min(
      d.getDate(),
      daysInMonth(target.getFullYear(), target.getMonth()),
    )
    target.setDate(day)
    return target
  }

  function endOfDay(date: Date): Date {
    const d = new Date(date)

    d.setHours(23, 59, 59, 999)

    return d
  }

  function startOfDayLocal(d = new Date()) {
    const x = new Date(d)
    x.setHours(0, 0, 0, 0)
    return x
  }

  function getRange(range: StatsRange, now = new Date()) {
    if (range === 'day') {
      return { start: startOfDayLocal(now), end: endOfDay(now) }
    }

    if (range === 'week') {
      return {
        start: startOfDayLocal(new Date(now.getTime() - 6 * 86400000)),
        end: endOfDay(now),
      }
    }

    return {
      start: startOfDayLocal(new Date(now.getTime() - 31 * 86400000)),
      end: endOfDay(now),
    }
  }

  return {
    toLocalIsoWithOffset,
    endOfDay,
    getRange,
  }
}
