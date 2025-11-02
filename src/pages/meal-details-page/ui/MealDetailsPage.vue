<template>
  <div class="pb-20">
    <MealHero
      :title="displayMeal.title"
      :subtitle="displayMeal.subtitle"
      :image="displayMeal.image"
    />

    <main class="container">
      <div class="px-4">
        <template v-if="hasMeal">
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
            :summary="displayMeal.summary"
            :recommendations="displayMeal.recommendation"
          />
          <div
            class="mb-6 border-b -mx-4"
            :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
          ></div>
          <DishSection id="dish-section" class="mb-6" :dishes="dishList" />
        </template>
        <ResendMeal v-else />
        <UIButton
          @click="() => setOpenedModal(ModalNames.DeleteMealModal)"
          class="w-full"
        >
          <p :style="{ color: 'rgba(255, 37, 80, 1)' }">
            {{ ru.mealDetail.deleteButton }}
          </p>
        </UIButton>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
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
import type { MealType } from '@/entities/meal/types'
import type { Dish as UIDish } from '@/entities/meal/model/types'
import { DEFAULT_MEAL_DETAILS } from '@/shared/mocks'
import { useMarkMealViewed } from '@/entities/meal/api/useMarkMealViewed'
import { useMainPage } from '@/pages/main-page/model'

const route = useRoute()

const { data, isLoading, fetchMeal } = useMealDetails()

const mealId = computed(() => {
  const raw = route.params.id

  const normalized = Array.isArray(raw) ? raw[0] : raw

  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : null
})

async function loadMeal(id: number | null) {
  if (!id) {
    return
  }

  try {
    await fetchMeal(id)
  } catch (err) {
    console.error('Failed to fetch meal details', err)
  }
}

const { markViewed } = useMarkMealViewed()

const { meals } = useMainPage()

onMounted(() => {
  const currentMeal = meals.value.meals.find((item) => item.id === mealId.value)

  if (currentMeal && !currentMeal.isViewed) {
    markViewed(currentMeal.id)

    currentMeal.isViewed = true
  }

  void loadMeal(mealId.value)
})

const rawMeal = computed(() => data.value ?? DEFAULT_MEAL_DETAILS)
const hasMeal = computed(() => !isLoading.value && data.value.dishes.length)

const MEAL_TYPE_LABEL: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

const displayMeal = computed(() => {
  const details = rawMeal.value
  const subtitle = details.dishes.length
    ? details.dishes.map((dish) => dish.name).join(', ')
    : ''

  return {
    id: details.id,
    title: MEAL_TYPE_LABEL[details.type] ?? 'Meal',
    subtitle,
    image: details.photoUrl,
    summary: details.summary ?? '',
    recommendation: details.recommendation ?? '',
    macros: {
      kcal: details.kcal,
      protein: details.protein,
      fat: details.fat,
      carb: details.carb,
    },
    dishes: details.dishes.map((dish, index) => ({
      id: `${details.id}-${index}`,
      name: dish.name,
      weight:
        typeof dish.weight === 'number'
          ? `${Math.round(dish.weight)} g`
          : undefined,
      calories: dish.kcal ?? undefined,
      macros: {
        protein: dish.protein ?? undefined,
        fat: dish.fat ?? undefined,
        carbs: dish.carb ?? undefined,
      },
    })),
  }
})

const macroChips = computed(() => [
  {
    key: 'kcal',
    label: 'KCAL',
    value: displayMeal.value.macros.kcal,
    postfix: '',
  },
  {
    key: 'protein',
    label: 'PROTEIN',
    value: displayMeal.value.macros.protein,
    postfix: 'g',
  },
  {
    key: 'fat',
    label: 'FAT',
    value: displayMeal.value.macros.fat,
    postfix: 'g',
  },
  {
    key: 'carb',
    label: 'CARBS',
    value: displayMeal.value.macros.carb,
    postfix: 'g',
  },
])

const dishList = computed(() => displayMeal.value.dishes as unknown as UIDish[])

const { setOpenedModal } = useOverlayManager()
</script>
