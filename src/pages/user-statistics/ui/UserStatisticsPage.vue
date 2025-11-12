<template>
  <div class="w-full pb-12">
    <div
      class="pt-7 px-4 pb-4 flex items-center justify-between flex-col mb-6"
      :style="{ background: 'rgba(29, 29, 29, 1)' }"
    >
      <div
        class="rounded-full w-20 h-20 overflow-hidden flex justify-center items-center mb-4"
        :style="{ background: 'rgba(255, 255, 255, 0.08)' }"
      >
        <img
          class="w-[52px] h-[52px]"
          src="@/shared/assets/images/user-statistics-image.png"
          alt="user-statistics-image"
        />
      </div>
      <p class="text-white mb-2 font-bold text-2xl">
        {{ ru.userStatistics.title }}
      </p>
      <p
        class="text-base text-center"
        :style="{ color: 'rgba(162, 172, 176, 1)' }"
      >
        {{ ru.userStatistics.description }}
      </p>
    </div>
    <div class="px-4">
      <StatsLineCard
        class="mb-6"
        :title="ru.userStatistics.chartUserCalories.title"
        :loader="loadCaloriesPoints"
        v-model="caloriesRange"
      />
      <StatsLineCard
        :title="ru.userStatistics.chartUserWeight.title"
        :loader="loadWeightPoints"
        v-model="weightRange"
        :y-max="dailyStatsCache.weight + 30"
        :y-min="dailyStatsCache.weight - 30"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ru } from '@/shared/lib/i18n/ru'
import StatsLineCard from '@/widgets/user-statistics/ui/StatsLineCard.vue'
import { userStatistics } from '@/widgets/user-statistics/model'
import { useMainPage } from '@/pages/main-page'

const { dailyStatsCache } = useMainPage()

const { loadCaloriesPoints, loadWeightPoints, caloriesRange, weightRange } =
  userStatistics()
</script>

<style scoped></style>
