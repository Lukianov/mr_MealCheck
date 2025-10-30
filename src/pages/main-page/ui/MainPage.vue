<template>
  <div
    class="w-full pb-10 relative"
    :style="{ background: 'rgba(18, 18, 18, 1)' }"
  >
    <CalenderHeader class="mb-3 sticky top-0" />
    <div class="px-4">
      <DailyProgress class="mb-6" :stats="DAILY_PROGRESS" />
      <MealList classs="mx-4" :meals="DAILY_MEALS" />
    </div>
    <LogMeal class="fixed bottom-12 right-4" @open-analyze-popup="handleOpen" />
<!--    <MealAnalyzingModal v-if="isOpen" />-->
<!--    <DeleteMealModal v-if="isOpen" />-->
<!--    <UnrecognizedMealModal v-if="isOpen" />-->
  </div>
</template>

<script setup lang="ts">
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import { MealItem } from '@/features/meal-row/types'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/widgets/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'
import type { DailyStatsResponse } from '@/entities/meal/types'
import { ref } from 'vue'

import MealAnalyzingModal from '@/entities/meal/ui/MealAnalyzingModal.vue'
import DeleteMealModal from "@/entities/meal/ui/DeleteMealModal.vue";
import UnrecognizedMealModal from "@/entities/meal/ui/UnrecognizedMealModal.vue";

const DAILY_PROGRESS: DailyStatsResponse = {
  reached: {
    kcal: 100,
    protein: 24,
    fat: 18,
    carbs: 52,
  },
  goal: {
    kcal: 1500,
    protein: 100,
    fat: 70,
    carbs: 250,
  },
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

const isOpen = ref(true)

const handleOpen = () => {
  isOpen.value = true
}
</script>

<style scoped></style>
