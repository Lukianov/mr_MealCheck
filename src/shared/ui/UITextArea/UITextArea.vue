<template>
  <div class="relative">
    <textarea
      ref="el"
      v-model="model"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :rows="rows"
      :autofocus="autofocus"
      :style="{ 'background-color': 'rgba(17, 17, 17, 1)' }"
      class="w-full rounded-2xl text-white placeholder-zinc-400 px-5 py-4 leading-[1.4] outline-none resize-none mb-5"
      @input="autogrow"
      @keydown="onKeydown"
    />
    <div
      v-if="maxlength"
      class="pointer-events-none absolute right-3 bottom-2 text-xs text-zinc-500"
    >
      {{ model.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    maxlength?: number
    rows?: number
    autofocus?: boolean
    submitOnCmdEnter?: boolean
    maxRows?: number
  }>(),
  {
    placeholder: '',
    rows: 4,
    autofocus: true,
    submitOnCmdEnter: true,
    maxRows: 8,
  },
)

const emit = defineEmits<{ (e: 'submit', value: string): void }>()

const model = defineModel<string>({ default: '' })

const el = ref<HTMLTextAreaElement | null>(null)

function autogrow() {
  if (!el.value) {
    return
  }

  const ta = el.value

  ta.style.height = 'auto'

  const lineHeight = parseFloat(getComputedStyle(ta).lineHeight || '20')

  const max = (props.maxRows ?? 8) * lineHeight + 16

  ta.style.height = Math.min(ta.scrollHeight, max) + 'px'
}

function onKeydown(e: KeyboardEvent) {
  if (!props.submitOnCmdEnter) {
    return
  }

  const isCmdEnter = (e.ctrlKey || e.metaKey) && e.key === 'Enter'

  if (isCmdEnter) {
    e.preventDefault()
    emit('submit', model.value.trim())
  }
}

onMounted(autogrow)

watch(model, () => autogrow())
</script>
