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
        <span class="font-bold">
          {{ ru.onboarding.genderSlide.title }}
        </span>
      </p>
      <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        {{ ru.onboarding.genderSlide.description }}
      </p>
    </div>
    <div class="w-full rounded-2xl overflow-hidden">
      <GenderOptionRow
        v-for="gender in GENDER_OPTIONS"
        class="gender-option-row__border"
        :key="gender.id"
        :option="gender"
        :is-selected="selectedGender === gender.id"
        @select="selectGender"
      >
        <img
          class="w-7 h-7"
          :src="ICON_COMPONENTS_MAP[gender.id]"
          :alt="gender.title"
        />
      </GenderOptionRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenderOptionRow from '@/features/onboarding/ui/components/GenderOptionRow.vue'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import { GENDER_OPTIONS, GenderTypes } from '@/features/onboarding/const'
import genderManIcon from '@/shared/assets/images/onboading/gender-slide-man.png'
import genderWomanIcon from '@/shared/assets/images/onboading/gender-slide-woman.png'
import genderUnknowIcon from '@/shared/assets/images/onboading/gender-slide-other.png'
import { ru } from '@/shared/lib/i18n/ru'

const { selectedGender, selectGender } = useGoalSelection()

const ICON_COMPONENTS_MAP: Record<GenderTypes, string> = {
  [GenderTypes.Man]: genderManIcon,
  [GenderTypes.Woman]: genderWomanIcon,
  [GenderTypes.Unknown]: genderUnknowIcon,
}
</script>

<style scoped>
.gender-option-row__border:not(:last-child) {
  border: 1px solid #1d1d1d;
}
</style>
