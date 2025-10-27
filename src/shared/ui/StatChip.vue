<template>
  <div
    class="px-3 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800 min-w-[78px] text-center"
  >
    <div class="text-[10px] uppercase tracking-wider text-zinc-400">
      {{ props.label }}
    </div>
    <div class="text-white font-semibold text-sm">
      {{ props.value }}{{ props.postfix }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: string | number
  postfix: string
}>()
</script>
