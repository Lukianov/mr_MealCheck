import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import type { MealDetailsResponse } from '@/entities/meal/types'

export function useMealDetails() {
  const data = ref<MealDetailsResponse | null>(null)

  const isLoading = ref(true)

  const error = ref<unknown>(null)

  async function fetchMeal(id: number) {
    if (!id) {
      throw new Error('Meal id is required')
    }

    isLoading.value = true

    error.value = null

    try {
      data.value = await apiRequest<MealDetailsResponse>(
        `${ApiResponseType.GetUserMeals}/${id}`,
        {
          method: 'GET',
        },
      )
    } catch (e) {
      error.value = e

      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    fetchMeal,
  }
}
