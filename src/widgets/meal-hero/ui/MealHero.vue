<template>
  <div class="relative w-full">
    <div class="relative h-[292px] overflow-hidden">
      <UISkeleton
        v-if="isLoading"
        class="absolute max-w-full w-full h-[280px] will-change-transform"
      />
      <img
        v-else-if="props.image"
        :src="props.image"
        alt="meal"
        class="absolute inset-0 w-full h-[280px] object-cover will-change-transform"
        :style="{ transform: `translateY(${offset}px)` }"
      />
      <div
        class="absolute max-w-full w-full h-[280px] will-change-transform flex items-center justify-center"
        :style="{
          background: 'rgba(29, 29, 29, 1)',
          transform: `translateY(${offset}px)`,
        }"
        v-else
      >
        <TextMealIcon class="w-32 h-32" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParallax } from '@/widgets/meal-hero/model/useParallax'
import UISkeleton from '@/shared/ui/UISkeleton/UISkeleton.vue'
import TextMealIcon from '@/shared/assets/icons/text-meal-icon.svg'

const props = defineProps<{
  image: string
  isLoading: boolean
}>()

const { offset } = useParallax(0.35, 140)
</script>
