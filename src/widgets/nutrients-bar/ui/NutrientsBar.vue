<template>
  <div class="mt-4 mb-3 px-1">
    <div class="flex items-center gap-2">
      <MacroChip label="kcal" :value="display('kcal')" />
      <MacroChip label="protein" :value="display('protein')" />
      <MacroChip label="fat" :value="display('fat')" />
      <MacroChip label="carbs" :value="display('carbs')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MacroChip from '@/entities/meal/ui/MacroChip.vue'
import type { Macro } from '@/entities/meal/model/types'

const props = defineProps<{ items: Macro[] }>()

const display = (label: Macro['label']) => {
  const m = props.items.find(i => i.label === label)
  if (!m) return '-'
  return label === 'kcal' ? `${m.value}` : `${m.value}${m.unit ?? 'g'}`
}
</script>
