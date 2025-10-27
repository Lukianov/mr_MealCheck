<template>
  <div class="relative w-full">
    <!-- Image block with parallax -->
    <div class="relative h-[292px] overflow-hidden">
      <img
        :src="props.image"
        alt="meal"
        class="absolute inset-0 w-full h-[280px] object-cover will-change-transform"
        :style="{ transform: `translateY(${offset}px)` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParallax } from '@/widgets/meal-hero/model/useParallax'

const props = defineProps<{
  image: string
}>()

const { offset } = useParallax(0.35, 140)
</script>
