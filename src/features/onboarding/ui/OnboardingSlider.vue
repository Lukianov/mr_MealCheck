<template>
  <component :is="currentSlide"/>
</template>

<script setup lang="ts">
import WelcomeSlide from "@/features/onboarding/ui/slides/WelcomeSlide.vue";
import GoalSlide from "@/features/onboarding/ui/slides/GoalSlide.vue";
import WeightSlide from "@/features/onboarding/ui/slides/WeightSlide.vue";
import HeightSlide from "@/features/onboarding/ui/slides/HeightSlide.vue";
import FinishSlide from "@/features/onboarding/ui/slides/FinishSlide.vue";
import GenderSlide from "@/features/onboarding/ui/slides/GenderSlide.vue";

import {computed} from "vue";

interface Props {
  currentSlideIndex: number;
}

const SLIDES_MAP = {
  0: WelcomeSlide,
  1: GoalSlide,
  2: GenderSlide,
  3: WeightSlide,
  4: HeightSlide,
  5: FinishSlide
}

const props = defineProps<Props>()

const currentSlide = computed(() => SLIDES_MAP[props.currentSlideIndex])
</script>

<style scoped>

</style>
