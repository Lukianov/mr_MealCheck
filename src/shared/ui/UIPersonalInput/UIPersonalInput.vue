<template>
  <div class="inline-flex rounded-3xl items-center py-3 px-5 ui-personal-input">
    <input
      v-if="props.mask"
      class="ui-personal-input__input"
      v-maska="props.mask"
      :placeholder="props.placeholder"
      :name="props.placeholder"
      :size="props.size"
      :inputmode="props.inputmode"
      :pattern="props.pattern"
      :maxlength="props.maxlength"
      v-model="modelValue"
    />
    <input
      v-else
      class="ui-personal-input__input"
      :placeholder="props.placeholder"
      :name="props.placeholder"
      :size="props.size"
      :inputmode="props.inputmode"
      :pattern="props.pattern"
      :maxlength="props.maxlength"
      :value="displayValue"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { computed } from 'vue'

interface Props {
  placeholder: string
  size?: string
  inputmode?: 'numeric' | 'text'
  pattern?: string
  maxlength?: string
  mask?: string
}

const props = defineProps<Props>()

const modelValue = defineModel<string | number | null>({ default: null })

const displayValue = computed(() =>
  typeof modelValue.value === 'number' ? String(modelValue.value) : '',
)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const rawValue = target.value

  if (props.inputmode === 'text') {
    modelValue.value = target.value
  }

  const sanitizedValue = rawValue.replace(/\D/g, '')

  target.value = sanitizedValue

  modelValue.value =
    sanitizedValue.length === 0 ? null : Number.parseInt(sanitizedValue, 10)
}
</script>

<style scoped>
.ui-personal-input {
  background-color: rgba(118, 118, 128, 0.12);
}

.ui-personal-input__input {
  background: transparent;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  outline: none;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: rgba(0, 167, 237, 1);
  box-shadow: none;
  appearance: none;
  -webkit-appearance: none;
}

.ui-personal-input__input::placeholder {
  color: rgba(0, 167, 237, 0.6);
}
</style>
