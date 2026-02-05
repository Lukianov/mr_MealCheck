<template>
  <div class="-mx-3 mt-10">
    <div
      class="rounded-[40px] overflow-hidden aspect-2/1 mb-13 max-w-[510px]"
    >
      <img
        class="w-full h-full object-cover"
        src="@/shared/assets/images/onboading/final-step-onboarding.gif"
        alt="onboarding-fourth-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-2xl leading-10">
        <span class="font-bold"> {{ ru.onboarding.finishSlide.title }} </span>
      </p>
      <p class="text-xl leading-6">
        {{ ru.onboarding.finishSlide.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ru } from '@/shared/lib/i18n/ru'
</script>
