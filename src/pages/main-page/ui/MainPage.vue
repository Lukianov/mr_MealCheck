<template>
  <div
    class="w-full pb-10 relative"
    :style="{ background: 'rgba(18, 18, 18, 1)' }"
  >
    <CalenderHeader
      class="mb-3 sticky top-0 z-10"
      v-model:selectedDate="currentSelectedDate"
    />
    <div class="px-4">
      <DailyProgress
        class="mb-6"
        :stats="dailyStatsCache"
        :current-date="headerDate"
        :loading="statsLoading"
      />
      <WeightChanger
        :weight="dailyStatsCache?.weight"
        :is-today="isToday"
        class="mb-6"
      />
      <MealList
        :current-date="headerDate"
        :meals="mealsCache"
        :loading="mealsLoading"
      />
    </div>
    <transition name="fade">
      <LogMeal
        v-show="isToday"
        class="fixed bottom-12 right-4"
        @update-data="loadAll"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/entities/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'
import { currentSelectedDate, useMainPage } from '@/pages/main-page'
import WeightChanger from '@/entities/weight-changer/ui/WeightChanger.vue'
import WebApp from '@twa-dev/sdk'

console.warn('mainpage', WebApp.initData)

const {
  dailyStatsCache,
  mealsCache,
  statsLoading,
  mealsLoading,
  loadAll,
  isToday,
  headerDate,
} = useMainPage()
</script>

<style scoped></style>
