<template>
  <component
    :is="currentComponent"
    :to="{ name: RouteName.MealDetails, params: { id: props.id } }"
    :class="{ 'cursor-not-allowed': props.status === 'pending' }"
  >
    <div
      class="flex px-4 pt-3 items-center gap-4"
      :style="{ 'background-color': 'rgba(29, 29, 29, 1)' }"
    >
      <img
        v-if="props.image"
        class="rounded-lg w-10 h-10 shrink-0"
        :src="props.image"
        :alt="props.image"
      />
      <div
        v-else
        :style="{ 'background-color': 'rgba(255, 255, 255, 0.08)' }"
        class="rounded-lg w-10 h-10 shrink-0 flex items-center justify-center"
      >
        <TextMealIcon class="w-6 h-6" />
      </div>
      <div class="flex items-center justify-between grow gap-2 min-w-0">
        <div class="flex-1 min-w-0 basis-0">
          <div v-if="props.title" class="mb-0.5 flex gap-1 items-center">
            <p class="font-semibold text-white text-lg truncate">
              {{ props.title }}
            </p>
            <template v-if="isShowStatusPoint">
              <div class="h-5 w-5 flex justify-center items-center">
                <span
                  class="rounded-full w-1.5 h-1.5"
                  :class="[
                    isUnrecognizedDishes ? 'bg-[#FF2550]' : 'bg-[#00A7ED]',
                  ]"
                ></span>
              </div>
            </template>
          </div>
          <UISkeleton v-else class="mb-0.5 w-1/2 h-7" />
          <p
            v-if="mealRowDescription"
            class="truncate"
            :class="[
              isUnrecognizedDishes ? 'text-[#FF2550]' : 'text-[#a2acb0]',
            ]"
          >
            {{ mealRowDescription }}
          </p>
          <UISkeleton v-else class="w-full h-6" />
        </div>
        <div class="shrink-0">
          <div
            v-if="props.status === 'pending'"
            class="text-xs leading-5 font-semibold text-center px-2 rounded-lg uppercase shrink-0"
            :style="{
              'background-color': 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(0, 167, 237, 1)',
            }"
          >
            {{ ru.todayMealBlock.mealRow.status.pending }}
          </div>
          <RightArrowIcon v-else class="w-4 h-4 shrink-0" />
        </div>
      </div>
    </div>
    <div
      class="flex px-4 gap-4"
      :style="{ 'background-color': 'rgba(29, 29, 29, 1)' }"
    >
      <div class="w-10"></div>
      <div
        class="pb-3 w-full"
        :class="{ 'border-b': props.hasBorder }"
        :style="{ 'border-color': 'rgba(255, 255, 255, 0.08)' }"
      ></div>
    </div>
  </component>
</template>

<script setup lang="ts">
import RightArrowIcon from '@/shared/assets/icons/right-arrow-icon.svg'
import { ru } from '@/shared/lib/i18n/ru'
import { RouteName } from '@/shared/lib/router'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import UISkeleton from '@/shared/ui/UISkeleton/UISkeleton.vue'
import TextMealIcon from '@/shared/assets/icons/text-meal-icon.svg'

interface Props {
  id: number
  image: string
  title: string
  description: string
  status: string
  hasBorder: boolean
  dishes?: string[]
  isViewed?: boolean
}

const props = defineProps<Props>()

const currentComponent = computed(() =>
  props.status === 'pending' ? 'div' : RouterLink,
)

const isShowStatusPoint = computed(
  () => typeof props?.isViewed !== 'undefined' && !props.isViewed,
)

const isUnrecognizedDishes = computed(
  () => props.dishes && !props.dishes.length,
)

const mealRowDescription = computed(() =>
  isUnrecognizedDishes.value ? ru.mealRow.unrecognizedDish : props.description,
)
</script>

<style scoped></style>
