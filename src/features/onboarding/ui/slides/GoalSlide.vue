<template>
  <div class="pt-5 flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img
        class="w-full h-full object-cover"
        src="@/shared/assets/images/onboading/onboarding-second-step.gif"
        alt="onboarding-second-step.gif"
      />
    </div>
    <div class="mb-8 text-center">
      <p class="mb-2 text-3xl font-bold text-white">
        <span class="font-bold"> what is your goal? </span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        approach this responsibly
      </p>
    </div>
    <div class="w-full rounded-2xl overflow-hidden">
      <GoalOptionRow
        v-for="goal in goalOptions"
        class="goal-option-row__border"
        :key="goal.id"
        :option="goal"
        :is-selected="selectedGoal === goal.id"
        @select="selectGoal"
      >
        <component class="w-7 h-7" :is="ICON_COMPONENTS_MAP[goal.id]" />
      </GoalOptionRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoalOptionRow from '@/features/onboarding/ui/components/GoalOptionRow.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import LoseWeight from '@/shared/assets/icons/onboarding/lose-weight-icon.svg'
import KeepWeight from '@/shared/assets/icons/onboarding/keep-weight-icon.svg'
import GainWeight from '@/shared/assets/icons/onboarding/gain-weight-icon.svg'

const ICON_COMPONENTS_MAP = {
  'lose-weight': LoseWeight,
  'stay-balanced': KeepWeight,
  'gain-muscle': GainWeight,
}

const { goalOptions, selectGoal, selectedGoal } = useGoalSelection()
</script>

<style scoped>
.goal-option-row__border:not(:last-child) {
  border: 1px solid #1d1d1d;
}
</style>
