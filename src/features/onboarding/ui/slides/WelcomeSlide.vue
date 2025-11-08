<script setup lang="ts">
import { ru } from '@/shared/lib/i18n/ru'
</script>

<template>
  <div class="-mx-3">
    <div class="rounded-[40px] overflow-hidden aspect-[0.8] mb-8 max-w-[510px]">
      <img
        class="w-full h-full object-contain"
        src="@/shared/assets/images/onboading/welcome-step-onboarding.png"
        alt="onboarding-first-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-2xl leading-10 font-bold text-white">
        {{ ru.onboarding.welcomeSlide.title }}
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.welcomeSlide.description }}
      </p>
    </div>
  </div>
</template>
