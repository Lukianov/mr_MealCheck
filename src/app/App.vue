<template>
  <UIBackgroundBlurred />
  <main class="min-h-screen flex max-w-3xl m-auto">
    <router-view></router-view>
  </main>
  <ModalManager />
</template>

<script setup lang="ts">
import UIBackgroundBlurred from '@/shared/ui/UIBackgroundBlurred/UIBackgroundBlurred.vue'
import ModalManager from '@/widgets/modal-manager/ModalManager.vue'
import { getPullingMealStatus } from '@/app/providers/getPullingMealStatus'

getPullingMealStatus()
</script>
