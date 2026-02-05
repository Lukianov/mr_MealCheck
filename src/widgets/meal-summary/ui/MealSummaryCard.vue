<template>
  <Card>
    <template #header>
      {{ ru.mealDetail.mealSummaryCard.title }}
    </template>
    <template #default>
      <div
        class="border-b pb-3"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
      >
        <div class="text-sm text-zinc-400 mb-1">
          {{ ru.mealDetail.mealSummaryCard.summary }}
        </div>
        <p class="text-sm text-zinc-200 leading-relaxed">
          {{ summary }}
        </p>
      </div>
      <DishHealthBar :value="avgHealthScore" />
      <div
        class="border-b pb-3"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
      >
        <div class="text-sm text-zinc-400 mb-1">
          {{ ru.mealDetail.mealSummaryCard.recommendation }}
        </div>
        <p class="text-sm text-zinc-200 leading-relaxed">
          {{ recommendations }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm text-zinc-400">
          {{ ru.mealDetail.mealSummaryCard.recognizedDishes }}
        </div>
        <button
          type="button"
          class="cursor-pointer px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-100 text-sm border border-zinc-700"
          @click="scrollToDishSection"
        >
          {{ ru.mealDetail.mealSummaryCard.view }}
        </button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/shared/ui/Card.vue'
import { ru } from '@/shared/lib/i18n/ru'
import DishHealthBar from '@/widgets/health-bar/ui/DishHealthBar.vue'

defineProps<{
  summary: string
  recommendations: string
  avgHealthScore: number
}>()

const scrollToDishSection = () => {
  if (typeof document === 'undefined') {
    return
  }

  const section = document.getElementById('dish-section')
  if (!section) {
    return
  }

  const firstDish = section.querySelector<HTMLElement>('section')
  const target = firstDish ?? section

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
