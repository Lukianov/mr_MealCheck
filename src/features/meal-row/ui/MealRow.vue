<template>
  <RouterLink :to="{ name: RouteName.MealDetails }">
    <div
      class="flex p-4 justify-between items-center"
      :style="{ 'background-color': 'rgba(29, 29, 29, 1)' }"
    >
      <div class="flex gap-4 items-center">
        <img class="rounded w-10 h-10" :src="props.image" :alt="props.image" />
        <div>
          <p class="mb-0.5 font-semibold text-white text-lg">
            {{ props.title }}
          </p>
          <p class="" :style="{ color: 'rgba(162, 172, 176, 1)' }">
            {{ props.description }}
          </p>
        </div>
      </div>
      <div
        v-if="props.status === 'pending'"
        class="text-center py-0.5 px-2 rounded uppercase"
        :style="{
          'background-color': 'rgba(255, 255, 255, 0.08)',
          color: 'rgba(0, 167, 237, 1)',
        }"
      >
        {{ ru.todayMealBlock.mealRow.status.pending }}
      </div>
      <RightArrowIcon v-else class="w-4 h-4" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import RightArrowIcon from '@/shared/assets/icons/right-arrow-icon.svg'
import { ru } from '@/shared/lib/i18n/en'
import { RouteName } from '@/shared/lib/router'

interface Props {
  image: string
  title: string
  description: string
  status: string
}

const props = defineProps<Props>()
</script>

<style scoped></style>
