import { ref } from 'vue'
import { useUserCaloriesStatistics } from '@/features/get-user-calories-stat/api/useUserCaloriesStatistics'
import { useUserWeightStatistics } from '@/features/get-user-weight-stat/api/useUserWeightStatistics'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { useMainPage } from '@/pages/main-page/model'
import type { FetchUserCaloriesRequestResponse } from '@/features/get-user-calories-stat/types'
import type { WeightPoint } from '@/features/get-user-weight-stat/types'
import type {
  StatsLoadResult,
  StatsPoint,
  StatsRange,
} from '@/shared/types/stats'

const DAY_IN_MS = 24 * 60 * 60 * 1000

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

export const userStatistics = () => {
  const caloriesRange = ref<StatsRange>('day')
  const weightRange = ref<StatsRange>('week')

  const { fetchUserCalories } = useUserCaloriesStatistics()
  const { fetchUserWeightStatistics } = useUserWeightStatistics()
  const { dailyStatsCache } = useMainPage()
  const { getRange } = useISODate()

  async function loadCaloriesPoints(range: StatsRange) {
    const raw = await fetchUserCalories(range)

    return formatCaloriesPoints(raw?.kcalStats ?? [], range, getRange)
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

function formatCaloriesPoints(
  stats: ReadonlyArray<KcalStat>,
  range: StatsRange,
  getRange: ReturnType<typeof useISODate>['getRange'],
  now = new Date(),
): StatsLoadResult {
  const normalized = normalizePoints(stats, (item) => item.kcal ?? 0)

  if (range === 'day') {
    return formatDaySeries(normalized, now)
  }

  if (range === 'week') {
    const bounds = getRange('week', now)

    return formatAggregatedSeries(
      normalized,
      createDayBuckets(bounds.start, bounds.end),
      'range',
    )
  }

  const bounds = getRange('month', now)

  return formatAggregatedSeries(
    normalized,
    createWeekBuckets(bounds.start, bounds.end),
    'range',
  )
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

    return formatWeightRangeSeries(
      normalized,
      createDayBuckets(bounds.start, bounds.end),
      currentWeight,
    )
  }

  const bounds = getRange('month', now)

  return formatWeightRangeSeries(
    normalized,
    createWeekBuckets(bounds.start, bounds.end),
    currentWeight,
  )
}

function formatDaySeries(points: NormalizedPoint[], now: Date): StatsLoadResult {
  const dayPoints = points
    .filter((point) => isSameDay(point.date, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map<StatsPoint>((point) => ({
      label: formatTime(point.date),
      value: point.value,
    }))

  if (!dayPoints.length) {
    return { points: [], emptyState: 'today' }
  }

  return { points: dayPoints }
}

function formatWeightDaySeries(
  points: NormalizedPoint[],
  now: Date,
  currentWeight: number | null,
): StatsLoadResult {
  const dayPoints = points
    .filter((point) => isSameDay(point.date, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map<StatsPoint>((point) => ({
      label: formatTime(point.date),
      value: point.value,
    }))

  if (dayPoints.length) {
    return { points: dayPoints }
  }

  if (currentWeight != null) {
    const rounded = Math.round(currentWeight)

    return {
      points: [
        { label: '00:00', value: rounded },
        { label: '23:59', value: rounded },
      ],
    }
  }

  return { points: [], emptyState: 'today' }
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

function formatWeightRangeSeries(
  points: NormalizedPoint[],
  buckets: DateBucket[],
  currentWeight: number | null,
): StatsLoadResult {
  if (!buckets.length) {
    return { points: [], emptyState: 'range' }
  }

  const filtered = filterPointsByBuckets(points, buckets)

  if (!filtered.length) {
    return { points: [], emptyState: 'range' }
  }

  const aggregated = aggregatePointsByBuckets(filtered, buckets)

  const resultPoints = aggregated.map<StatsPoint>((bucketPoint) => {
    if (bucketPoint.count === 0 && currentWeight != null) {
      return {
        label: bucketPoint.label,
        value: Math.round(currentWeight),
      }
    }

    return {
      label: bucketPoint.label,
      value: bucketPoint.value,
    }
  })

  return { points: resultPoints }
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

  const totalDays =
    Math.max(
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

function createWeekBuckets(start: Date, end: Date): DateBucket[] {
  const buckets: DateBucket[] = []

  let cursor = startOfDay(start)
  const max = endOfDay(end)

  while (cursor <= max) {
    const bucketStart = cursor
    const tentativeEnd = endOfDay(addDays(bucketStart, 6))
    const bucketEnd = tentativeEnd > max ? max : tentativeEnd

    buckets.push({
      start: bucketStart,
      end: bucketEnd,
      label: `${formatDayMonth(bucketStart)}-${formatDayMonth(bucketEnd)}`,
    })

    cursor = addDays(bucketEnd, 1)
  }

  return buckets
}

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
