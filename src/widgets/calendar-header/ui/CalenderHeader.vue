<template>
  <div
    class="flex items-center justify-between p-4"
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
