<template>
  <div class="flex flex-col justify-between w-full items-center">
    <div class="rounded-full overflow-hidden w-[180px] h-[180px] mb-8">
      <img class="w-full h-full object-cover" src="@/shared/assets/images/onboading/onboarding-second-step.gif" alt="onboarding-second-step.gif">
    </div>
    <div class="mb-8 text-center">
      <p class="mb-3 text-4xl leading-10">
        <span class="font-bold">
          what is your goal?
        </span>
      </p>
      <p class="text-xl leading-6">
        approach this responsibly
      </p>
    </div>
    <div class="w-full space-y-3">
      <GoalOptionRow
        v-for="goal in goalOptions"
        :key="goal.id"
        :option="goal"
        :is-selected="selectedGoal === goal.id"
        @select="selectGoal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GoalOptionRow from "@/features/onboarding/ui/components/GoalOptionRow.vue";
import {useGoalSelection} from "@/features/onboarding/model/useGoalSelection";

const {goalOptions, selectGoal, selectedGoal} = useGoalSelection();
</script>

<style scoped>

</style>
