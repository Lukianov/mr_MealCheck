<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-contain"
        src="@/shared/assets/images/onboading/param-step-onboarding.png"
        alt="onboarding-third-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-2xl font-bold text-white">
        <span class="font-bold">{{ ru.onboarding.birthDate.title }}</span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.birthDate.description }}
      </p>
    </div>
    <div class="relative">
      <div
        class="absolute -top-6 left-0 w-full text-center whitespace-nowrap"
        :style="{ color: 'rgba(255, 37, 80, 1)' }"
      >
        {{ personalAgeError }}
      </div>
      <UIPersonalInput
        v-model="personalAge"
        class="mb-6"
        placeholder="**.**.****"
        mask="##.##.####"
        size="10"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="10"
        @blur="validatePersonalAge"
      />
    </div>
    <PersonalParamSelector />
  </div>
</template>

<script setup lang="ts">
import PersonalParamSelector from '@/features/onboarding/ui/components/PersonalParamSelector.vue'
import UIPersonalInput from '@/shared/ui/UIPersonalInput/UIPersonalInput.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { ru } from '@/shared/lib/i18n/ru'

const { personalAge, personalAgeError, validatePersonalAge } =
  useGoalSelection()
</script>

<style scoped></style>
