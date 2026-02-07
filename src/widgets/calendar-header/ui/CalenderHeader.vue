<template>
  <div
    class="flex items-center justify-between p-4"
  >
    <div class="flex items-center gap-1">
      <div @click="registerTap">
        <img
          class="w-7 h-7 rounded-full bg-white/5"
          :src="userPic"
          alt="user picture"
        />
      </div>
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
import { useApiClient } from '@/shared/api'
import { useShowOnboarding } from '@/features/onboarding/model/useShowOnboarding'

const { userData } = useApiClient()

const props = withDefaults(
  defineProps<{
    selectedDate?: Date | null
  }>(),
  {
    selectedDate: null,
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
