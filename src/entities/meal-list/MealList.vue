<template>
  <div>
    <p class="text-white mb-3 text-base mx-4 font-semibold">
      {{ ru.todayMealBlock.mealBlockTitle }}
    </p>
    <div class="rounded-2xl overflow-hidden mb-4">
      <MealRow
        v-for="(item, index) in mealRows"
        :has-border="mealRows.length !== index + 1"
        :key="item.id"
        v-bind="item"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.15)' }"
      />
      <div
        v-if="!mealRows.length && loading"
        class="p-6 text-center text-sm text-white/70"
      >
        Скелетон
      </div>
    </div>
    <p
      v-if="mealRows.length"
      class="text-white text-base text-center"
      :style="{ color: 'rgba(162, 172, 176, 1)' }"
    >
      {{ mealRows.length }} meals
    </p>
    <p
      v-else-if="!loading"
      class="text-white text-base text-center"
      :style="{ color: 'rgba(162, 172, 176, 1)' }"
    >
      {{ ru.todayMealBlock.empty }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MealItem } from '@/features/meal-row/types'
import MealRow from '@/features/meal-row/ui/MealRow.vue'
import { ru } from '@/shared/lib/i18n/ru'
import type { MealsResponse, MealType } from '@/entities/meal/types'

const props = withDefaults(
  defineProps<{
    meals: MealsResponse | null
    loading?: boolean
  }>(),
  {
    meals: null,
    loading: false,
  },
)

const TYPE_LABEL: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

const mealRows = computed<MealItem[]>(() => {
  if (!props.meals) {
    return []
  }

  const pending = props.meals.pendingMeals.map((item) => ({
    id: item.id,
    image: item.photoUrl,
    title: '',
    description: '',
    status: 'pending',
  }))

  const completed = props.meals.meals.map((meal) => ({
    id: meal.id,
    image: meal.photoUrl,
    title: TYPE_LABEL[meal.type],
    description: meal.dishes.map((dish) => dish.name).join(', '),
    status: 'completed',
    isViewed: meal.isViewed,
  }))

  return [...pending, ...completed]
})

const loading = computed(() => props.loading)
</script>

<style scoped></style>
