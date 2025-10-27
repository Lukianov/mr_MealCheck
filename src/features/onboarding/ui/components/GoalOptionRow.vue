<template>
  <label
    class="flex px-4 py-3 items-center gap-4 cursor-pointer goal-option-row"
  >
    <input
      type="radio"
      name="goal"
      class="sr-only"
      :checked="isSelected"
      :value="option.id"
      @change="handleSelect"
    />
    <slot></slot>
    <div class="flex flex-1 flex-col text-left">
      <span class="text-base font-semibold text-white">
        {{ option.title }}
      </span>
      <span class="text-sm text-white/70">
        {{ option.description }}
      </span>
    </div>
    <div
      class="goal-option-checkbox ml-auto flex h-6 w-6 items-center justify-center rounded-full border-1 transition"
      :class="{ 'goal-option-checkbox_selectedBorder': isSelected }"
    >
      <span
        class="bg-white h-4 w-4 rounded-full transition"
        :class="isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
import type { GoalOption } from '@/features/onboarding/model/useGoalSelection'

interface Props {
  option: GoalOption
  isSelected: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const handleSelect = () => {
  emit('select', props.option.id)
}
</script>

<style scoped>
.goal-option-row {
  background-color: rgba(26, 26, 26, 1);
}

.goal-option-checkbox {
  border-color: rgba(235, 235, 235, 0.16);
}

.goal-option-checkbox_selectedBorder {
  border-color: rgba(37, 108, 138, 1);
  border-width: 4px;
}
</style>
