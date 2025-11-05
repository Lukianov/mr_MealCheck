<template>
  <div>
    <div class="pt-5 mb-6">
      <div class="mb-4">
        <UISkeleton class="mb-1 h-7 w-11"></UISkeleton>
        <UISkeleton class="mb-1 h-5 w-full"></UISkeleton>
      </div>
      <div class="mb-6 flex items-center justify-center gap-2">
        <StatChip label="KCAL" postfix="" value="0" is-loading />
        <StatChip label="Protein" postfix="g" value="0" is-loading />
        <StatChip label="Fat" postfix="g" value="0" is-loading />
        <StatChip label="Carbs" :value="0" postfix="g" is-loading />
      </div>
      <UISkeleton class="h-[292px] w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UISkeleton from '@/shared/ui/UISkeleton/UISkeleton.vue'
import StatChip from '@/shared/ui/StatChip.vue'
</script>
