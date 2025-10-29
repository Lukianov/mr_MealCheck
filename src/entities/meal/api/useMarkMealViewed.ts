import { ref } from 'vue'
import { apiRequest } from '@/shared/api'

export function useMarkMealViewed() {
  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function markViewed(id: number) {
    isLoading.value = true
    error.value = null
    try {
      await apiRequest<void>(`/users/meals/${id}/viewed`, { method: 'PUT' })
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { markViewed, isLoading, error }
}
