export type TabValue = 'day' | 'week' | 'month'

export type StatsRange = 'day' | 'week' | 'month'

export type StatsPoint = {
  value: number
  label: string
  x?: number
}

export type StatsEmptyState = 'today' | 'range'

export interface StatsLoadResult {
  points: StatsPoint[]
  emptyState?: StatsEmptyState
}
