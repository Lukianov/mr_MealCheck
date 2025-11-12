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
        <p class="mb-2 font-bold text-2xl">{{ ru.deleteMealModal.title }}</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          {{ ru.deleteMealModal.description }}
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            :is-disabled="isLoading"
            class="w-full"
            @click="handleDelete"
            :style="{ background: 'rgba(255, 37, 80, 1)' }"
          >
            {{ ru.deleteMealModal.delete }}
          </UIButton>
          <UIButton
            class="w-full"
            :is-disabled="isLoading"
            @click="() => setOpenedModal(null)"
          >
            {{ ru.deleteMealModal.delete }}
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
import { useRoute } from 'vue-router'
import { useMainPage } from '@/pages/main-page'
import { ru } from '@/shared/lib/i18n/ru'

const { loadAll } = useMainPage()

const { deleteMeal, isLoading } = useDeleteMeal()

const { setOpenedModal } = useOverlayManager()

const route = useRoute()

const handleDelete = async () => {
  const id = Number(route.params.id)

  if (typeof id !== 'number') {
    return
  }

  await deleteMeal(id)

  await loadAll()

  await router.push({ name: RouteName.Main })

  setOpenedModal(null)
}
</script>
