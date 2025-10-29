import { ref, onUnmounted } from 'vue'
import { apiRequest } from '@/shared/api'
import { AnalysisStatusResponse } from '@/entities/meal/types'

export function usePollMealAnalysisStatus(
  id: number,
  intervalMs = 5000,
  maxAttempts = 120,
) {
  const status = ref<AnalysisStatusResponse | null>(null)
  const isPolling = ref(false)
  const attempts = ref(0)
  const error = ref<unknown>(null)

  let timer: number | null = null

  async function fetchOnce() {
    const res = await apiRequest<AnalysisStatusResponse>(
      `/users/meals/analyzes/${id}`,
      {
        method: 'GET',
      },
    )
    status.value = res

    return res
  }

  async function start() {
    if (isPolling.value) {
      return
    }

    isPolling.value = true

    error.value = null
    attempts.value = 0

    const tick = async () => {
      try {
        attempts.value += 1
        const res = await fetchOnce()
        if (res.status === 'done' || attempts.value >= maxAttempts) {
          stop()
          return
        }
        timer = window.setTimeout(tick, intervalMs)
      } catch (e) {
        error.value = e

        stop()
      }
    }

    await tick()
  }

  function stop() {
    isPolling.value = false

    if (timer) {
      clearTimeout(timer)

      timer = null
    }
  }

  onUnmounted(stop)

  return { status, isPolling, attempts, error, start, stop, fetchOnce }
}
