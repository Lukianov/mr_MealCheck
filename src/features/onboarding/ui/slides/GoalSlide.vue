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
      <p class="mb-2 text-2xl font-bold text-white">
        <span class="font-bold"> {{ ru.onboarding.goalSlide.title }} </span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.goalSlide.description }}
      </p>
    </div>
    <div class="w-full rounded-2xl overflow-hidden">
      <GoalOptionRow
        v-for="goal in GOAL_OPTIONS"
        class="goal-option-row__border"
        :key="goal.id"
        :option="goal"
        :is-selected="selectedGoal === goal.id"
        @select="selectGoal"
      >
        <img
          :src="ICON_COMPONENTS_MAP[goal.id]"
          :alt="goal.title"
          class="w-7 h-7"
        />
      </GoalOptionRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoalOptionRow from '@/features/onboarding/ui/components/GoalOptionRow.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { GOAL_OPTIONS, GoalType } from '@/features/onboarding/const'
import goalGainIcon from '@/shared/assets/images/onboading/onboarding-goal-gain.png'
import goalLoseIcon from '@/shared/assets/images/onboading/onboarding-goal-lose.png'
import goalMaintainIcon from '@/shared/assets/images/onboading/onboarding-goal-maintain.png'
import { ru } from '@/shared/lib/i18n/ru'

const ICON_COMPONENTS_MAP: Record<GoalType, string> = {
  [GoalType.Lose]: goalLoseIcon,
  [GoalType.Maintain]: goalMaintainIcon,
  [GoalType.Gain]: goalGainIcon,
}

const { selectGoal, selectedGoal } = useGoalSelection()
</script>

<style scoped>
.goal-option-row__border:not(:last-child) {
  border: 1px solid #1d1d1d;
}
</style>
