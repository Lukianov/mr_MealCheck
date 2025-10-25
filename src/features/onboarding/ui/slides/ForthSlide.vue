<script setup lang="ts">

import PersonalParamSelector from "@/features/onboarding/ui/components/PersonalParamSelector.vue";
</script>

<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img class="w-full h-full object-cover" src="@/shared/assets/images/onboading/onboarding-third-step.gif" alt="onboarding-third-step.gif">
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-4xl leading-10">
        <span class="font-bold">
         what is your height?
        </span>
      </p>
      <p class="text-xl leading-6">
        let's calculate the calorie norm
      </p>
    </div>

    <PersonalParamSelector />
  </div>
</template>

<style scoped>

</style>
