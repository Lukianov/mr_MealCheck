<template>
  <div
    class="pb-3 border-b"
    :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
  >
    <div class="text-zinc-400 text-sm">{{ label }}</div>
    <div class="flex items-center justify-between gap-3">
      <div class="text-white text-sm font-medium">{{ value }}</div>
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value?: string | number }>()
</script>
