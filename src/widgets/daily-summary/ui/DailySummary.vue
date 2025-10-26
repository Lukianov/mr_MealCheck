<template>
  <div
    class="rounded-2xl py-5 px-4"
    :style="{ background: 'rgba(29, 29, 29, 1)' }"
  >
    <div
      class="rounded-2xl border p-4 flex items-center justify-between"
      :style="{ 'border-color': 'rgba(255, 255, 255, 0.05)' }"
    >
      <div class="text-center">
        <p class="uppercase text-lg">{{ props.calories }}</p>
        <p
          class="uppercase text-sm font-semibold"
          :style="{ color: 'rgba(255, 255, 255, 0.5)' }"
        >
          {{ ru.summaryWidget.caloriesShort }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-white text-lg mb-1">{{ props.protein }}g</p>
        <p
          class="uppercase text-sm font-semibold"
          :style="{ color: 'rgba(255, 255, 255, 0.5)' }"
        >
          {{ ru.summaryWidget.protein }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-white text-lg mb-1">{{ props.fat }}g</p>
        <p
          class="uppercase text-sm font-semibold"
          :style="{ color: 'rgba(255, 255, 255, 0.5)' }"
        >
          {{ ru.summaryWidget.fat }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-white text-lg mb-1">{{ props.carbs }}g</p>
        <p
          class="uppercase text-sm font-semibold"
          :style="{ color: 'rgba(255, 255, 255, 0.5)' }"
        >
          {{ ru.summaryWidget.carbs }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ru } from '@/shared/lib/i18n/en'

interface Props {
  calories: string
  fat: string
  carbs: string
  protein: string
}

const props = defineProps<Props>()
</script>

<style scoped></style>
