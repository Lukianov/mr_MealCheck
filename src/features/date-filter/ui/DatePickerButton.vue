<template>
  <div class="relative inline-block">
    <button
      ref="btnRef"
      type="button"
      class="inline-flex border items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition text-white"
      :style="{
        background: 'rgba(29, 29, 29, 1)',
        'border-color': 'rgba(255, 255, 255, 0.08)',
      }"
      @click="open"
      :aria-expanded="isOpen ? 'true' : 'false'"
    >
      <span>{{ label }}</span>
      <RightArrowIcon class="w-3 h-3 rotate-90" />
      <input
        ref="inputRef"
        type="text"
        aria-hidden="true"
        style="
          position: fixed;
          left: -9999px;
          top: -9999px;
          opacity: 0;
          pointer-events: none;
          width: 1px;
          height: 1px;
        "
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import RightArrowIcon from '@/shared/assets/icons/right-arrow-icon.svg'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: Date | string | number | null | undefined
  locale?: string
  placeholder?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: Date | null): void }>()

const btnRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
let fp: any | null = null
const isOpen = ref(false)

const locale = props.locale ?? 'en-US'

function toValidDate(v: unknown): Date | null {
  if (v == null && v !== 0) return null
  if (v instanceof Date) return isNaN(+v) ? null : v

  // @ts-ignore

  if (v && typeof (v as any).toDate === 'function') {
    const d = (v as any).toDate()
    return isNaN(+d) ? null : d
  }

  const d = new Date(v as any)

  return isNaN(+d) ? null : d
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function formatBtnLabel(v: unknown) {
  const d = toValidDate(v)

  if (!d) {
    return props.placeholder ?? 'Pick date'
  }

  const t = new Date()

  if (isSameDay(t, d)) {
    return 'Today'
  }

  try {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    }).format(d)
  } catch {
    return props.placeholder ?? 'Pick date'
  }
}
const label = computed(() => formatBtnLabel(props.modelValue))

async function ensurePicker() {
  if (fp || !inputRef.value) return

  const [{ default: flatpickr }] = await Promise.all([
    import('flatpickr'),
    import('flatpickr/dist/flatpickr.css'),
    import('../styles/index.css'),
  ])

  // локаль (опционально)
  let localeOpt: any = undefined

  if (locale.startsWith('ru')) {
    const mod = await import('flatpickr/dist/l10n/ru.js')
    // разные бандлеры экспортируют по-разному
    localeOpt = (mod as any).Russian ?? (mod as any).default?.ru
  }

  fp = flatpickr(inputRef.value, {
    defaultDate: toValidDate(props.modelValue) ?? new Date(),
    dateFormat: 'd M Y',
    locale: localeOpt,
    weekNumbers: false,
    disableMobile: true,
    clickOpens: false,
    allowInput: false,
    appendTo: document.body,
    positionElement: btnRef.value!, // якорь
    onChange: (selected: Date[]) => {
      const d = selected?.[0]
      if (d && !isNaN(+d)) emit('update:modelValue', d)
    },
  })
}

function open() {
  ensurePicker().then(() => fp?.open())
}

watch(
  () => props.modelValue,
  (v) => {
    if (!fp) {
      return
    }

    const d = toValidDate(v)

    if (d) {
      fp.setDate(d, false)
    }
  },
)

onBeforeUnmount(() => {
  try {
    fp?.destroy()
  } catch {}
  fp = null
})
</script>
