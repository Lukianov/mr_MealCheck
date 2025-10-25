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
      <p class="mb-3 text-4xl leading-10">
        <span class="font-bold"> what is your height? </span>
      </p>
      <p class="text-xl leading-6">let's calculate the calorie norm</p>
    </div>
    <UIPersonalInput
      class="mb-6"
      placeholder="170 cm"
      size="6"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="3"
    />
    <PersonalParamSelector />
  </div>
</template>

<script setup lang="ts">
import PersonalParamSelector from '@/features/onboarding/ui/components/PersonalParamSelector.vue'
import UIPersonalInput from '@/shared/ui/UIPersonalInput/UIPersonalInput.vue'
</script>

<style scoped></style>
