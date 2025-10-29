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

  return {
    toLocalIsoWithOffset,
    endOfDay,
  }
}
