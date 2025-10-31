<template>
  <div
    class="w-full pb-10 relative"
    :style="{ background: 'rgba(18, 18, 18, 1)' }"
  >
    <CalenderHeader
      class="mb-3 sticky top-0"
      v-model:selectedDate="currentSelectedDate"
    />
    <div class="px-4">
      <DailyProgress
        class="mb-6"
        :stats="displayStats"
        :loading="statsLoading"
      />
      <MealList :meals="displayMeals" :loading="mealsLoading" />
    </div>
    <LogMeal class="fixed bottom-12 right-4" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/widgets/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'
import { currentSelectedDate, useMainPage } from '@/pages/main-page/model'
import { DAILY_STATS_MOCK, MEALS_RESPONSE_MOCK } from '@/shared/mocks'

const { dailyStats, meals, statsLoading, mealsLoading, loadAll } = useMainPage()

const displayStats = computed(() => dailyStats.value ?? DAILY_STATS_MOCK)

const displayMeals = computed(() => meals.value ?? MEALS_RESPONSE_MOCK)

watch(
  currentSelectedDate,
  async (value) => {
    try {
      await loadAll(value ?? undefined)
    } catch (err) {
      console.error('Failed to fetch main page data', err)
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
