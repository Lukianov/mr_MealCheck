import { computed, ref, shallowRef, watch } from 'vue'
import { useDailyMealsStats } from '@/entities/meal/api/useDailyMealsStats'
import { useMeals } from '@/entities/meal/api/useMeals'
import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ModalNames } from '@/shared/types/modalNames'
import { useMarkMealViewed } from '@/entities/meal/api/useMarkMealViewed'
import { ru } from '@/shared/lib/i18n/ru'
import { useISODate } from '@/shared/lib/composables/useISODate'

export const currentSelectedDate = ref<Date | null>(new Date())

const dailyStatsCache = shallowRef<DailyStatsResponse | null>(null)

const mealsCache = shallowRef<MealsResponse | null>(null)

const { markViewed } = useMarkMealViewed()

const { setOpenedModal } = useOverlayManager()

const {
  data: statsData,
  isLoading: statsLoading,
  fetchStats,
} = useDailyMealsStats()

const { data: mealsData, isLoading: mealsLoading, fetchMeals } = useMeals()

const initialized = ref(false)

function initOnce() {
  if (initialized.value) {
    return
  }

  initialized.value = true

  watch(currentSelectedDate, (value) => {
    void loadAll(value ?? undefined)
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
        const unrecognizedMealId = getUnrecognizedNewMealId(
          mealsCache.value,
          value,
        )

        if (unrecognizedMealId) {
          markViewed(unrecognizedMealId).catch((error) => {
            console.error('Unrecognized meal', error, value)
          })
          setOpenedModal(ModalNames.RetakePhotoModal)
        }

        mealsCache.value = value
      }
    },
    { flush: 'post' },
  )

  if (!dailyStatsCache.value) {
    void loadAll()
  }
}

function getUnrecognizedNewMealId(
  dailyMeal: MealsResponse | null,
  newValue: MealsResponse,
): number | undefined {
  if (!dailyMeal) return
  const existingIds = new Set(dailyMeal.meals.map((m) => m.id))
  for (let i = 0; i < newValue.meals.length; i++) {
    const m = newValue.meals[i]
    const isNew = !existingIds.has(m.id)
    const isEmpty = (m.dishes?.length ?? 0) === 0
    if (isNew && isEmpty) return m.id
  }
  return undefined
}

const { formatToDayMonth } = useISODate()

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

const isToday = computed(() =>
  currentSelectedDate.value
    ? currentSelectedDate.value.toDateString() === new Date().toDateString()
    : false,
)

const dailyStats = computed(() => statsData.value ?? dailyStatsCache.value)

const headerDate = computed(() =>
  isToday.value
    ? `${ru.dailyProgressWidget.title}`
    : formatToDayMonth(currentSelectedDate.value),
)

export function useMainPage() {
  initOnce()

  return {
    isToday,
    dailyStatsCache,
    mealsCache,
    statsLoading,
    mealsLoading,
    loadStats,
    loadMeals,
    loadAll,
    dailyStats,
    headerDate,
    currentSelectedDate,
  }
}
