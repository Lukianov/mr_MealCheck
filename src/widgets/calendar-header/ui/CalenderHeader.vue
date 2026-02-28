<template>
  <div
    class="calendar-header flex items-center justify-between p-4"
    :class="{ 'calendar-header--glass': props.isGlass }"
  >
    <div class="flex items-center gap-1">
      <div @click="registerTap">
        <img
          class="w-10 h-10 rounded-full bg-white/5 border border-solid border-[rgba(255,255,255,0.08)] box-content"
          :style="{}"
          :src="userPic"
          alt="user picture"
        />
      </div>
    </div>
    <DatePickerButton
      v-model="selectedDateProxy"
      locale="ru-RU"
      :firstDay="1"
    />
  </div>
</template>

<script setup lang="ts">
import { DatePickerButton } from '@/features/date-filter'
import { computed } from 'vue'
import { useApiClient } from '@/shared/api'
import { useShowOnboarding } from '@/features/onboarding/model/useShowOnboarding'

const { userData } = useApiClient()

const props = withDefaults(
  defineProps<{
    selectedDate?: Date | null
    isGlass?: boolean
  }>(),
  {
    selectedDate: null,
    isGlass: false,
  },
)

const { registerTap } = useShowOnboarding()

const emit = defineEmits<{
  (e: 'update:selectedDate', value: Date | null): void
}>()

const selectedDateProxy = computed({
  get: () => props.selectedDate ?? null,
  set: (value: Date | null) => {
    emit('update:selectedDate', value)
  },
})

const userPic = userData.value?.photo_url ?? ''
</script>

<style scoped>
.calendar-header {
  border: 1px solid transparent;
  border-top: none;
  border-radius: 0 0 16px 16px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    backdrop-filter 0.2s ease;
}

.calendar-header--glass {
  background: rgba(24, 24, 24, 0.55);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
}
</style>
