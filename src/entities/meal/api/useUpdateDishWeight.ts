import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import type { Dish } from '@/entities/meal/types'

export function useUpdateDishWeight() {
  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function updateDishWeight(
    mealId: number,
    dishId: number,
    weight: number,
  ) {
    isLoading.value = true

    error.value = null

    try {
      return await apiRequest<Dish>(
        `${ApiResponseType.DeleteDish}${mealId}/dishes/${dishId}`,
        {
          method: 'PATCH',
          json: {
            weight,
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

  return { updateDishWeight, isLoading, error }
}
