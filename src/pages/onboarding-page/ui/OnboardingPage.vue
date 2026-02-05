<template>
  <div
    class="pb-11 pt-2 px-5 flex flex-col items-center justify-between w-full"
  >
    <component :is="currentSlide" />
  </div>
</template>

<script setup lang="ts">
import { useOnboarding } from '@/features/onboarding/model/useOnboardingPage'
import WelcomeSlide from '@/features/onboarding/ui/slides/WelcomeSlide.vue'
import GoalSlide from '@/features/onboarding/ui/slides/GoalSlide.vue'
import WeightSlide from '@/features/onboarding/ui/slides/WeightSlide.vue'
import HeightSlide from '@/features/onboarding/ui/slides/HeightSlide.vue'
import FinishSlide from '@/features/onboarding/ui/slides/FinishSlide.vue'
import GenderSlide from '@/features/onboarding/ui/slides/GenderSlide.vue'
import { computed } from 'vue'
import AgeSlide from '@/features/onboarding/ui/slides/AgeSlide.vue'
import ActivityLevelSlide from '@/features/onboarding/ui/slides/ActivityLevelSlide.vue'

const { currentSlideIndex } = useOnboarding()

const SLIDES_MAP = {
  0: WelcomeSlide,
  1: GoalSlide,
  2: GenderSlide,
  3: WeightSlide,
  4: HeightSlide,
  5: AgeSlide,
  6: ActivityLevelSlide,
  7: FinishSlide,
}

const currentSlide = computed(() => SLIDES_MAP[5])
</script>
