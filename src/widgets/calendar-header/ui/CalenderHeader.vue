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
      <p><span>Meal</span>check</p>
    </div>
    <DatePickerButton v-model="selectedDate" locale="ru-RU" :firstDay="1" />
  </div>
</template>

<script setup lang="ts">
import { DatePickerButton } from '@/features/date-filter'
import { ref } from 'vue'

const selectedDate = ref<Date | null>(new Date())
</script>
