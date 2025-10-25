<template>
  <div class="flex flex-col items-center justify-between w-full">
    <OnboardingSlider :current-slide-index="currentSlideIndex"
    />
    <UIButton class="w-full"
              @click="goToNextSlide"
    >
      next
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import {UIButton} from "@/shared/ui/UIButton";
import OnboardingSlider from "@/features/onboarding/ui/OnboardingSlider.vue";
import {useOnboarding} from "@/features/onboarding/model/useOnboardingPage";

const { currentSlideIndex, goToNextSlide } = useOnboarding()
</script>

<style scoped>

</style>
