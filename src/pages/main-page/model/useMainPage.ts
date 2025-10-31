import {
  computed,
  ref,
  shallowRef,
  watch,
  type ComputedRef,
  type Ref,
} from 'vue'
import { useDailyMealsStats } from '@/entities/meal/api/useDailyMealsStats'
import { useMeals } from '@/entities/meal/api/useMeals'
import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'

export const currentSelectedDate = ref<Date | null>(new Date())

export const dailyStatsCache = shallowRef<DailyStatsResponse | null>(null)

const mealsCache = shallowRef<MealsResponse | null>(null)

type MainPageStore = {
  dailyStats: ComputedRef<DailyStatsResponse | null>
  meals: ComputedRef<MealsResponse | null>
  statsLoading: Ref<boolean>
  mealsLoading: Ref<boolean>
  loadStats: (date?: Date | null) => Promise<void>
  loadMeals: (date?: Date | null) => Promise<void>
  loadAll: (date?: Date | null) => Promise<void>
}

let store: MainPageStore | null = null

function createStore(): MainPageStore {
  const {
    data: statsData,
    isLoading: statsLoading,
    fetchStats,
  } = useDailyMealsStats()

  const { data: mealsData, isLoading: mealsLoading, fetchMeals } = useMeals()

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

  return {
    dailyStats,
    meals,
    statsLoading,
    mealsLoading,
    loadStats,
    loadMeals,
    loadAll,
  }
}

export function useMainPage(): MainPageStore {
  if (!store) {
    store = createStore()
  }

  return store
}
