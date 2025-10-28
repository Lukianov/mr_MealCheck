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
import type { Macros } from '../model/types'
import { computed } from 'vue'
import UIRingProgress from '@/shared/ui/UIRingProgress/UIRingProgress.vue'
import StatChip from '@/shared/ui/StatChip.vue'

type Props = {
  reachedKcal: number
  goalKcal: number
  macros: Macros
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), { loading: false })

const percent = computed(() => {
  if (!props.goalKcal) {
    return 0
  }

  return Math.round((props.reachedKcal / props.goalKcal) * 100)
})

const formatted = computed(() => ({
  kcal: `${props.reachedKcal}/${props.goalKcal} kcal`,
  protein: `${props.macros.protein}`,
  fat: `${props.macros.fat}`,
  carbs: `${props.macros.carbs}`,
}))
</script>
