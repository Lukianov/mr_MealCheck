import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { MealsResponse } from '@/entities/meal/types'

export function useMeals() {
  const { endOfDay, toLocalIsoWithOffset } = useISODate()

  const data = ref<MealsResponse | null>(null)

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function fetchMeals(endDate?: Date) {
    isLoading.value = true

    error.value = null

    try {
      const end = endDate ? endOfDay(endDate) : endOfDay(new Date())

      const endIso = toLocalIsoWithOffset(end)

      data.value = await apiRequest<MealsResponse>(
        ApiResponseType.GetUserMeals,
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

  return { data, isLoading, error, fetchMeals }
}
