<template>
  <div>
    <div>
      <p class="mb-2 font-bold text-2xl">
        We couldn’t recognize the food in your photo
      </p>
      <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
        Please try again with a clearer shot — make sure the dish is fully
        visible and well-lit
      </p>
      <div class="flex items-center gap-3">
        <UIButton
          @click="openCamera"
          class="w-full"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
        >
          Take photo
        </UIButton>
        <UIButton class="w-full" @click="openGallery"> Upload </UIButton>
      </div>
    </div>
    <input
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handlePick"
    />
    <input
      ref="galleryInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handlePick"
    />
  </div>
</template>

<script setup lang="ts">
import { UIButton } from '@/shared/ui/UIButton'
import { useResendMeal } from '@/features/send-meal-again/model'
import { useUploadMealAnalysis } from '@/entities/meal/api/useUploadMealAnalysis'
import { useMealAnalysisWorker } from '@/entities/meal/model/useMealAnalysisWorker'
import { useMainPage } from '@/pages/main-page/model'
import { useDeleteMeal } from '@/entities/meal/api/useDeleteMeal'
import { RouteName, router } from '@/shared/lib/router'

const props = defineProps<{ mealId?: number | null }>()

const { cameraInput, galleryInput, openCamera, openGallery, onPick } =
  useResendMeal()

const { upload } = useUploadMealAnalysis()
const { enqueue } = useMealAnalysisWorker()
const { loadAll } = useMainPage()
const { deleteMeal } = useDeleteMeal()

const handlePick = async (e: Event) => {
  const file = onPick(e)

  if (!file) {
    return
  }

  const res = await upload(file)

  if (res) {
    await deleteMeal(props.mealId)

    await loadAll()

    enqueue(res.id)

    void router.push({ name: RouteName.Main })
  }
}
</script>
