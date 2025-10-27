<template>
  <div>
    <p class="text-white mb-3 text-base mx-4">
      {{ ru.todayMealBlock.mealBlockTitle }}
    </p>
    <div class="rounded-2xl overflow-hidden mb-4">
      <MealRow
        v-for="(item, index) in props.meals"
        :has-border="props.meals.length !== index + 1"
        :key="item.id"
        v-bind="item"
        class="not-last:border-b"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.15)' }"
      />
    </div>
    <p
      class="text-white text-base text-center"
      :style="{ color: 'rgba(162, 172, 176, 1)' }"
      v-if="props.meals.length"
    >
      {{ props.meals.length }} meals
    </p>
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
