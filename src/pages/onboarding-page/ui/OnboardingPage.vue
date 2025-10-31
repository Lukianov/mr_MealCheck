<template>
  <div
    class="pb-11 pt-2 px-5 flex flex-col items-center justify-between w-full"
  >
    <OnboardingSlider :current-slide-index="currentSlideIndex" />
    <UIButton class="max-w-[388px] w-full" @click="goToNextSlide">
      {{ ru.onboarding.buttonTitle }}
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import { UIButton } from '@/shared/ui/UIButton'
import OnboardingSlider from '@/features/onboarding/ui/OnboardingSlider.vue'
import { useOnboarding } from '@/features/onboarding/model/useOnboardingPage'
import { ru } from '@/shared/lib/i18n/ru'

const { currentSlideIndex, goToNextSlide } = useOnboarding()
</script>

<style scoped></style>
