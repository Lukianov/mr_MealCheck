import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'

export function useDeleteDish() {
  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function deleteDish(mealId: number, dishId: number) {
    isLoading.value = true

    error.value = null

    try {
      await apiRequest<void>(
        `${ApiResponseType.DeleteDish}${mealId}/dishes/${dishId}`,
        { method: 'DELETE' },
      )
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { deleteDish, isLoading, error }
}
