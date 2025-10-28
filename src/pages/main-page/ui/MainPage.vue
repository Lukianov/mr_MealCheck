<template>
  <div class="w-full pb-10" :style="{ background: 'rgba(18, 18, 18, 1)' }">
    <CalenderHeader class="mb-3 sticky relative top-0" />
    <div class="px-4">
      <DailyProgress
        class="mb-6"
        :reached-kcal="DAILY_PROGRESS.reachedKcal"
        :goal-kcal="DAILY_PROGRESS.goalKcal"
        :macros="DAILY_PROGRESS.macros"
      />
      <MealList classs="mx-4" :meals="DAILY_MEALS" />
    </div>
    <LogMeal class="fixed bottom-12 right-4" />
  </div>
</template>

<script setup lang="ts">
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import { MealItem } from '@/features/meal-row/types'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/widgets/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'

const DAILY_PROGRESS = {
  reachedKcal: 100,
  goalKcal: 1500,
  macros: { protein: 24, fat: 18, carbs: 52 },
}

const DAILY_MEALS: MealItem[] = [
  {
    id: 1,
    title: 'Snack #1',
    description: 'Oatmeal with fruits and nuts',
    image: 'src/shared/assets/images/mock-images/meal-template.jpg',
    status: '',
  },
  {
    id: 2,
    title: 'Snack #1',
    description: 'Oatmeal with fruits and nuts',
    image: 'src/shared/assets/images/mock-images/meal-template.jpg',
    status: '',
  },
  {
    id: 3,
    title: 'Snack #1',
    description: 'Oatmeal with fruits and nuts',
    image: 'src/shared/assets/images/mock-images/meal-template.jpg',
    status: '',
  },
  {
    id: 4,
    title: 'Snack #1',
    description: 'Spaghetti Bolognese, Cappuchino, Cheese Sandwich',
    image: 'src/shared/assets/images/mock-images/meal-template.jpg',
    status: 'pending',
  },
]
</script>

<style scoped></style>
