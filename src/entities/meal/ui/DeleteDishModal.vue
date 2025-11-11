<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-16"
        src="@/shared/assets/images/delete-meal-modal.png"
        alt="delete-meal-modal"
      />
    </template>
    <template #default>
      <div>
        <p class="mb-2 font-bold text-2xl">
          {{ ru.deleteDishModal.title(payload.dish.name) }}
        </p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          {{ ru.deleteDishModal.description }}
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            :is-disabled="isProcessing"
            class="w-full"
            @click="handleDelete"
            :style="{ background: 'rgba(255, 37, 80, 1)' }"
          >
            {{ ru.deleteDishModal.delete }}
          </UIButton>
          <UIButton
            class="w-full"
            :is-disabled="isProcessing"
            @click="() => setOpenedModal(null)"
          >
            {{ ru.deleteDishModal.cancel }}
          </UIButton>
        </div>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { useDeleteMeal } from '@/entities/meal/api/useDeleteMeal'
import { RouteName, router } from '@/shared/lib/router'
import { useMainPage } from '@/pages/main-page/model'
import { ru } from '@/shared/lib/i18n/ru'
import { useDeleteDish } from '@/entities/meal/api/useDeleteDish'
import { ref } from 'vue'
import { Dish, Meal } from '@/entities/meal/types'
import { useMealDetails } from '@/entities/meal/api/useMealDetails'

const { loadAll } = useMainPage()

const { deleteMeal } = useDeleteMeal()

const { setOpenedModal, modalPayload } = useOverlayManager()

const { deleteDish } = useDeleteDish()

const payload = ref(modalPayload.value as { dish: Dish; meal: Meal })

const isProcessing = ref(false)

const { cacheMealDetails } = useMealDetails()

const handleDelete = async () => {
  isProcessing.value = true

  try {
    if (payload.value.meal.dishes.length === 1) {
      await deleteMeal(payload.value.meal.id)

      await router.push({ name: RouteName.Main })

      await loadAll()

      setOpenedModal(null)

      return
    }

    await deleteDish(payload.value.meal.id, payload.value.dish.id)

    cacheMealDetails.value.dishes = cacheMealDetails.value.dishes.filter(
      (dish) => dish.id !== payload.value.dish.id,
    )

    setOpenedModal(null)
  } finally {
    isProcessing.value = false
  }
}
</script>
