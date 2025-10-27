<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-cover"
        src="@/shared/assets/images/onboading/onboarding-third-step.gif"
        alt="onboarding-third-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-3xl font-bold text-white">
        <span class="font-bold"> what is your gender? </span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        let's calculate the calorie norm
      </p>
    </div>
    <div class="w-full rounded-2xl overflow-hidden">
      <GenderOptionRow
        v-for="goal in genderOptions"
        class="gender-option-row__border"
        :key="goal.id"
        :option="goal"
        :is-selected="selectedGender === goal.id"
        @select="selectGender"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GenderOptionRow from '@/features/onboarding/ui/components/GenderOptionRow.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'

const { genderOptions, selectedGender, selectGender } = useGoalSelection()
</script>

<style scoped>
.gender-option-row__border:not(:last-child) {
  border: 1px solid #1d1d1d;
}
</style>
