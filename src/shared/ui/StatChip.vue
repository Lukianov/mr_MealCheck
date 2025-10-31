<template>
  <div
    class="px-3 py-2 rounded-xl border border-zinc-800 min-w-[78px] text-center"
    :style="{ background: 'rgb(29, 29, 29)' }"
  >
    <div class="text-[10px] uppercase tracking-wider text-zinc-400">
      {{ props.label }}
    </div>
    <UISkeleton
      v-if="props.isLoading"
      class="h-5 w-9 flex justify-self-center"
    />
    <div v-else class="text-white font-semibold text-sm">
      {{ props.value }}{{ props.postfix }}
    </div>
  </div>
</template>

<script setup lang="ts">
import UISkeleton from '@/shared/ui/UISkeleton/UISkeleton.vue'

const props = defineProps<{
  label: string
  value: string | number
  postfix: string
  isLoading?: boolean
}>()
</script>
