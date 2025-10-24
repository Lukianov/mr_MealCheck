<template>
  <div class="flex flex-col justify-between w-full">
    <ForthSlide />
    <UIButton class="w-full">
      next
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import {UIButton} from "@/shared/ui/UIButton";
import FirstSlide from "@/features/onboarding/ui/slides/FirstSlide.vue";
import SecondSlide from "@/features/onboarding/ui/slides/SecondSlide.vue";
import ForthSlide from "@/features/onboarding/ui/slides/ForthSlide.vue";
</script>

<style scoped>

</style>
