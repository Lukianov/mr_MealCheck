import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { StatsRange } from '@/shared/types/stats'
import { FetchUserCaloriesRequestResponse } from '@/features/get-user-calories-stat/types'

export function useUserCaloriesStatistics() {
  const { toLocalIsoWithOffset, getRange } = useISODate()

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function fetchUserCalories(range: StatsRange, now = new Date()) {
    isLoading.value = true

    error.value = null

    const { start, end } = getRange(range, now)

    try {
      return await apiRequest<FetchUserCaloriesRequestResponse>(
        ApiResponseType.GetUserCaloriesStatistics,
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

  return { fetchUserCalories, isLoading, error }
}
