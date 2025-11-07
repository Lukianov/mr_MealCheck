import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { StatsRange } from '@/shared/types/stats'
import { WeightPoint } from '@/features/get-user-weight-stat/types'

export function useUserWeightStatistics() {
  const { toLocalIsoWithOffset, getRange } = useISODate()

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function fetchUserWeightStatistics(
    range: StatsRange,
    now = new Date(),
  ) {
    isLoading.value = true

    error.value = null

    const { start, end } = getRange(range, now)

    try {
      return await apiRequest<{ weightStats: WeightPoint[] }>(
        ApiResponseType.GetUserWeightStatistics,
        {
          method: 'GET',
          searchParams: {
            startDate: toLocalIsoWithOffset(start),
            endDate: toLocalIsoWithOffset(end),
          },
        },
      )
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { fetchUserWeightStatistics, isLoading, error }
}
