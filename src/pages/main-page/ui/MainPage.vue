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
      <MealList :meals="mealsCache" :loading="mealsLoading" />
    </div>
    <LogMeal class="fixed bottom-12 right-4" @update-data="loadAll" />
  </div>
</template>

<script setup lang="ts">
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/widgets/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'
import { currentSelectedDate, useMainPage } from '@/pages/main-page/model'
import { computed } from 'vue'
import { DAILY_STATS_MOCK } from '@/shared/mocks'

const { dailyStatsCache, mealsCache, statsLoading, mealsLoading, loadAll } =
  useMainPage()

const displayStats = computed(() => dailyStatsCache.value ?? DAILY_STATS_MOCK)
</script>

<style scoped></style>
