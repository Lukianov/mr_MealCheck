<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-contain"
        src="@/shared/assets/images/onboading/param-step-onboarding.png"
        alt="onboarding-third-step.gif"
      />
    </div>
    <div class="mb-8 text-center relative">
      <p class="mb-3 text-2xl font-bold text-white">
        <span class="font-bold">{{ ru.onboarding.birthDate.title }}</span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.birthDate.description }}
      </p>
    </div>
    <div class="w-full flex items-center justify-between">
      <p class="basis-1/3 text-center">{{ ru.onboarding.birthDate.day }}</p>
      <p class="basis-1/3 text-center">{{ ru.onboarding.birthDate.month }}</p>
      <p class="basis-1/3 text-center">{{ ru.onboarding.birthDate.year }}</p>
    </div>
    <div class="w-full flex items-center justify-center">
      <VueScrollPicker
        class="scroll-picker"
        :options="DAY_FORMS"
        v-model="personDayBirth"
      />
      <VueScrollPicker
        class="scroll-picker"
        :options="MONTH_FORMS"
        v-model="personMonthBirth"
      />
      <VueScrollPicker
        class="scroll-picker"
        :options="YEAR_FORMS"
        v-model="personYearBirth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueScrollPicker } from 'vue-scroll-picker'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { ru } from '@/shared/lib/i18n/ru'
import 'vue-scroll-picker/style.css'
import { YEAR_FORMS, MONTH_FORMS, DAY_FORMS } from '@/shared/const'

const { personDayBirth, personMonthBirth, personYearBirth } = useGoalSelection()
</script>

<style>
.scroll-picker .vue-scroll-picker-layer-top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    360deg,
    rgba(26, 26, 26, 0.7) 10%,
    rgba(18, 18, 18, 0.7)
  );
}

.scroll-picker .vue-scroll-picker-layer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0.7) 10%,
    rgba(18, 18, 18, 0.7)
  );
}

.scroll-picker.vue-scroll-picker {
  height: 5em;
}

.scroll-picker .vue-scroll-picker-item[aria-selected='true'] {
  color: rgba(0, 167, 237, 1);
}
</style>
