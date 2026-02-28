<template>
  <UIBaseModal :dismissible="!isProcessing">
    <template #default>
      <div class="relative">
        <div
          v-if="isProcessing"
          class="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-[#121212]/75"
        >
          <UILoaderRays class="text-white" :size="28" :thickness="4" />
        </div>
        <div class="text-center mb-4">
          <p class="mb-2 font-bold text-2xl">
            {{ ru.editDishWeightModal.title(payload.dishName) }}
          </p>
          <p class="text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
            {{ ru.editDishWeightModal.description }}
          </p>
        </div>
        <div class="mb-7">
          <VueScrollPicker
            class="scroll-picker"
            :options="weightOptions"
            v-model="selectedWeight"
          />
        </div>
        <UIButton
          class="w-full"
          :is-disabled="isProcessing"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
          @click="handleEdit"
        >
          {{ ru.editDishWeightModal.save }}
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import UILoaderRays from '@/shared/ui/UILoaderRays/UILoaderRays.vue'
import { ru } from '@/shared/lib/i18n/ru'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { rangeOptions } from '@/shared/lib/helpers/rangeDate'
import { useUpdateDishWeight } from '@/entities/meal/api/useUpdateDishWeight'
import { useMealDetails } from '@/entities/meal/api/useMealDetails'
import type { Dish as MealDish } from '@/entities/meal/types'
import 'vue-scroll-picker/style.css'

interface EditDishWeightPayload {
  mealId: number
  dishId: number
  dishName: string
  currentWeight: number
}

const { modalPayload, setOpenedModal } = useOverlayManager()

const payload = ref(modalPayload.value as EditDishWeightPayload)

const { updateDishWeight, isLoading: isProcessing } = useUpdateDishWeight()

const { cacheMealDetails } = useMealDetails()

const initialWeight = sanitizeWeight(payload.value?.currentWeight)

const selectedWeight = ref(initialWeight)

const weightOptions = computed(() => rangeOptions(0, initialWeight + 1000))

const handleEdit = async () => {
  const mealId = Number(payload.value?.mealId)
  const dishId = Number(payload.value?.dishId)

  if (!Number.isFinite(mealId) || !Number.isFinite(dishId)) {
    return
  }

  try {
    const updatedDish = await updateDishWeight(
      mealId,
      dishId,
      sanitizeWeight(selectedWeight.value),
    )

    updateMealDetails(updatedDish)

    setOpenedModal(null)
  } catch (e) {
    console.error('Failed to update dish weight', e)
  }
}

const updateMealDetails = (updatedDish: MealDish) => {
  if (!cacheMealDetails.value) {
    return
  }

  const index = cacheMealDetails.value.dishes.findIndex(
    (dish) => dish.id === updatedDish.id,
  )

  if (index === -1) {
    return
  }

  cacheMealDetails.value.dishes[index] = {
    ...cacheMealDetails.value.dishes[index],
    ...updatedDish,
  }

  recalculateMealMetrics(cacheMealDetails.value.dishes)
}

const recalculateMealMetrics = (dishes: MealDish[]) => {
  if (!cacheMealDetails.value) {
    return
  }

  cacheMealDetails.value.kcal = sumByMetric(dishes, 'kcal')
  cacheMealDetails.value.protein = sumByMetric(dishes, 'protein')
  cacheMealDetails.value.fat = sumByMetric(dishes, 'fat')
  cacheMealDetails.value.carb = sumByMetric(dishes, 'carb')

  const healthScores = dishes
    .map((dish) => dish.healthScore)
    .filter((score): score is number => typeof score === 'number')

  cacheMealDetails.value.avgHealthScore = healthScores.length
    ? Number(
        (
          healthScores.reduce((total, score) => total + score, 0) /
          healthScores.length
        ).toFixed(1),
      )
    : 0
}

const sumByMetric = (
  dishes: MealDish[],
  metric: 'kcal' | 'protein' | 'fat' | 'carb',
) =>
  dishes.reduce((total, dish) => {
    const value = dish[metric]

    return total + (typeof value === 'number' ? value : 0)
  }, 0)

function sanitizeWeight(value: unknown) {
  const normalizedValue = Number(value)

  if (!Number.isFinite(normalizedValue)) {
    return 0
  }

  return Math.max(0, Math.round(normalizedValue))
}
</script>

<style scoped>
.scroll-picker {
  width: 100%;
}

:deep(.scroll-picker.vue-scroll-picker) {
  height: 7em;
}

:deep(.scroll-picker .vue-scroll-picker-layer-top) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    360deg,
    rgba(26, 26, 26, 0.7) 10%,
    rgba(18, 18, 18, 0.7)
  );
}

:deep(.scroll-picker .vue-scroll-picker-layer-bottom) {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0.7) 10%,
    rgba(18, 18, 18, 0.7)
  );
}

:deep(.scroll-picker .vue-scroll-picker-item[aria-selected='true']) {
  color: rgba(0, 167, 237, 1);
}
</style>
