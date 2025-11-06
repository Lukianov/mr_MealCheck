import { useMealAnalysisWorker } from '@/entities/meal/model/useMealAnalysisWorker'
import { useMainPage } from '@/pages/main-page/model'

export const getPullingMealStatus = () => {
  const { loadAll } = useMainPage()

  const { onEvent } = useMealAnalysisWorker()

  onEvent(async (event) => {
    if (event.type === 'done') {
      try {
        await loadAll()
      } catch (err) {
        console.error('Failed to refresh meals after analysis completion', err)
      }
    }
  })
}
