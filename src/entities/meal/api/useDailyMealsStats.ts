import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { DailyStatsResponse } from '@/entities/meal/types'

export function useDailyMealsStats() {
  const { endOfDay, toLocalIsoWithOffset } = useISODate()

  const data = ref<DailyStatsResponse | null>(null)

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function fetchStats(endDate?: Date) {
    isLoading.value = true
    error.value = null
    try {
      const end = endDate ? endOfDay(endDate) : endOfDay(new Date())
      const endIso = toLocalIsoWithOffset(end)
      data.value = await apiRequest<DailyStatsResponse>(
        ApiResponseType.GetUserDailyStats,
        {
          method: 'GET',
          searchParams: { endDate: endIso },
        },
      )
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchStats }
}
