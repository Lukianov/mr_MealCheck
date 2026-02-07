<template>
  <div class="pb-20 w-full">
    <MealHero
      :title="displayMeal.title"
      :subtitle="displayMeal.subtitle"
      :image="displayMeal.image"
      :is-loading="isLoading"
    />

    <main class="container">
      <div class="px-4">
        <UIDetailedMealSkeleton v-if="isLoading" />
        <template v-else>
          <template v-if="!isLoading && hasMeal">
            <div class="pt-5 mb-6">
              <div class="mb-4">
                <div class="font-semibold text-white mb-1 text-2xl">
                  {{ displayMeal.title }}
                </div>
                <div
                  v-if="displayMeal.subtitle"
                  class="text-sm"
                  :style="{ color: 'rgba(162, 172, 176, 1)' }"
                >
                  {{ displayMeal.subtitle }}
                </div>
              </div>
              <div class="flex items-center justify-center gap-2">
                <StatChip
                  v-for="chip in macroChips"
                  :key="chip.key"
                  :label="chip.label"
                  :value="chip.value"
                  :postfix="chip.postfix"
                />
              </div>
            </div>
            <MealSummaryCard
              class="mb-6"
              :avg-health-score="displayMeal.avgHealthScore"
              :summary="displayMeal.summary"
              :recommendations="displayMeal.recommendation"
            />
            <div
              class="mb-6 border-b -mx-4"
              :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
            ></div>
            <DishSection
              id="dish-section"
              class="mb-6"
              :dishes="dishList"
              @on-delete="
                (event) =>
                  setOpenedModal(ModalNames.DeleteDishModal, {
                    dish: event,
                    meal: displayMeal,
                  })
              "
            />
          </template>
          <ResendMeal :meal-id="mealId" v-else-if="!hasMeal && !isLoading" />
        </template>
        <div
          :class="{
            'absolute  bottom-10 w-full px-4 left-0': !hasMeal && !isLoading,
          }"
        >
          <UIButton
            v-if="!isLoading"
            @click="() => setOpenedModal(ModalNames.DeleteMealModal)"
            class="w-full"
          >
            <p :style="{ color: 'rgba(255, 37, 80, 1)' }">
              {{ ru.mealDetail.deleteButton }}
            </p>
          </UIButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MealHero from '@/widgets/meal-hero/ui/MealHero.vue'
import MealSummaryCard from '@/widgets/meal-summary/ui/MealSummaryCard.vue'
import DishSection from '@/widgets/dish-section/ui/DishSection.vue'
import StatChip from '@/shared/ui/StatChip.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { ru } from '@/shared/lib/i18n/ru'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ModalNames } from '@/shared/types/modalNames'
import ResendMeal from '@/features/send-meal-again/ui/ResendMeal.vue'
import { useMealDetails } from '@/entities/meal/api/useMealDetails'
import type { Dish as UIDish } from '@/entities/meal/model/types'
import { useMarkMealViewed } from '@/entities/meal/api/useMarkMealViewed'
import { useMainPage } from '@/pages/main-page'
import UIDetailedMealSkeleton from '@/entities/meal/ui/UIDetailedMealSkeleton.vue'
import { TYPE_LABEL } from '@/shared/const'

const route = useRoute()

const { cacheMealDetails, isLoading, fetchMeal } = useMealDetails()

const { markViewed } = useMarkMealViewed()

const { mealsCache } = useMainPage()

const mealId = computed(() => {
  const raw = route.params.id

  const normalized = Array.isArray(raw) ? raw[0] : raw

  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : null
})

onBeforeUnmount(() => {
  // cacheMealDetails.value = null
})

async function loadMeal(id: number | null) {
  if (!id) {
    return
  }

  try {
    await fetchMeal(id)
  } catch (err) {
    // mealsCache.value.meals = mealsCache.value.meals.filter(
    //   (meal) => meal.id !== id,
    // )

    await markViewed(cacheMealDetails.value.id)

    console.error('Failed to fetch meal details', err, err.message)
  }
}

onMounted(async () => {
  await loadMeal(mealId.value)

  if (cacheMealDetails.value && !cacheMealDetails.value?.isViewed) {
    void markViewed(cacheMealDetails.value.id)

    mealsCache.value.meals.forEach((item) => {
      if (item.id === cacheMealDetails.value.id) {
        item.isViewed = true
      }
    })
  }
})

const hasMeal = computed(() => !isLoading.value && cacheMealDetails.value)

const displayMeal = computed(() => {
  if (!cacheMealDetails.value) {
    return {
      title: '',
      subtitle: '',
      image: '',
    }
  }

  const subtitle = cacheMealDetails.value.dishes.length
    ? cacheMealDetails.value.dishes.map((dish) => dish.name).join(', ')
    : ''

  return {
    id: cacheMealDetails.value.id,
    title: TYPE_LABEL[cacheMealDetails.value.type] ?? 'Meal',
    subtitle,
    avgHealthScore: cacheMealDetails.value.avgHealthScore,
    image: cacheMealDetails.value.photoUrl,
    summary: cacheMealDetails.value.summary ?? '',
    recommendation: cacheMealDetails.value.recommendation ?? '',
    macros: {
      kcal: cacheMealDetails.value.kcal,
      protein: cacheMealDetails.value.protein,
      fat: cacheMealDetails.value.fat,
      carb: cacheMealDetails.value.carb,
    },
    dishes: cacheMealDetails.value.dishes.map((dish) => ({
      id: dish.id,
      name: dish.name,
      healthScore: dish.healthScore,
      weight:
        typeof dish.weight === 'number'
          ? `${Math.round(dish.weight)} g`
          : undefined,
      recommendation: dish?.recommendation,
      macros: {
        protein: dish.protein ?? undefined,
        fat: dish.fat ?? undefined,
        carbs: dish.carb ?? undefined,
        calories: dish.kcal ?? undefined,
      },
    })),
  }
})

const macroChips = computed(() => [
  {
    key: 'kcal',
    label: ru.metrics.kcal,
    value: displayMeal.value?.macros.kcal,
    postfix: '',
  },
  {
    key: 'protein',
    label: ru.metrics.protein,
    value: displayMeal.value?.macros.protein,
    postfix: 'g',
  },
  {
    key: 'fat',
    label: ru.metrics.fat,
    value: displayMeal.value?.macros.fat,
    postfix: 'g',
  },
  {
    key: 'carb',
    label: ru.metrics.carbs,
    value: displayMeal.value?.macros.carb,
    postfix: 'g',
  },
])

const dishList = computed(
  () => displayMeal.value?.dishes as unknown as UIDish[],
)

const { setOpenedModal } = useOverlayManager()
</script>
