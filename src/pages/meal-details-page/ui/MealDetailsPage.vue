<template>
  <div class="pb-20">
    <MealHero
      :title="meal.title"
      :subtitle="meal.subtitle"
      :image="meal.image"
      :macros="meal.macros"
    />

    <main class="container">
      <div class="pt-5 px-4 mb-6">
        <div class="mb-4">
          <div class="font-semibold text-white mb-1 text-2xl">
            {{ meal.title }}
          </div>
          <div
            v-if="meal.subtitle"
            class="text-sm"
            :style="{ color: 'rgba(162, 172, 176, 1)' }"
          >
            {{ meal.subtitle }}
          </div>
        </div>
        <div class="flex items-center justify-center gap-2">
          <StatChip label="KCAL" :value="200" postfix="" />
          <StatChip label="PROTEIN" :value="43" postfix="g" />
          <StatChip label="FAT" :value="43" postfix="g" />
          <StatChip label="CARBS" :value="43" postfix="g" />
        </div>
      </div>
      <MealSummaryCard
        class="mb-6 px-4"
        :summary="meal.summary!"
        :recommendations="meal.recommendations!"
      />
      <div
        class="mb-6 border-b"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
      ></div>
      <DishSection id="dish-section" class="px-4" :dishes="meal.dishes" />
    </main>
  </div>
</template>

<script setup lang="ts">
import MealHero from '@/widgets/meal-hero/ui/MealHero.vue'
import MealSummaryCard from '@/widgets/meal-summary/ui/MealSummaryCard.vue'
import DishSection from '@/widgets/dish-section/ui/DishSection.vue'
import { mockMeal } from '@/pages/meal-details-page/model/mock'
import StatChip from '@/shared/ui/StatChip.vue'

const meal = mockMeal
</script>
