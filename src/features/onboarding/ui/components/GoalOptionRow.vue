<script setup lang="ts">
import type {GoalOption} from "@/features/onboarding/model/useGoalSelection";

interface Props {
  option: GoalOption;
  isSelected: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "select", id: string): void;
}>();

const handleSelect = () => {
  emit("select", props.option.id);
};
</script>

<template>
  <label
    class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 cursor-pointer"
    :class="isSelected ? 'border-emerald-400/70 bg-emerald-500/5 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]' : ''"
  >
    <input
      type="radio"
      name="goal"
      class="sr-only"
      :checked="isSelected"
      :value="option.id"
      @change="handleSelect"
    >
    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold tracking-wide text-white shadow-lg shadow-black/20">
      {{ option.iconLabel }}
    </div>
    <div class="flex flex-1 flex-col text-left">
      <span class="text-base font-semibold text-white">
        {{ option.title }}
      </span>
      <span class="text-sm text-white/70">
        {{ option.description }}
      </span>
    </div>
    <div class="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/30 transition" :class="isSelected ? 'border-emerald-400' : ''">
      <span
        class="h-3 w-3 rounded-full bg-emerald-400 transition"
        :class="isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
      />
    </div>
  </label>
</template>
