import { computed, onBeforeMount, ref, shallowRef, watch } from 'vue'
import { useDailyMealsStats } from '@/entities/meal/api/useDailyMealsStats'
import { useMeals } from '@/entities/meal/api/useMeals'
import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'

export const currentSelectedDate = ref<Date | null>(new Date())

export const dailyStatsCache = shallowRef<DailyStatsResponse | null>(null)

const mealsCache = shallowRef<MealsResponse | null>(null)

export function useMainPage() {
  const {
    data: statsData,
    isLoading: statsLoading,
    fetchStats,
  } = useDailyMealsStats()

  const { data: mealsData, isLoading: mealsLoading, fetchMeals } = useMeals()

  watch(
    currentSelectedDate,
    async (value) => {
      try {
        await loadAll(value ?? undefined)
      } catch (err) {
        console.error('Failed to fetch main page data', err)
      }
    },
    { immediate: true },
  )

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
        mealsCache.value = value
      }
    },
    { flush: 'post' },
  )

  const dailyStats = computed(() => statsData.value ?? dailyStatsCache.value)

  const meals = computed(() => mealsData.value ?? mealsCache.value)

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

  onBeforeMount(() => {
    if (!dailyStats.value) {
      return
    }

    void loadAll()
  })

  return {
    dailyStatsCache,
    currentSelectedDate,
    dailyStats,
    meals,
    statsLoading,
    mealsLoading,
    loadStats,
    loadMeals,
    loadAll,
  }
}
