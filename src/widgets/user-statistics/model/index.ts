import { useUserCaloriesStatistics } from '@/features/get-user-calories-stat/api/useUserCaloriesStatistics'
import { useUserWeightStatistics } from '@/features/get-user-weight-stat/api/useUserWeightStatistics'
import { StatsRange } from '@/shared/types/stats'

export const userStatistics = () => {
  function formatLabel(iso: string) {
    const d = new Date(iso)

    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  }

  const { fetchUserCalories } = useUserCaloriesStatistics()

  const { fetchUserWeightStatistics } = useUserWeightStatistics()

  async function loadCaloriesPoints(range: StatsRange) {
    const raw = await fetchUserCalories(range)

    return raw.kcalStats.map((p) => ({
      value: Math.round(p.kcal ?? 0),
      label: formatLabel(p.date),
    }))
  }

  async function loadWeightPoints(range: StatsRange) {
    const raw = await fetchUserWeightStatistics(range)

    return raw.weightStats.map((p) => ({
      value: Math.round(p.weight ?? 0),
      label: formatLabel(p.date),
    }))
  }

  return {
    loadCaloriesPoints,
    loadWeightPoints,
  }
}
