<template>
  <div class="flex rounded-2xl bg-[#121212] border border-zinc-800 p-1 ">
    <button
      v-for="opt in options"
      :key="opt.value"
      :class="[
        'px-4 py-1.5 rounded-xl text-sm transition-all grow-1',
        modelValue === opt.value
          ? 'bg-[#1d1d1d] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
          : 'text-zinc-400 hover:text-zinc-200',
      ]"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { TabValue } from '@/shared/types/stats'

defineProps<{
  options: { label: string; value: TabValue }[]
  modelValue: TabValue
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: TabValue): void }>()
</script>
