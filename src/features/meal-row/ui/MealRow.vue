<template>
  <component
    :is="currentComponent"
    :to="{ name: RouteName.MealDetails }"
    :class="{ 'cursor-not-allowed': props.status === 'pending' }"
  >
    <div
      class="flex px-4 pt-3 items-center gap-4"
      :style="{ 'background-color': 'rgba(29, 29, 29, 1)' }"
    >
      <img
        class="rounded w-10 h-10 shrink-0"
        :src="props.image"
        :alt="props.image"
      />
      <div class="flex items-center justify-between grow gap-2 min-w-0">
        <div class="flex-1 min-w-0 basis-0">
          <p class="mb-0.5 font-semibold text-white text-lg truncate">
            {{ props.title }}
          </p>
          <p class="truncate" :style="{ color: 'rgba(162, 172, 176, 1)' }">
            {{ props.description }}
          </p>
        </div>
        <div class="shrink-0">
          <div
            v-if="props.status === 'pending'"
            class="text-center py-0.5 px-2 rounded uppercase shrink-0"
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
import { ru } from '@/shared/lib/i18n/en'
import { RouteName } from '@/shared/lib/router'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  image: string
  title: string
  description: string
  status: string
  hasBorder: boolean
}

const props = defineProps<Props>()

const currentComponent = computed(() =>
  props.status === 'pending' ? 'div' : RouterLink,
)
</script>

<style scoped></style>
