<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-cover"
        src="@/shared/assets/images/onboading/onboarding-third-step.gif"
        alt="onboarding-third-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-3xl font-bold text-white">
        <span class="font-bold"> what is your weight? </span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        let's calculate the calorie norm
      </p>
    </div>
    <UIPersonalInput
      v-model="personalWeight"
      size="6"
      placeholder="75 kg"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="3"
      class="mb-6"
      @on-focus="emit('on-focus')"
    />
    <PersonalParamSelector />
  </div>
</template>

<script setup lang="ts">
import PersonalParamSelector from '@/features/onboarding/ui/components/PersonalParamSelector.vue'
import UIPersonalInput from '@/shared/ui/UIPersonalInput/UIPersonalInput.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'

const { personalWeight } = useGoalSelection()

const emit = defineEmits<{
  (e: 'on-focus'): void
}>()
</script>

<style scoped></style>
