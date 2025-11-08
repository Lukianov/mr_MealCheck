<template>
  <div
    class="flex items-center justify-between p-4 border-y"
    :style="{
      background: 'rgba(29, 29, 29, 1)',
      'border-color': 'rgba(255, 255, 255, 0.05)',
    }"
  >
    <div class="flex items-center gap-1">
      <RouterLink :to="{ path: '/onboarding-page' }">
        <img
          class="w-7 h-7 rounded-lg"
          src="@/shared/assets/images/logo-mascot.png"
          alt="mealcheck logo"
        />
      </RouterLink>
      <p><span class="font-bold">Meal</span>check</p>
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

const props = withDefaults(
  defineProps<{
    selectedDate?: Date | null
  }>(),
  {
    selectedDate: null,
  },
)

const emit = defineEmits<{
  (e: 'update:selectedDate', value: Date | null): void
}>()

const selectedDateProxy = computed({
  get: () => props.selectedDate ?? null,
  set: (value: Date | null) => {
    emit('update:selectedDate', value)
  },
})
</script>
