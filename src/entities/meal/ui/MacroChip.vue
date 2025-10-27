<template>
  <StatChip :label="label.toUpperCase()" :value="value" postfix="" />
</template>
<script setup lang="ts">
import StatChip from '@/shared/ui/StatChip.vue'
defineProps<{ label: string; value: string | number }>()
</script>
