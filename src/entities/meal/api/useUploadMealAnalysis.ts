import { ref } from 'vue'
import { apiRequest } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { UploadAnalysisResponse } from '@/entities/meal/types'

export function useUploadMealAnalysis() {
  const { toLocalIsoWithOffset } = useISODate()

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function upload(photo: File, currentDate?: Date) {
    isLoading.value = true
    error.value = null
    try {
      const form = new FormData()
      form.append('photo', photo)

      const nowIso = toLocalIsoWithOffset(currentDate ?? new Date())

      form.append('currentDate', nowIso)

      return await apiRequest<UploadAnalysisResponse>('/users/meals/analyses', {
        method: 'POST',
        body: form,
      })
    } catch (e) {
      error.value = e

      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { upload, isLoading, error }
}
