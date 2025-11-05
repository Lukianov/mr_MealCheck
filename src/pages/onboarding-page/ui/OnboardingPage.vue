<template>
  <div
    class="pt-2 px-5 flex flex-col items-center justify-between w-full min-h-[var(--twa-vh,100dvh)] pb-[calc(96px+env(safe-area-inset-bottom,0px))]"
  >
    <component :is="currentSlide"></component>
    <footer
      class="fixed left-0 right-0 bottom-0 z-20 px-5 pb-[calc(12px+env(safe-area-inset-bottom,0px))] transform-gpu translate-y-[calc(-1*var(--kb,0px))]"
    >
      <UIButton
        class="max-w-[388px] w-full"
        @click="goToNextSlide"
        :is-disabled="isDisabled"
      >
        {{ ru.onboarding.buttonTitle }}
      </UIButton>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { UIButton } from '@/shared/ui/UIButton'
import { useOnboarding } from '@/features/onboarding/model/useOnboardingPage'
import { ru } from '@/shared/lib/i18n/ru'
import WelcomeSlide from '@/features/onboarding/ui/slides/WelcomeSlide.vue'
import GoalSlide from '@/features/onboarding/ui/slides/GoalSlide.vue'
import WeightSlide from '@/features/onboarding/ui/slides/WeightSlide.vue'
import HeightSlide from '@/features/onboarding/ui/slides/HeightSlide.vue'
import FinishSlide from '@/features/onboarding/ui/slides/FinishSlide.vue'
import GenderSlide from '@/features/onboarding/ui/slides/GenderSlide.vue'
import { computed } from 'vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { useKeyboardInset } from '@/shared/lib/composables/useKeyboardInset'
import { useTwaViewportVar } from '@/shared/lib/composables/useTwaViewportVar'

useKeyboardInset()

useTwaViewportVar()

const { currentSlideIndex, goToNextSlide } = useOnboarding()

const SLIDES_MAP = {
  0: WelcomeSlide,
  1: GoalSlide,
  2: GenderSlide,
  3: WeightSlide,
  4: HeightSlide,
  5: FinishSlide,
}

const { personalWeight, personalHeight } = useGoalSelection()

const currentSlide = computed(() => SLIDES_MAP[currentSlideIndex.value])

const isDisabled = computed(() => {
  if (currentSlide.value === WeightSlide && !personalWeight.value) {
    return true
  }

  return currentSlide.value === HeightSlide && !personalHeight.value
})
</script>
