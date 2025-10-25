<template>
  <component :is="currentSlide"/>
</template>

<script setup lang="ts">
import FirstSlide from "@/features/onboarding/ui/slides/FirstSlide.vue";
import SecondSlide from "@/features/onboarding/ui/slides/SecondSlide.vue";
import ThridSlide from "@/features/onboarding/ui/slides/ThridSlide.vue";
import ForthSlide from "@/features/onboarding/ui/slides/ForthSlide.vue";

import {computed} from "vue";

interface Props {
  currentSlideIndex: number;
}

const SLIDES_MAP = {
  0: FirstSlide,
  1: SecondSlide,
  2: ThridSlide,
  3: ForthSlide,
}

const props = defineProps<Props>()

const currentSlide = computed(() => SLIDES_MAP[props.currentSlideIndex])
</script>

<style scoped>

</style>
