<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-contain"
        src="@/shared/assets/images/onboading/param-step-onboarding.png"
        alt="param-step-onboarding.png"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-2xl font-bold text-white">
        <span class="font-bold"> {{ ru.onboarding.heightSlide.title }}</span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.heightSlide.description }}
      </p>
    </div>
    <UIPersonalInput
      v-model="personalHeight"
      ref="personalHeightInput"
      class="mb-6"
      placeholder="170 cm"
      size="6"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="3"
    />
  </div>
</template>

<script setup lang="ts">
import UIPersonalInput from '@/shared/ui/UIPersonalInput/UIPersonalInput.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { ru } from '@/shared/lib/i18n/ru'
import { onMounted, ref } from 'vue'

const { personalHeight } = useGoalSelection()

const personalHeightInput = ref()

onMounted(() => {
  personalHeightInput.value?.inputEl?.focus()
})
</script>

<style scoped></style>
