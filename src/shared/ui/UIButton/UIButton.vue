<template>
  <button class="ui-button px-4 py-4" :type="buttonType" v-bind="$attrs">
    <span class="ui-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
}>()

const buttonType = computed(() => props.type ?? 'button')

defineOptions({ name: 'UIButton' })
</script>

<style scoped>
.ui-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 53px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border: 0;
  border-radius: 18px;
  cursor: pointer;
  background-color: rgb(29, 29, 29);
}

.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-button__content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
}
</style>
