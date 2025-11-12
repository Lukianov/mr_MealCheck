import { ref } from 'vue'
import { apiRequest, ApiResponseType } from '@/shared/api'
import { useISODate } from '@/shared/lib/composables/useISODate'
import { AnalysisTextResponse } from '@/entities/meal/types'

export function useAnalyseTextMeal() {
  const { toLocalIsoWithOffset } = useISODate()

  const isLoading = ref(false)

  const error = ref<unknown>(null)

  async function analyseTextMeal(mealText: string) {
    isLoading.value = true

    error.value = null

    try {
      const currentDate = toLocalIsoWithOffset(new Date())

      return await apiRequest<AnalysisTextResponse>(
        ApiResponseType.AnalyseTextMeal,
        {
          method: 'POST',
          json: {
            mealDescription: mealText,
            currentDate,
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

  return { analyseTextMeal, isLoading, error }
}
