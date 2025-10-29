<template>
  <section
    class="rounded-3xl text-zinc-50 shadow-xl ring-1 ring-white/5"
    :style="{ background: 'rgb(29, 29, 29)' }"
  >
    <div class="flex items-start gap-4 p-6">
      <div class="flex-1">
        <h3 class="text-base font-semibold">Daily calories</h3>
        <p class="mt-5 text-xs uppercase tracking-widest text-zinc-400">
          Reached
        </p>

        <div class="mt-1 text-2xl font-semibold tabular-nums">
          <span v-if="!loading">{{ formatted.kcal }}</span>
          <span
            v-else
            class="inline-block h-8 w-56 animate-pulse rounded bg-white/10"
          ></span>
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
          <div class="text-center">
            <div class="text-base text-[18px] font-semibold tabular-nums">
              {{ percent }}%
            </div>
          </div>
        </UIRingProgress>
      </div>
    </div>

    <div class="h-px w-full bg-white/5" />

    <!-- нижняя часть -->
    <div class="p-6">
      <h4 class="text-xl font-semibold">Macronutrients for today</h4>

      <div class="mt-4 grid gap-3 grid-cols-3">
        <StatChip label="Protein" :value="formatted.protein" postfix="g" />
        <StatChip label="Fat" :value="formatted.fat" postfix="g" />
        <StatChip label="Carbs" :value="formatted.carbs" postfix="g" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UIRingProgress from '@/shared/ui/UIRingProgress/UIRingProgress.vue'
import StatChip from '@/shared/ui/StatChip.vue'
import type { DailyStatsResponse } from '@/entities/meal/types'

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

const formatted = computed(() => ({
  kcal: safeStats.value
    ? `${safeStats.value.reached.kcal}/${safeStats.value.goal.kcal} kcal`
    : '0/0 kcal',
  protein: `${safeStats.value?.reached.protein ?? 0}`,
  fat: `${safeStats.value?.reached.fat ?? 0}`,
  carbs: `${safeStats.value?.reached.carbs ?? 0}`,
}))
</script>
