<template>
  <div class="relative">
    <p class="translate-y-8 -rotate-20 font-bold text-white text-3xl">
      <span class="personal-param-selector_highlighted">tap</span> to change
    </p>
    <OnboardingArrow class="absolute w-[24px] h-[55px] -top-1/2 -right-3" />
  </div>
</template>

<script setup lang="ts">
import OnboardingArrow from '@/shared/assets/icons/onboarding-arrow-icon.svg'
</script>

<style scoped>
.personal-param-selector_highlighted {
  color: rgba(0, 167, 237, 1);
}
</style>
