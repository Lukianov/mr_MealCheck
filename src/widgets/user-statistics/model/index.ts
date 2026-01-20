import { ref } from 'vue'
import { useUserCaloriesStatistics } from '@/features/get-user-calories-stat/api/useUserCaloriesStatistics'
import { useUserWeightStatistics } from '@/features/get-user-weight-stat/api/useUserWeightStatistics'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { useMainPage } from '@/pages/main-page'
import type { FetchUserCaloriesRequestResponse } from '@/features/get-user-calories-stat/types'
import type { WeightPoint } from '@/features/get-user-weight-stat/types'
import type {
  StatsLoadResult,
  StatsPoint,
  StatsRange,
} from '@/shared/types/stats'

const DAY_IN_MS = 24 * 60 * 60 * 1000

const AXIS_STEP_HOURS = 4

type KcalStat = FetchUserCaloriesRequestResponse['kcalStats'][number]

type NormalizedPoint = {
  date: Date
  value: number
}

type DateBucket = {
  start: Date
  end: Date
  label: string
}

type AggregatedPoint = StatsPoint & { count: number }

export const USER_WEIGHT_BOUNDARY_STEP = 5

export const userStatistics = () => {
  const caloriesRange = ref<StatsRange>('day')
  const weightRange = ref<StatsRange>('week')

  const { fetchUserCalories } = useUserCaloriesStatistics()
  const { fetchUserWeightStatistics } = useUserWeightStatistics()
  const { dailyStatsCache } = useMainPage()
  const { getRange } = useISODate()

  async function loadCaloriesPoints(range: StatsRange) {
    const raw = await fetchUserCalories(range)

    const goalKcal = dailyStatsCache.value?.goal?.kcal ?? 0

    const series = formatCaloriesPoints(raw?.kcalStats ?? [], range, getRange)

    const goalLine =
      series.points.length > 0
        ? formatCaloriesGoalLine(range, goalKcal, getRange)
        : null

    return {
      points: series.points,
      emptyState: series.emptyState,
      goalPoints: goalLine?.points ?? [],
    }
  }

  async function loadWeightPoints(range: StatsRange) {
    const raw = await fetchUserWeightStatistics(range)

    const currentWeight = dailyStatsCache.value?.weight ?? null

    return formatWeightPoints(
      raw?.weightStats ?? [],
      range,
      currentWeight,
      getRange,
    )
  }

  return {
    loadCaloriesPoints,
    loadWeightPoints,
    caloriesRange,
    weightRange,
  }
}

function enforceNonDecreasingInPlace(points: StatsPoint[]): void {
  let last = 0

  for (let i = 0; i < points.length; i++) {
    if (points[i].value < last) {
      points[i].value = last
    }

    last = points[i].value
  }
}

function formatCaloriesPoints(
  stats: ReadonlyArray<KcalStat>,
  range: StatsRange,
  getRange: ReturnType<typeof useISODate>['getRange'],
  now = new Date(),
): StatsLoadResult {
  const normalized = normalizePoints(stats, (item) => item.kcal ?? 0)

  if (range === 'day') {
    return formatDaySeries(normalized, now, {
      includeAxis: true,
      accumulate: true,
    })
  }

  const bounds = getRange(range, now)

  return formatAggregatedSeries(
    normalized,
    createDayBuckets(bounds.start, bounds.end),
    'range',
  )
}

function formatCaloriesGoalLine(
  range: StatsRange,
  goalValue: number,
  getRange: ReturnType<typeof useISODate>['getRange'],
  now = new Date(),
): StatsLoadResult {
  const value = Math.round(goalValue)

  if (range === 'day') {
    return {
      points: [
        { label: formatHourByNumber(0), value, x: 0 },
        { label: formatHourByNumber(24), value, x: 24 },
      ],
    }
  }

  const bounds = getRange(range, now)
  const buckets = createDayBuckets(bounds.start, bounds.end)

  if (!buckets.length) {
    return { points: [], emptyState: 'range' }
  }

  return {
    points: buckets.map<StatsPoint>((bucket) => ({
      label: bucket.label,
      value,
    })),
  }
}

function formatWeightPoints(
  stats: ReadonlyArray<WeightPoint>,
  range: StatsRange,
  currentWeight: number | null,
  getRange: ReturnType<typeof useISODate>['getRange'],
  now = new Date(),
): StatsLoadResult {
  const normalized = normalizePoints(stats, (item) => item.weight ?? 0)

  if (range === 'day') {
    return formatWeightDaySeries(normalized, now, currentWeight)
  }

  if (range === 'week') {
    const bounds = getRange('week', now)

    return formatWeightRangeByDays(
      normalized,
      bounds.start,
      bounds.end,
      currentWeight,
    )
  }

  const bounds = getRange('month', now)

  return formatWeightRangeByDays(
    normalized,
    bounds.start,
    bounds.end,
    currentWeight,
  )
}

function formatDaySeries(
  points: NormalizedPoint[],
  now: Date,
  options?: {
    includeAxis?: boolean
    axisDefaultValue?: number
    axisEmptyValue?: number
    accumulate?: boolean
  },
): StatsLoadResult {
  const sameDayPoints = points
    .filter((point) => isSameDay(point.date, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  if (!sameDayPoints.length) {
    if (options?.includeAxis && options.axisEmptyValue != null) {
      return { points: createAxisPoints() }
    }

    return { points: [], emptyState: 'today' }
  }

  if (!options?.includeAxis) {
    return {
      points: sameDayPoints.map<StatsPoint>((point) => ({
        label: formatTime(point.date),
        value: point.value,
      })),
    }
  }

  if (options.accumulate) {
    const cumulativePoints = accumulateDayValues(sameDayPoints)
    return formatAccumulatedDaySeries(
      cumulativePoints,
      options.axisDefaultValue ?? 0,
    )
  }

  const axisPoints = createAxisPoints(options.axisDefaultValue ?? 0)
  const axisIndexByHour = new Map<number, number>()

  axisPoints.forEach((point, index) => {
    axisIndexByHour.set(point.x ?? 0, index)
  })

  const floatingPoints: StatsPoint[] = []

  for (const point of sameDayPoints) {
    const xValue = toHours(point.date)
    const snappedHour = snapToAxisHour(xValue)

    if (
      snappedHour != null &&
      axisIndexByHour.has(snappedHour) &&
      Math.abs(snappedHour - xValue) < 1e-6
    ) {
      const idx = axisIndexByHour.get(snappedHour)!
      axisPoints[idx] = {
        ...axisPoints[idx],
        value: point.value,
        label: formatTime(point.date),
      }
      continue
    }

    floatingPoints.push({
      label: '',
      value: point.value,
      x: xValue,
    })
  }

  const merged = [...axisPoints, ...floatingPoints]

  merged.sort((a, b) => (a.x ?? 0) - (b.x ?? 0))

  return { points: merged }
}

function formatAccumulatedDaySeries(
  cumulativePoints: NormalizedPoint[],
  axisDefaultValue: number,
): StatsLoadResult {
  const axisPoints = createAxisPoints(axisDefaultValue)
  fillAxisWithCumulative(axisPoints, cumulativePoints)

  const axisIndexByHour = new Map<number, number>()

  axisPoints.forEach((point, index) => {
    axisIndexByHour.set(point.x ?? 0, index)
  })

  const floatingPoints: StatsPoint[] = []

  for (const point of cumulativePoints) {
    const xValue = toHours(point.date)
    const snappedHour = snapToAxisHour(xValue)

    if (
      snappedHour != null &&
      axisIndexByHour.has(snappedHour) &&
      Math.abs(snappedHour - xValue) < 1e-6
    ) {
      const idx = axisIndexByHour.get(snappedHour)!
      axisPoints[idx] = {
        ...axisPoints[idx],
        value: point.value,
        label: formatTime(point.date),
      }
      continue
    }

    floatingPoints.push({
      label: '',
      value: point.value,
      x: xValue,
    })
  }

  const merged = [...axisPoints, ...floatingPoints]

  merged.sort((a, b) => (a.x ?? 0) - (b.x ?? 0))

  enforceNonDecreasingInPlace(merged)

  return { points: merged }
}

function formatWeightDaySeries(
  points: NormalizedPoint[],
  now: Date,
  currentWeight: number | null,
): StatsLoadResult {
  const sameDayPoints = points
    .filter((point) => isSameDay(point.date, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const measurementFloatingPoints = sameDayPoints.map<StatsPoint>((point) => ({
    label: '',
    value: Math.round(point.value),
    x: toHours(point.date),
  }))

  if (!sameDayPoints.length) {
    if (typeof currentWeight === 'number') {
      const current = Math.round(currentWeight)
      return { points: createAxisPoints(current) }
    }

    return { points: [], emptyState: 'today' }
  }

  if (sameDayPoints.length === 1) {
    const fallback =
      typeof currentWeight === 'number'
        ? Math.round(currentWeight)
        : sameDayPoints[0].value

    const axisPoints = createAxisPoints(Math.round(fallback))
    const merged = [...axisPoints, ...measurementFloatingPoints]

    merged.sort((a, b) => (a.x ?? 0) - (b.x ?? 0))

    return { points: merged }
  }

  const measurementSeries = sameDayPoints.map((point) => ({
    hour: toHours(point.date),
    value: Math.round(point.value),
  }))

  const axisPoints = createAxisPoints(Math.round(measurementSeries[0].value))

  axisPoints.forEach((axisPoint) => {
    const axisHour = axisPoint.x ?? 0
    axisPoint.value = Math.round(resolveAxisValue(axisHour, measurementSeries))
  })

  const merged = [...axisPoints, ...measurementFloatingPoints]

  merged.sort((a, b) => (a.x ?? 0) - (b.x ?? 0))

  return { points: merged }
}

function formatAggregatedSeries(
  points: NormalizedPoint[],
  buckets: DateBucket[],
  emptyState: 'range' | 'today',
): StatsLoadResult {
  if (!buckets.length) {
    return { points: [], emptyState }
  }

  const filtered = filterPointsByBuckets(points, buckets)

  if (!filtered.length) {
    return { points: [], emptyState }
  }

  const aggregated = aggregatePointsByBuckets(filtered, buckets)

  return {
    points: aggregated.map<StatsPoint>((point) => ({
      label: point.label,
      value: point.value,
    })),
  }
}

function formatWeightRangeByDays(
  points: NormalizedPoint[],
  start: Date,
  end: Date,
  currentWeight: number | null,
): StatsLoadResult {
  const sorted = [...points].sort((a, b) => a.date.getTime() - b.date.getTime())

  const dayMaxValues = groupPointsByDay(sorted, start, end)

  const dayValuesArray = [...dayMaxValues.values()]

  const fallback =
    typeof currentWeight === 'number'
      ? Math.round(currentWeight)
      : dayValuesArray.length
        ? Math.round(dayValuesArray[dayValuesArray.length - 1] ?? 0)
        : null

  if (dayMaxValues.size === 0 && fallback == null) {
    return { points: [], emptyState: 'range' }
  }

  const axisPoints: StatsPoint[] = []

  let cursor = startOfDay(start)
  const limit = startOfDay(end)

  while (cursor <= limit) {
    const dayKey = cursor.getTime()
    const value =
      dayMaxValues.has(dayKey) && dayMaxValues.get(dayKey) != null
        ? Math.round(dayMaxValues.get(dayKey)!)
        : (fallback ?? 0)

    axisPoints.push({
      label: formatDayMonth(cursor),
      value,
    })

    cursor = addDays(cursor, 1)
  }

  return { points: axisPoints }
}

function normalizePoints<T extends { date: string }>(
  stats: ReadonlyArray<T>,
  selector: (item: T) => number,
): NormalizedPoint[] {
  return stats.map((item) => ({
    date: new Date(item.date),
    value: Math.round(selector(item) ?? 0),
  }))
}

function accumulateDayValues(points: NormalizedPoint[]): NormalizedPoint[] {
  let total = 0

  return points.map((point) => {
    total += point.value
    return {
      date: point.date,
      value: total,
    }
  })
}

function aggregatePointsByBuckets(
  points: NormalizedPoint[],
  buckets: DateBucket[],
): AggregatedPoint[] {
  return buckets.map((bucket) => {
    let total = 0
    let count = 0

    for (const point of points) {
      if (isWithinInterval(point.date, bucket.start, bucket.end)) {
        total += point.value
        count++
      }
    }

    return {
      label: bucket.label,
      value: Math.round(total),
      count,
    }
  })
}

function createDayBuckets(start: Date, end: Date): DateBucket[] {
  const rangeStart = startOfDay(start)
  const rangeEnd = endOfDay(end)

  const totalDays = Math.max(
    1,
    Math.round(
      (startOfDay(rangeEnd).getTime() - rangeStart.getTime()) / DAY_IN_MS,
    ) + 1,
  )

  const buckets: DateBucket[] = []

  for (let i = 0; i < totalDays; i++) {
    const day = addDays(rangeStart, i)

    buckets.push({
      start: startOfDay(day),
      end: endOfDay(day),
      label: formatDayMonth(day),
    })
  }

  return buckets
}

// function createWeekBuckets(start: Date, end: Date): DateBucket[] {
//   const buckets: DateBucket[] = []
//
//   let cursor = startOfDay(start)
//   const max = endOfDay(end)
//
//   while (cursor <= max) {
//     const bucketStart = cursor
//     const tentativeEnd = endOfDay(addDays(bucketStart, 6))
//     const bucketEnd = tentativeEnd > max ? max : tentativeEnd
//
//     buckets.push({
//       start: bucketStart,
//       end: bucketEnd,
//       label: `${formatDayMonth(bucketStart)}-${formatDayMonth(bucketEnd)}`,
//     })
//
//     cursor = addDays(bucketEnd, 1)
//   }
//
//   return buckets
// }

function filterPointsByBuckets(
  points: NormalizedPoint[],
  buckets: DateBucket[],
): NormalizedPoint[] {
  if (!buckets.length) {
    return []
  }

  const rangeStart = buckets[0].start
  const rangeEnd = buckets[buckets.length - 1].end

  return points.filter((point) =>
    isWithinInterval(point.date, rangeStart, rangeEnd),
  )
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isWithinInterval(date: Date, start: Date, end: Date): boolean {
  const time = date.getTime()
  return time >= start.getTime() && time <= end.getTime()
}

function formatDayMonth(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}`
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function toHours(date: Date): number {
  return date.getHours() + date.getMinutes() / 60
}

function createAxisPoints(defaultValue = 0): StatsPoint[] {
  const result: StatsPoint[] = []

  for (let hour = 0; hour <= 24; hour += AXIS_STEP_HOURS) {
    result.push({
      value: defaultValue,
      label: formatHourByNumber(hour),
      x: hour,
    })
  }

  return result
}

function fillAxisWithCumulative(
  axisPoints: StatsPoint[],
  cumulativePoints: NormalizedPoint[],
): void {
  let cursorValue = 0
  let cumulativeIndex = 0

  const series = cumulativePoints.map((point) => ({
    hour: toHours(point.date),
    value: point.value,
  }))

  for (const axisPoint of axisPoints) {
    const axisHour = axisPoint.x ?? 0

    while (
      cumulativeIndex < series.length &&
      series[cumulativeIndex].hour <= axisHour + 1e-6
    ) {
      cursorValue = series[cumulativeIndex].value
      cumulativeIndex++
    }

    axisPoint.value = cursorValue
  }
}

function snapToAxisHour(value: number): number | null {
  if (value < 0 || value > 24) {
    return null
  }

  const snapped = Math.round(value / AXIS_STEP_HOURS) * AXIS_STEP_HOURS

  if (snapped < 0 || snapped > 24) {
    return null
  }

  return snapped
}

function formatHourByNumber(hour: number): string {
  const normalizedHour = Math.min(Math.max(hour, 0), 24)

  const displayHour =
    normalizedHour === 24 ? 0 : Math.max(0, Math.min(normalizedHour, 23))

  const hh = String(displayHour).padStart(2, '0')

  return `${hh}:00`
}

function resolveAxisValue(
  axisHour: number,
  series: { hour: number; value: number }[],
): number {
  for (let i = 0; i < series.length; i++) {
    if (axisHour <= series[i].hour) {
      return series[i].value
    }
  }

  return series[series.length - 1]?.value ?? 0
}

function groupPointsByDay(
  points: NormalizedPoint[],
  start: Date,
  end: Date,
): Map<number, number> {
  const result = new Map<number, number>()

  for (const point of points) {
    if (!isWithinInterval(point.date, start, end)) {
      continue
    }

    const dayKey = startOfDay(point.date).getTime()
    const prev = result.get(dayKey)
    const value = point.value

    if (prev == null) {
      result.set(dayKey, value)
    } else {
      result.set(dayKey, Math.max(prev, value))
    }
  }

  return result
}
