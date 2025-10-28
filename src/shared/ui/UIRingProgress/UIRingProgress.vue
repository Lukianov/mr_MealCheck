<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  /** 0..100 */
  value: number
  size?: number
  stroke?: number
  trackClass?: string
  progressClass?: string
  rounded?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 112,
  stroke: 10,
  trackClass: 'stroke-zinc-700/60',
  progressClass: 'stroke-sky-500',
  rounded: true,
  ariaLabel: 'progress ring',
})

const radius = computed(() => 50 - props.stroke / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dash = computed(() => {
  const v = Math.min(100, Math.max(0, props.value))
  return (v / 100) * circumference.value
})
</script>

<template>
  <div
    class="relative inline-flex"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="img"
    :aria-label="ariaLabel"
  >
    <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
      <!-- track -->
      <circle
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="stroke"
        :class="trackClass"
        fill="transparent"
      />
      <!-- progress -->
      <circle
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="stroke"
        :class="progressClass"
        stroke-linecap="round"
        :style="{
          strokeDasharray: `${dash} ${circumference - dash}`,
          strokeLinecap: rounded ? 'round' : 'butt',
          transition: 'stroke-dasharray .6s ease',
        }"
        fill="transparent"
      />
    </svg>

    <!-- центр (слот для текста) -->
    <div class="absolute inset-0 grid place-items-center select-none">
      <slot />
    </div>
  </div>
</template>
