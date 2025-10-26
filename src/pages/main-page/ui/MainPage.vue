<template>
  <div class="w-full" :style="{ background: 'rgba(18, 18, 18, 1)' }">
    <CalenderHeader class="mb-3" />
    <DailySummary v-bind="MOCK_DAILY" />
    <MealList class="mx-4" :meals="DAILY_MEALS" />
  </div>
</template>

<script setup lang="ts">
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import DailySummary from '@/widgets/daily-summary/ui/DailySummary.vue'
import { MealItem } from '@/features/meal-row/types'
import MealList from '@/entities/meal-list/MealList.vue'

const MOCK_DAILY = {
  carbs: '30',
  protein: '30',
  fat: '30',
  calories: '300',
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
    description: 'Oatmeal with fruits and nuts',
    image: 'src/shared/assets/images/mock-images/meal-template.jpg',
    status: 'pending',
  },
]
</script>

<style scoped></style>
