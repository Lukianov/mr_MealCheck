<template>
  <div
    class="w-full pb-10 relative"
    :style="{ background: 'rgba(18, 18, 18, 1)' }"
  >
    <div ref="headerRef" class="mb-3 sticky top-0 z-10">
      <CalenderHeader
        :is-glass="isGlassVisible"
        v-model:selectedDate="currentSelectedDate"
      />
    </div>
    <div class="px-4">
      <div ref="firstBlockRef" class="mb-6">
        <DailyProgress
          :stats="dailyStatsCache"
          :current-date="headerDate"
          :loading="statsLoading"
        />
      </div>
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
import { ref } from 'vue'
import CalenderHeader from '@/widgets/calendar-header/ui/CalenderHeader.vue'
import MealList from '@/entities/meal-list/MealList.vue'
import LogMeal from '@/entities/log-meal/ui/LogMeal.vue'
import { DailyProgress } from '@/widgets/daily-progress'
import { currentSelectedDate, useMainPage } from '@/pages/main-page'
import WeightChanger from '@/entities/weight-changer/ui/WeightChanger.vue'
import { useCalendarHeaderGlass } from '@/shared/lib/composables/useCalendarHeaderGlass'

const headerRef = ref<HTMLElement | null>(null)
const firstBlockRef = ref<HTMLElement | null>(null)

const {
  dailyStatsCache,
  mealsCache,
  statsLoading,
  mealsLoading,
  loadAll,
  isToday,
  headerDate,
} = useMainPage()

const { isGlassVisible } = useCalendarHeaderGlass(headerRef, firstBlockRef)
</script>

<style scoped></style>
