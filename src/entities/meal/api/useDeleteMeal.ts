import { ref } from 'vue'
import { apiRequest } from '@/shared/api'

export function useDeleteMeal() {
  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function deleteMeal(id: number) {
    isLoading.value = true

    error.value = null

    try {
      await apiRequest<void>(`users/meals/${id}`, { method: 'DELETE' })
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { deleteMeal, isLoading, error }
}
