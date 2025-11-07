<template>
  <section
    class="rounded-3xl text-zinc-50 shadow-xl ring-1 ring-white/5 p-4"
    :style="{ background: 'rgb(29, 29, 29)' }"
  >
    <div class="flex items-start gap-4 mb-6">
      <div class="flex-1">
        <h3
          class="text-base font-semibold mb-3"
          :style="{ color: 'rgba(162, 172, 176, 1)' }"
        >
          {{ ru.dailyProgressWidget.title }}
        </h3>

        <div class="mt-1 text-2xl font-semibold tabular-nums">
          <UISkeleton v-if="props.loading" class="h-14 w-40"></UISkeleton>
          <template v-else>
            <p class="text-3xl mb-0.5 font-semibold">
              {{ safeStats?.reached.kcal ?? 0 }} {{ ru.metrics.kcal }}
            </p>
            <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
              {{ ru.metrics.from ?? 0 }} {{ safeStats.goal.kcal }}
            </p>
          </template>
        </div>
      </div>

      <div class="shrink-0">
        <UIRingProgress
          :value="percent"
          :size="93"
          :stroke="12"
          progress-class="stroke-sky-500"
          track-class="stroke-zinc-800"
        >
          <UISkeleton v-if="props.loading" class="h-4 w-14"></UISkeleton>
          <div v-else class="text-center">
            <div class="text-base text-[18px] font-semibold tabular-nums">
              {{ percent }}%
            </div>
          </div>
        </UIRingProgress>
      </div>
    </div>

    <div>
      <div class="mt-4 grid gap-3 grid-cols-3 mb-4">
        <StatChip
          :label="ru.metrics.protein"
          :value="formatted.protein"
          postfix="g"
          :is-loading="props.loading"
        />
        <StatChip
          :label="ru.metrics.fat"
          :value="formatted.fat"
          postfix="g"
          :is-loading="props.loading"
        />
        <StatChip
          :label="ru.metrics.carbs"
          :value="formatted.carbs"
          postfix="g"
          :is-loading="props.loading"
        />
      </div>
    </div>

    <div class="h-px w-full bg-white/5 -mx-4 mb-2" />
    <router-link
      :to="{ name: RouteName.UserStatistics }"
      class="flex items-center gap-4"
    >
      <StatisticsDetailsIcon class="w-7 h-7" />
      <p class="text-base" :style="{ color: 'rgba(0, 167, 237, 1)' }">
        {{ ru.dailyProgressWidget.more }}
      </p>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UIRingProgress from '@/shared/ui/UIRingProgress/UIRingProgress.vue'
import StatChip from '@/shared/ui/StatChip.vue'
import type { DailyStatsResponse } from '@/entities/meal/types'
import UISkeleton from '@/shared/ui/UISkeleton/UISkeleton.vue'
import { ru } from '@/shared/lib/i18n/ru'
import StatisticsDetailsIcon from '@/shared/assets/icons/statistics-details-icon.svg'
import { RouteName } from '@/shared/lib/router'

type Props = {
  stats: DailyStatsResponse | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  stats: null,
})

const safeStats = computed(() => props.stats ?? null)

const percent = computed(() => {
  const stats = safeStats.value

  if (!stats || !stats.goal.kcal) {
    return 0
  }

  const ratio = (stats.reached.kcal / stats.goal.kcal) * 100

  if (!Number.isFinite(ratio)) {
    return 0
  }

  return Math.max(0, Math.round(ratio))
})

// ? `${safeStats.value.reached.kcal}/${safeStats.value.goal.kcal} kcal`

const formatted = computed(() => ({
  protein: `${(safeStats.value?.reached.protein ?? 0).toFixed(1)}`,
  fat: `${(safeStats.value?.reached.fat ?? 0).toFixed(1)}`,
  carbs: `${(safeStats.value?.reached.carb ?? 0).toFixed(1)}`,
}))
</script>
