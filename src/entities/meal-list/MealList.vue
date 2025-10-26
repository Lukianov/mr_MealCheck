<template>
  <div>
    <p class="text-white mb-3 text-base mx-4">
      {{ ru.todayMealBlock.mealBlockTitle }}
    </p>
    <div class="rounded-2xl overflow-hidden">
      <MealRow
        v-for="item in props.meals"
        :key="item.id"
        v-bind="item"
        class="not-last:border-b"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.15)' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MealItem } from '@/features/meal-row/types'
import MealRow from '@/features/meal-row/ui/MealRow.vue'
import { ru } from '@/shared/lib/i18n/en'

const props = defineProps<{
  meals: MealItem[]
}>()
</script>

<style scoped></style>
