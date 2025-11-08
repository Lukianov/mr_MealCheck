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

  function toIsoDate(dotted: string): string | null {
    const m = dotted.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)

    if (!m) return null

    const d = Number(m[1]),
      mo = Number(m[2]),
      y = Number(m[3])

    const dt = new Date(Date.UTC(y, mo - 1, d))

    const ok =
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() + 1 === mo &&
      dt.getUTCDate() === d

    if (!ok) return null

    const pad = (n: number) => String(n).padStart(2, '0')
    return `${y}-${pad(mo)}-${pad(d)}`
  }

  return {
    toLocalIsoWithOffset,
    endOfDay,
    getRange,
    toIsoDate,
  }
}
