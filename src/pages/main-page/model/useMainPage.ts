import { computed, onBeforeMount, ref, shallowRef, watch } from 'vue'
import { useDailyMealsStats } from '@/entities/meal/api/useDailyMealsStats'
import { useMeals } from '@/entities/meal/api/useMeals'
import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ModalNames } from '@/shared/types/modalNames'

export const currentSelectedDate = ref<Date | null>(new Date())

export const dailyStatsCache = shallowRef<DailyStatsResponse | null>(null)

const mealsCache = shallowRef<MealsResponse | null>(null)

export function hasUnrecognizedNewMeal(
  dailyMeal: MealsResponse,
  newValue: MealsResponse,
): boolean {
  if (!dailyMeal) {
    return
  }

  const existingIds = new Set(dailyMeal.meals.map((m) => m.id))

  for (let i = 0; i < newValue.meals.length; i++) {
    const m = newValue.meals[i]

    const isNew = !existingIds.has(m.id)

    const isEmpty = (m.dishes?.length ?? 0) === 0

    if (isNew && isEmpty) {
      return true
    }
  }

  return false
}

export function useMainPage() {
  const { setOpenedModal } = useOverlayManager()

  const {
    data: statsData,
    isLoading: statsLoading,
    fetchStats,
  } = useDailyMealsStats()

  const { data: mealsData, isLoading: mealsLoading, fetchMeals } = useMeals()

  watch(currentSelectedDate, async (value) => {
    try {
      await loadAll(value ?? undefined)
    } catch (err) {
      console.error('Failed to fetch main page data', err)
    }
  })

  watch(
    statsData,
    (value) => {
      if (value) {
        dailyStatsCache.value = value
      }
    },
    { flush: 'post' },
  )

  watch(
    mealsData,
    (value) => {
      if (value) {
        if (hasUnrecognizedNewMeal(mealsCache.value, value)) {
          setOpenedModal(ModalNames.RetakePhotoModal)
        }

        mealsCache.value = value
      }
    },
    { flush: 'post' },
  )

  onBeforeMount(() => {
    if (dailyStats.value) {
      return
    }

    void loadAll()
  })

  const dailyStats = computed(() => statsData.value ?? dailyStatsCache.value)

  async function loadStats(date?: Date | null) {
    await fetchStats(date ?? undefined)
  }

  async function loadMeals(date?: Date | null) {
    await fetchMeals(date ?? undefined)
  }

  async function loadAll(date?: Date | null) {
    const targetDate = date ?? currentSelectedDate.value ?? undefined

    await Promise.all([fetchStats(targetDate), fetchMeals(targetDate)])
  }

  return {
    dailyStatsCache,
    mealsCache,
    statsLoading,
    mealsLoading,
    loadStats,
    loadMeals,
    loadAll,
  }
}
