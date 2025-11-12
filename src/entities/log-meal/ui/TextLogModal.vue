<template>
  <UIBaseModal>
    <template #default>
      <div>
        <div class="text-center mb-4">
          <p class="mb-2 font-bold text-2xl">{{ ru.textLogModal.title }}</p>
          <p
            class="mb-6 text-base"
            :style="{ color: 'rgba(162, 172, 176, 1)' }"
          >
            {{ ru.textLogModal.description }}
          </p>
        </div>
        <UITextArea
          :placeholder="ru.textLogModal.placeholder"
          v-model="mealDescription"
        />
        <UIButton
          class="w-full"
          :is-disabled="isLoading"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
          @click="analyzeMealText"
        >
          {{ ru.textLogModal.buttonTitle }}
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ru } from '@/shared/lib/i18n/ru'
import UITextArea from '@/shared/ui/UITextArea/UITextArea.vue'
import { ref } from 'vue'
import { useAnalyseTextMeal } from '@/features/analyse-text-meal/api/useAnalyseTextMeal'
import { useMainPage } from '@/pages/main-page/model'

const { loadAll } = useMainPage()

const { setOpenedModal } = useOverlayManager()

const mealDescription = ref('')

const { error, analyseTextMeal, isLoading } = useAnalyseTextMeal()

const analyzeMealText = async () => {
  try {
    await analyseTextMeal(mealDescription.value)

    void loadAll()

    setOpenedModal(null)
  } catch (e) {
    console.error(e, error.value)
  }
}
</script>

<style scoped></style>
