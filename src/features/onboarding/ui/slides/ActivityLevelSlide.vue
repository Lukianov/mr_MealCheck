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
        <span class="font-bold"> {{ ru.onboarding.activityLevel.title }}</span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.activityLevel.description }}
      </p>
    </div>
    <div class="w-full rounded-2xl overflow-hidden">
      <GoalOptionRow
        v-for="activityLevel in ACTIVITY_LEVEL_OPTIONS"
        class="goal-option-row__border"
        :key="activityLevel.id"
        :option="activityLevel"
        :is-selected="selectedActivityLevel === activityLevel.id"
        @select="selectActivityLevel"
      >
        <img
          :src="ICON_COMPONENTS_MAP[activityLevel.id]"
          :alt="activityLevel.title"
          class="w-7 h-7"
        />
      </GoalOptionRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoalOptionRow from '@/features/onboarding/ui/components/GoalOptionRow.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'

import {
  ACTIVITY_LEVEL_OPTIONS,
  ActivityLevel,
} from '@/features/onboarding/const'

import { ru } from '@/shared/lib/i18n/ru'

import goalMaintainIcon from '@/shared/assets/images/onboading/onboarding-goal-maintain.png'
import goalGainIcon from '@/shared/assets/images/onboading/onboarding-goal-gain.png'
import activityLowIcon from '@/shared/assets/images/onboading/onboarding-armchair-image.png'
import activityHighIcon from '@/shared/assets/images/onboading/onboarding-fire-image.png'

const ICON_COMPONENTS_MAP: Record<ActivityLevel, string> = {
  [ActivityLevel.Low]: activityLowIcon,
  [ActivityLevel.Light]: goalMaintainIcon,
  [ActivityLevel.Moderate]: goalGainIcon,
  [ActivityLevel.High]: activityHighIcon,
}

const { selectActivityLevel, selectedActivityLevel } = useGoalSelection()
</script>

<style scoped>
.goal-option-row__border:not(:last-child) {
  border: 1px solid #1d1d1d;
}
</style>
